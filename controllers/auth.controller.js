const jwt = require('jsonwebtoken');
const User = require('../models/user');
const db = require('../data/database');
const bcryptjs = require('bcryptjs');
const {sendVerifyMail} = require('../utility/nodemailer');

const secretKey = 'varshittyagi@062003';

function getSignup(req,res){
    let userhue = req.session.userhue;
    if(!userhue){
    userhue = {
        username: '',
        email : '',
        password : ''
    }
    }
    req.session.userhue = '';
    let user = req.session.user;
    if(!user){
    user = {
        email : '',
        password : ''
    }
    }
    req.session.user = '';
    res.render('vaild',{userhue:userhue,user:user});
}


async function signup(req,res){
    const userData = req.body;
    if(!userData.username || !userData.email || !userData.password || userData.password.length < 6 || !userData.email.includes('@gmail') ){
        console.log("there is a error in validating you credentials , please check them again");
        userData.message = "There is a error in validating your credentials , please check them again";
        req.session.userhue = userData;
         res.redirect('/signup');
         return ;
    }
    const userExist = await User.checkUser(userData.email);
    if(userExist){
       console.log("this user already exist , please try to login");
       userData.message = "This user already exist , please try to login";
       req.session.userhue = userData;
       res.redirect('/signup');
       return;
    }
   const user  = new User(
    req.body.username,req.body.email,req.body.password
   );
   const savedUser =  await user.save();
   
   console.log(user);
   const sendingMail =  await  sendVerifyMail(req.body.username,req.body.email,savedUser._id);
   console.log(sendingMail);
   
   console.log('you are signed up');
   res.redirect('/signup');
}


function getLogin(req,res){
    let userhue = req.session.userhue;
    if(!userhue){
    userhue = {
        username: '',
        email : '',
        password : ''
    }
    }
    req.session.userhue = '';
    let user = req.session.user;
    if(!user){
    user = {
        email : '',
        password : ''
    }
    }
    res.render('vaild',{user:user,userhue:userhue});
}

async function login(req,res){
      const userData = req.body;
    if( !userData.email || !userData.password || userData.password.length < 6 || !userData.email.includes('@gmail') ){
        console.log("There is a error in validating your credentials , please check them again");
        userData.message = "There is a error in validating your credentials , please check them again";
        req.session.user = userData;
         res.redirect('/login');
         return ;
    }
    const userExist = await User.checkUser(userData.email);
   console.log(userExist);
   console.log("yes");
    if(!userExist){
       console.log("this user is new , please signup first");
       res.redirect('/login');
       return;
    }

    const passwordChecked =await bcryptjs.compare(userData.password,userExist.password);
    if(!passwordChecked){
        console.log("your password is wrong, please try again"); 
       res.redirect('/login');
       return;
    }
     
    const token = jwt.sign({ email: userData.email, username: userData.username }, secretKey, { expiresIn: '1h' });
    console.log(token);
    res.cookie('jwt', token);
    console.log('you are logged in');
    res.redirect('/chat');
}


module.exports = {
    getSignup : getSignup,
    signup: signup,
    login: login,
    getLogin: getLogin
}