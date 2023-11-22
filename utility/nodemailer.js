const nodemailer = require('nodemailer');


const sendVerifyMail = async(name,email,user_id)=>{
const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: "tyagivarshit062003@gmail.com",
      pass: "sxlq qwpo xepk fxhs",
    }
});

const mailOption = {
    from: "tyagivarshit062003@gmail.com",
    to: email,
    subject: 'For verification mail',
    html: '<p> Hii '+name+'  please click here to <a href="http://127.0.0.1:3000/verify?id='+user_id+'"> Verify </a> Your mail.</p> '
}

transport.sendMail(mailOption,(error,info)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log("email has been sent: ",info.response)
    }
})

const verifyMail = async(req,res)=>{
    try{
  
    }catch(error){
        console.log(error.message);
    }
}


}

module.exports = {
    sendVerifyMail : sendVerifyMail
}