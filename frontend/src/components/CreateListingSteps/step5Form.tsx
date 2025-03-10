// components/CreateListingSteps/Step5Form.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { updateForm } from '../../redux/slices/CreateListingFormSlice';
import {
  Typography,
  Grid,
  TextField,
  InputLabel,
  Box,
  Paper,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useAlert } from '../../handlers/AlertProvider';

const Step5Form: React.FC = () => {
  const dispatch = useDispatch();
  const formState = useSelector((state: RootState) => state.form.contactAndPresentation);
  const {showAlert} = useAlert();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  useEffect(() => {
    const fetchImageUrls = async () => {
      const urls = await Promise.all(
        formState.photos.map(async (docId) => {
          const existingImageUrl = imageUrls.find((url) => url.includes(docId));
          if (existingImageUrl) {
            return existingImageUrl;
          }
          try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/upload/${docId}`, {
              responseType: 'arraybuffer',
            });
            const base64Image = btoa(
              new Uint8Array(response.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ''
              )
            );
            return `data:${response.headers['content-type']};base64,${base64Image}`;
          } catch (error: any) {
            console.error('Error fetching image:', error.message);
            return null;
          }
        })
      );

      // Filter out null values before setting the state
      setImageUrls(urls.filter((url) => url !== null) as string[]);
    };

    fetchImageUrls();
  }, [formState.photos]);

  const handleInputChange = (field: keyof typeof formState, value: string | string[]) => {
    dispatch(updateForm({ contactAndPresentation: { ...formState, [field]: value } }));
  };

  const onDrop = async (acceptedFiles: File[]) => {
    // Assuming you have a function to upload images and get their document IDs from the server
    const uploadImagesAndGetIds = async (files: File[]): Promise<string[]> => {
      // Implement the logic to upload images and get document IDs from the server
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
          const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/upload`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          return response.data.data._id;
        } catch (error: any) {
          console.error('Error uploading image:', error.message);
          return null;
        }
      });

      return Promise.all(uploadPromises);
    };

    try {
      const docIds = await uploadImagesAndGetIds(acceptedFiles);

      // Update the Redux store with the new image document IDs
      handleInputChange('photos', [...formState.photos, ...docIds]);
    } catch (error: any) {
      console.error('Error uploading images:', error.message);
      showAlert('error','Error uploading images. Please try again.');
    }
  };

  const handleDeleteImage = async (index: number) => {
    try {
      // Get the document ID of the image to be deleted
      const deletedDocId = formState.photos[index];

      // Make a request to your server to delete the image by ID
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/upload/${deletedDocId}`);

      // Update the state in React
      const newPhotos = [...formState.photos];
      newPhotos.splice(index, 1);
      handleInputChange('photos', newPhotos);
    } catch (error: any) {
      console.error('Error deleting image:', error.message);
      showAlert('error','Error deleting image. Please try again.');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Grid container spacing={2}>
      {/* Availability */}
      <Grid item xs={12}>
        <TextField
          label="Contact Availability"
          type="text"
          value={formState.availability}
          onChange={(e) => handleInputChange('availability', e.target.value)}
          fullWidth
        />
      </Grid>

      {/* Contact Information */}
      {/* Email */}
      <Grid item xs={12}>
        <TextField
          label="Email"
          type="email"
          value={formState.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          fullWidth
        />
      </Grid>
      {/* Phone */}
      <Grid item xs={12}>
        <TextField
          label="Phone"
          type="tel"
          value={formState.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          fullWidth
        />
      </Grid>

      {/* Photos */}
      <Grid item xs={12}>
        <InputLabel>Photos</InputLabel>
        <div {...getRootProps()} style={{ marginTop: '8px', border: '2px dashed #d9d9d9', borderRadius: '4px', padding: '20px', cursor: 'pointer' }}>
          <input {...getInputProps()} />
          <Typography variant="body2">Drag and drop or click to select files</Typography>
        </div>
        <Box mt={2} display="flex" flexWrap="wrap">
          {imageUrls.map((imageUrl, index) => (
            <Paper key={index} sx={{ position: 'relative', p: 1, m: 1 }}>
              <img
                src={imageUrl}
                alt={`uploaded-${index}`}
                style={{ width: 50, height: 50, objectFit: 'cover' }}
              />
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  color: 'error.main', // Use the color that contrasts well with your background
                }}
                onClick={() => handleDeleteImage(index)}
              >
                <DeleteIcon />
              </IconButton>
            </Paper>
          ))}
        </Box>
      </Grid>
      
    </Grid>
  );
};

export default Step5Form;
