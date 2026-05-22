const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    },
    age: {
      type: String,
      default: ''
    },
    upozila: {
      type: String,
      default: ''
    },
    isDonor: {
      type: String,
      enum: ['donor', 'non-donor'],
      default: 'donor'
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', ''],
      default: ''
    },
    mobile: {
      type: String,
      default: ''
    },
    profilePicture: {
      type: String,
      default: null
    },
    profilePicturePublicId: {
      type: String,
      default: null
    },
    hasDonated: {
      type: Boolean,
      default: false
    },
    lastDonationDate: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
