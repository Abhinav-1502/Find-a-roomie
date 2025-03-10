import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import CloseIcon from '@mui/icons-material/Close';
import './footer.css';

interface FooterProps {
  theme: string;
  toggleTheme: () => void;
}

const Footer = ({ theme, toggleTheme }: FooterProps) => {
  const [isContactFormVisible, setIsContactFormVisible] = useState(false);

  const handleToggleContactForm = () => {
    setIsContactFormVisible(!isContactFormVisible);
  };

  return (
    <footer className={`footer-app ${theme}`}>
      <div className="footer-left">
        <IconButton size='large' color='inherit' aria-label='logo'>
          {/* Your logo icon */}
        </IconButton>
        <Typography variant='h6' component='div'>
          Roomies
        </Typography>
      </div>
      <div className="footer-right">
        <Typography variant="subtitle1" gutterBottom>CONTACT</Typography>
        <IconButton component="a" href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></IconButton>
        <IconButton component="a" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></IconButton>
        <IconButton component="a" href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></IconButton>
        <Typography variant="subtitle1" onClick={handleToggleContactForm} style={{ cursor: 'pointer' }}>
          Contact Us
        </Typography>
      </div>
      {isContactFormVisible && (
        <div className="footer-contact-form">
  <form action={`mailto:kotla.s@northeastern.edu`} onSubmit={() => setIsContactFormVisible(false)}>
    <input type="text" placeholder="Name" name="name" />
    <input type="email" placeholder="Email" name="email" />
    <input type="text" placeholder="Phone (optional)" name="phone" />
    <textarea placeholder="Message" name="message"></textarea>
    <div className="submit-buttons">
      <button type="submit" className="submit-button">
        Send
      </button>
      <IconButton color='inherit' aria-label='close' onClick={handleToggleContactForm}>
        <CloseIcon />
      </IconButton>
    </div>
  </form>
</div>

      )}
    </footer>
  );
};

export default Footer;
