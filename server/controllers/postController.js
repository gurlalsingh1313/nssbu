const Post = require('../models/postModel')
const User = require('../models/userModel')
const path = require('path')
const fs = require('path')
const { v4: uuid } = require('uuid')
const HttpError = require('../models/errorModel')



const createPost = async (req, res, next) => {
    try {
        let { title, category, description } = req.body;

        // Check for missing fields
        if (!title || !category || !description) {
            return next(new Error("Fill in all the blanks"));
        }

        // Check for file upload
        const thumbnail  = req.files;
        if (!thumbnail) {
            return next(new Error("Thumbnail is required"));
        }

        

        if (thumbnail.size > 20000000) {
            return next(new Error("Thumbnail is too big"));
        }

        let fileName = thumbnail.name;
        let splittedFileName = fileName.split('.');
        let newFileName = splittedFileName[0] + uuid() + "." + splittedFileName[splittedFileName.length - 1];
        thumbnail.mv(path.join(__dirname, '..', '/uploads', newFileName), async (err) => {
            if (err) {
                return next(err);
            } else {
                const newPost = await Post.create({ title, category, description, thumbnail: newFileName, creator: req.user.id });
                if (!newPost) {
                    return next(new Error("Post could not be created"));
                }
                const currUser = await User.findById(req.user.id);
                const userPostCount = currUser.posts + 1;
                await User.findByIdAndUpdate(req.user.id, {
                    posts: userPostCount
                });
                res.status(201).json(newPost);
            }
        });
    } catch (error) {
        return next(error);
    }
};





const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().sort({ updateAt: -1 })
        res.status(200).json(posts)
    }
    catch (error) {
        return next(new HttpError(error))
    }
}





const getPost = async (req, res, next) => {
    try {
        const postID = req.params.id;
        const post = await Post.findById(postID);
        if (!post) {
            return next(new HttpError("Posr not found", 404))
        }
        res.status(200).json(post)
    }
    catch (error) {
        return next(new HttpError(error))
    }
}




const getCatPost = async (req, res, next) => {
    try {
        const { category } = req.params;
        const catPosts = await Post.find({ category }).sort({ createdAt: -1 })
        res.status(200).json(catPosts)
    }
    catch (error) {
        return next(new error(new HttpError(error)))
    }
}

const getUserPosts = async (req, res, next) => {
    try {
        const { id } = req.params;
        const posts = await Post.find({ creator: id }).sort({ createdAt: -1 })
        res.status(200).json(posts)
    } catch (error) {
        return next(new HttpError(error))
    }
}

const editPost = async (req, res, next) => {
    res.json('edit post')
}

const deletePost = async (req, res, next) => {
    res.json('delete post')
}

module.exports = { deletePost, createPost, getPost, getPosts, getCatPost, getUserPosts, editPost } 