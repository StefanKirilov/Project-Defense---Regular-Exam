const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = async (userData) => {

    if(userData.password !== userData.rePassword){
        throw new Error('Password missmatch!');
    }
    
    const user = await User.create(userData);

    return generateToken(user);
};

exports.login = async (userData) => {

   const user = await User.findOne({email: userData.email});
    
   if(!user){
    throw new Error('User not found!');
   }

   const isValid = bcrypt.compare(userData.password, user.password);
   if (!isValid){
    throw new Error('No such user!');
   }

   return generateToken(user);
};

exports.getProfile = (id) => {
   const user = User.findById(id , { password: 0, __v: 0 }) //finding by Id and returning without password and __v
   return user;
 };

 exports.updateProfile = async (id, email, username) => {
    await User.findByIdAndUpdate(id, { email, username }) //finding by Id and returning without password and __v
    const user = await User.findById(id , { password: 0, __v: 0 }) 
    return generateToken(user);

  };
 

function generateToken(user){
    const accessToken = jwt.sign({
        _id: user._id,
        username: user.username,
        email : user.email,
    }, 'SOMESECRETHERE')

    return {
        _id : user._id,
        username: user.username,
        email : user.email,
        accessToken,
    }
}

exports.generateToken = generateToken;
