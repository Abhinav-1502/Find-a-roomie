// model/image.js
import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  filename: String,
  originalname: String,
  mimetype: String,
  size: Number,
  buffer: Buffer, // Include the buffer property
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Image = mongoose.model('Image', imageSchema);

export default Image;
