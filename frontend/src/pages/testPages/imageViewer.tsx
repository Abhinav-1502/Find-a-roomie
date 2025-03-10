import React, { useEffect, useState, CSSProperties } from 'react';
import axios from 'axios';
import CarouselItemImage from '../../assets/images/CarouselItem.jpg';

interface ImageViewerProps {
  imageId: string;
  style?: CSSProperties; // Add style prop
}

const ImageViewer: React.FC<ImageViewerProps> = ({ imageId, style }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/upload/${imageId}`, {
          responseType: 'arraybuffer',
        });

        const base64Image = btoa(
          new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
        );

        const url = `data:${response.headers['content-type']};base64,${base64Image}`;
        setImageUrl(url);
        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching image:', error.message);
      }
    };

    fetchImage();
  }, [imageId]);

  if (loading) {
    return <img src={CarouselItemImage} alt="Uploaded" style={{ ...style }} />;
  }

  if (!imageUrl) {
    return <img src={CarouselItemImage} alt="Uploaded" style={{ ...style }} />;
  }

  return <img src={imageUrl} alt="Uploaded" style={{ ...style }} />;
};

export default ImageViewer;
