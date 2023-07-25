import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName: {
      type: String,
      trim: true,
      required:true
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true, 
      match:  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    birthday: {
      type: Date,
      required:true
    },
    status: {
      type: String
    },
    password:{
      type: String
    }
  },{versionKey:false})

  export {userSchema}