// services/imageServices.js
import Image from '../model/image.js';

export const saveImage = async (imageData) => {
  const image = new Image(imageData);
  return await image.save();
};
export const getImageById = async (id) => {
  return await Image.findById(id).exec();
};
export const deleteImageById = async (id) => {
  try {
    const deletedImage = await Image.findByIdAndDelete(id).exec();
    return deletedImage;
  } catch (error) {
    throw new Error(`Error deleting image with ID ${id}: ${error.message}`);
  }
};