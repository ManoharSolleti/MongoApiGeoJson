const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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
  },
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
  },
});

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);
