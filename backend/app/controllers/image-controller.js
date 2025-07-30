// controllers/image-controller.js
import multer from 'multer';
import { saveImage, getImageById, deleteImageById } from '../services/imageServices.js';

// Set up Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const handleImageUpload = upload.single('image');

export const uploadImage = async (req, res) => {
  try {
    //console.log("upload");
    //console.log(req.file);
    const { originalname, mimetype, buffer } = req.file;
    const size = buffer.length;

    const imageData = {
      filename: `${Date.now()}-${originalname}`,
      originalname,
      mimetype,
      size,
      buffer
    };
    const savedImage = await saveImage(imageData);

    res.json({ message: 'Image uploaded successfully', data: savedImage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getImageByIdController = async (req, res) => {
    try {
      const { id } = req.params;
      const image = await getImageById(id);
  
      if (!image) {
        return res.status(404).json({ error: 'Image not found' });
      }
  
      res.set('Content-Type', image.mimetype); // Set the content type based on the saved mimetype
      res.send(image.buffer);
      //console.log("imagecontroller");
      //console.log(image);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  export const deleteImageByIdController = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Delete the image by ID
      const deletedImage = await deleteImageById(id);
  
      if (!deletedImage) {
        return res.status(404).json({ error: 'Image not found' });
      }
  
      res.json({ message: 'Image deleted successfully', data: deletedImage });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };