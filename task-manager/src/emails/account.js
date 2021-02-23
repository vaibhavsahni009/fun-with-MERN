const sgMail= require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const SendWelcomeEmail=(email,name)=>{sgMail.send({
    to:email,
    from:'vaibhavsahni009@gmail.com',
    subject:'Thanks for joining',
    text:`Welcome to the app ${name}`
})}

const SendCancellationEmail=(email,name)=>{sgMail.send({
    to:email,
    from:'vaibhavsahni009@gmail.com',
    subject:'Thanks for being with us',
    text:`${name}, We are sad to see you leaving our platform,
     but would love to know how we could improve our platform to cater to your needs`
})}
module.exports={
    SendWelcomeEmail,
    SendCancellationEmail
}