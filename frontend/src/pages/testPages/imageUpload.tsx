import React, { useCallback, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import axios from 'axios';
import ImageViewer from './imageViewer'; // Import the ImageViewer component

const ImageUpload: React.FC = () => {
  const [uploadedImageId, setUploadedImageId] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (fileRejections && fileRejections.length > 0) {
      console.error('Rejected files:', fileRejections);
      alert('Invalid file format. Please upload a valid image.');
      return;
    }

    const file = acceptedFiles[0];

    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log(response.data);
        setUploadedImageId(response.data.data._id); // Save the uploaded image ID
        alert('Image uploaded successfully!');
      } catch (error:any) {
        console.error('Error uploading image:', error.message);
        alert('Error uploading image. Please try again.');
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop the image here...</p> : <p>Drag & drop an image here, or click to select one</p>}
      </div>

      {uploadedImageId && <ImageViewer imageId={uploadedImageId} />} {/* Render the ImageViewer if an image is uploaded */}
    </div>
  );
};

const dropzoneStyle: React.CSSProperties = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default ImageUpload;
