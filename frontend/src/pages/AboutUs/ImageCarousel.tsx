import React, { useState, useEffect } from 'react';
import CarouselItem from '../../assets/images/CarouselItem2.jpg';
import CarouselItem1 from '../../assets/images/CarouselItem.jpg';

const ImageCarousel: React.FC = () => {
  const images = [CarouselItem, CarouselItem1];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div>
      {images.map((image: string, index: number) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index}`}
          style={{ display: index === currentIndex ? 'block' : 'none', width: '100%' }}
        />
      ))}
    </div>
  );
};

export default ImageCarousel;
