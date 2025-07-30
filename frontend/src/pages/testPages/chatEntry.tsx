import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Box, Typography } from '@mui/material';
import ChatWindow from './chatWindow'; // Import ChatWindow component

const ChatEntryPage: React.FC = () => {
  const [roomName, setRoomName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleJoinChatPage = () => {
    if (roomName && username) {
      navigate(`/chat/${roomName}/${username}`);
    }
  };

  const handleOpenPopupChat = () => {
    if (roomName && username) {
      setIsChatOpen(true);
    }
  };

  const handleClosePopupChat = () => {
    setIsChatOpen(false);
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', my: 4 }}>
      <Typography variant="h4" gutterBottom>Enter Room</Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Room Name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={handleJoinChatPage} fullWidth sx={{ mb: 1 }}>
        Join Chat Page
      </Button>
      {/**<Button variant="contained" onClick={handleOpenPopupChat} fullWidth>
        Open Pop-up Chat
      </Button>
      <ChatWindow open={isChatOpen} onClose={handleClosePopupChat} roomName={roomName} username={username} />**/}
    </Box>
  );
};

export default ChatEntryPage;
