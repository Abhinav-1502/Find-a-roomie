import React, { useState, useEffect, useRef } from 'react';
import { Typography, TextField, Button, Paper, List, ListItem, ListItemText, IconButton, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Socket, io } from 'socket.io-client';

interface Message {
  user: string;
  text: string;
}

interface User {
  id: string;
  name: string;
}

interface ChatWindowProps {
  open: boolean;
  roomName: string;
  username: string;
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ roomName, username, onClose }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const newSocket = io(`${process.env.REACT_APP_API_BASE_URL}`);
    newSocket.emit('joinRoom', { roomName, username });

    newSocket.on('message', (messageData: Message) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    newSocket.on('roomData', ({ users }) => {
      setUsers(users);
    });

    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [roomName, username]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    if (socket && message) {
      const messageData = { user: username, text: message };
      socket.emit('sendMessage', { roomName, messageData });
      setMessage('');
    }
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer(true)}
        size="small"
        style={{ position: 'fixed', top: 16, left: 16, zIndex: 1 }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)} variant="persistent">
        <Paper style={{ width: 250, padding: '16px' }}>
          <List>
            {users.map((user, index) => (
              <ListItem key={index}>
                <ListItemText primary={user.name} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Drawer>

      <Paper style={{ position: 'fixed', bottom: 16, right: 16, width: 300, maxHeight: 400, overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px' }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="show users"
            onClick={toggleDrawer(true)}
            size="small"
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="close chat"
            onClick={onClose}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </div>
        <Paper style={{ flexGrow: 1, overflowY: 'auto', padding: '8px' }}>
          <List>
            {messages.map((msg, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${msg.user}: ${msg.text}`} />
              </ListItem>
            ))}
            <div ref={messagesEndRef} />
          </List>
        </Paper>
        <div style={{ padding: '8px' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            variant="contained"
            type="submit"
            disabled={!message}
            onClick={handleSendMessage}
            style={{ marginTop: '8px' }}
          >
            Send
          </Button>
        </div>
      </Paper>
    </>
  );
};

export default ChatWindow;
