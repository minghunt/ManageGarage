import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  gender: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now,
  },
  avatar: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userRole: {
    type: String,
    required: true
  },
  otpNumber: {
    type: String
  },
  expiryTime: {
    type: Date
  },
  refreshToken: {
    type: String
  }
});

const User = mongoose.model('User', userSchema);

export default User;

