const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken')


const userSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error('Age cannot be negative')
            }
        }
    },
    email: {
        unique:true,
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is not valid')
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:7,
        validate(value){
            // if(value.length<6){
            //     throw new Error('Password must have atleast 6 characters')
            // }
            // else
             if(value.toLowerCase().includes('password')){
                throw new Error('Password should not contain Password')
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }}
    ]
})


userSchema.methods.generateAuthToken= async function (){

    const user=this

    const token = jwt.sign({_id:user._id.toString()},'secretKey009')
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token

}

userSchema.statics.findByCredentials=async(email,password)=>{

    const user=await User.findOne({email})
    if(!user){
        throw new Error('unable to login')
    }

    const isMatch=await bcrypt.compare(password,user.password)

    if(!isMatch){
        throw new Error('unable to login')
    }
    return user
}

userSchema.pre('save',async function (next){
    const user =this
    console.log('before saving')
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }

    next()
})

const User = mongoose.model('User',userSchema)

module.exports=User