import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name:{
    type:String,
    required:true// means can`t be empty your name//
    },
    email:{
        type:String,
        required:true,//same //
        unique:true
    },password:{
        type:String,
        required:true
    },
},{
    timestamps:true
    }

);

export default mongoose.model('User', userSchema);