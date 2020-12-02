const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  mobile: {
    type: String,
    required: [true, 'Please add a mobile number.'],
    unique: true,
    trim: true,
    maxlength: 13,
  },
  email: {
    type: String,
    required: [true, 'Please add an email.'],
    unique: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  address: {
    street: String,
    locality: String,
    city: String,
    state: String,
    pincode: String,
    location: {
      type: { type: String },
      coordinates: [Number],
    },
    // location: {
    //   type: {
    //     type: String,
    //     enum: ['Point'],
    //     required: true,
    //   },
    //   coordinates: {
    //     type: [Number],
    //     required: true,
    //     index: '2dsphere',
    //   },
    // },
  },
});

UserSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('User', UserSchema);
