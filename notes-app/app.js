const chalk = require('chalk')
const getNotes=require('./notes.js')
const yargs=require('yargs')

yargs.command({
    command:'add',
    describe:'add notes',
    builder:{
        title:{
            describe:'note title',
            demandOption:true,
            type:'string'
        },
        body:{
            describe:'note body',
            demandOption:true,
            type:'string'
        }
    },
    handler:(args)=>{
        console.log('Title '+args.title)
        console.log('Body '+args.body)

    }
})

yargs.command({
    command:'remove',
    describe:'remove notes',
    handler:()=>{
        console.log('removing notes')
    }
})

yargs.command({
    command:'list',
    describe:'list notes',
    handler:()=>{
        console.log('listing notes')
    }
})

yargs.command({
    command:'read',
    describe:'read notes',
    handler:()=>{
        console.log('reading notes')
    }
})


// console.log(yargs.argv)

yargs.parse()