import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  gender: {
    type: String
  },
  date: {
    type: Date
  },
  avatar: {
    type: String
  },
  name: {
    type: String
  },
  email: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  password: {
    type: String
  },
  userRoleAdmin: {
    type: Boolean
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

