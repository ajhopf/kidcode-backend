import mongoose from 'mongoose';

//const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  photo: {
    type: String
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

const UserSchema = mongoose.model('User', userSchema);

export default UserSchema;
