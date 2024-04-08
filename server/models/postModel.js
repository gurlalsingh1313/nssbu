const {Schema,model} = require('mongoose')


const postSchema = new Schema({
    title: {type:String, required:true},
    category: {type:String, enum:["Social Event", "Fun Event"]},
    description: {type:String, required:true},
    creator: {type:Schema.Types.ObjectId, ref:'User'},
    title: {type:String, required:true},
},{timestamps:true})

module.exports = model("Post",postSchema)