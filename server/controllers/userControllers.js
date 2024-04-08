const HttpError = require('../models/errorModel')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const upload = require('express-fileupload')
const fs = require('fs')
const path = require('path')
const {v4:uuid} = require('uuid')





const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, password2 } = req.body;
        if (!name || !email || !password) {
            return next(new HttpError("Fill in all the details"))
        }

        const newEmail = email.toLowerCase()

        const emailExists = await User.findOne({ email: newEmail })
        if (emailExists) {
            return next(new HttpError('Error already exists', 422))
        }

        if (password.trim().length < 6) {
            return next(new HttpError('Password should be atleast 6 characters', 422))
        }

        if (password != password2) {
            return next(new HttpError('passwords do not match', 422))

        }
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt);
        const newUser = await User.create({ name, email: newEmail, password: hashedPass })
        res.status(201).json(`new user ${newUser.email} registered`)
    }
    catch (error) {
        return next(new HttpError('user registeration failed', 422))
    }
}




const loginUser = async (req, res, next) => {
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user) return next(new HttpError('User not found',404));
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return next(new HttpError("Incorrect Password",401));
        }
        const token = jwt.sign({ id:user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });        
        res.status(200).json({
            status:'success',
            token,
            message:'Log in done!'
        })
            
        }
        
    catch (error){
        return next(new HttpError(error));
    }
}





const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select('-password');
        if (!user) {
            return next(new HttpError('user not found', 404))
        }
        res.status(200).json(user);
    } catch (error) {
        return next(new HttpError(error))
    }
}





const changeAvatar = async (req, res, next) => {
    try{
        if(!req.files.avatar){
            return next(new HttpError("please choose an image",422))
        }
        const user = await User.findById(req.user.id)
        if(user.avatar){
            fs.unlink(path.join(__dirname,'..','uploads',user.avatar),(err)=>{
                if(err){
                    return next(new HttpError(err))
                }
            })
        }

        const {avatar} = req.files;
        if(avatar.size>500000){
            return next(new HttpError("Profile picture is too big",422))
        }
        let fileName;
        fileName = avatar.name;
        let splittedFileName = fileName.split('.')
        let newFileName = splittedFileName[0]+uuid()+'.'+splittedFileName[splittedFileName.length-1]
        avatar.mv(path.join(__dirname,'..','uploads',newFileName),async (err)=>{
            if(err){
                return next(HttpError(err))
            }
            const updatedAvatar = await User.findByIdAndUpdate(req.user.id,{avatar:newFileName},{new: true})
            if(!updatedAvatar){
                return next(new HttpError('avatar could not be changed',422))
            }
            res.status(200).json(updatedAvatar)
        })
    }   

    catch (error){
        return next(new HttpError(error))
    }
}





const editUser = async (req, res, next) => {
    try{
        const [name,email,currentPassword,newPassword,newConfirmNewPassword] = req.body;
        if(!name || !email || !currentPassword || !newPassword){
            return(new HttpError('fill in all the details',422))
        }

        const user = await User.findById(req.user.id);
        if(!user){
            return next(new HttpError("user not found",403))
        }
        const emailExist = await User.findOne({email});
        if(emailExist && (emailExist._id != req.user.id)){
            return next(new HttpError("email already exists",422))
        }
        const validateUserPassword = await bcrypt.compare(currentPassword,user.password);
        if(!validateUserPassword){
            return next(new HttpError('invalid current password',422))
        }
        if(newPassword!==newConfirmNewPassword){
            return(new HttpError('new passwords donot match',422))
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(newPassword,salt);

        const newInfo = await User.findByIdAndUpdate(req.user.id, {name,email,password: hash},{new: true})
        res.status(200).json(newInfo)

    } catch (error){
        return next(new HttpError(error)) 
    }
}





const getAuthors = async (req, res, next) => {
    try {

        const authors = await User.find().select('-password');
        res.json(authors);
    }

    catch (error) {
        return next(new HttpError(error))
    }
}

module.exports = { registerUser, loginUser, getUser, changeAvatar, editUser, getAuthors }