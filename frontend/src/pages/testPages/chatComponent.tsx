import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Socket, io } from 'socket.io-client';
import { TextField, Button, Box, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../handlers/AlertProvider';

interface Message {
  user: string;
  text: string;
  timestamp: number;
}

interface User {
  id: string;
  name: string;
}

interface ChatComponentProps {
  roomName?: string;
  username?: string;
}

// MessageBubble component
const MessageBubble: React.FC<{ message: Message; isCurrentUser: boolean }> = ({
  message,
  isCurrentUser,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <Box
      sx={{
        marginBottom: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: isCurrentUser ? 'flex-end' : 'flex-start',
        paddingBottom:1
      }}
    >

        <Typography
          variant="caption"
          color="textSecondary"
          sx={{
            textAlign: isCurrentUser ? 'right' : 'left',
            paddingRight: isCurrentUser ? 2 : 0,
            paddingLeft: isCurrentUser ? 0 : 2,
            marginBottom: 0
          }}
        >
          {message.user}
        </Typography>
      <ListItem
        sx={{
          marginTop: 0,
          textAlign: isCurrentUser ? 'right' : 'left',
          paddingTop:0,
          paddingBottom:0,
          paddingRight: isCurrentUser ? 0 : 5,
          paddingLeft: isCurrentUser ? 5 : 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: isCurrentUser ? 'flex-end' : 'flex-start',
        }}
      >
        <ListItemText
          primary={message.text}
          sx={{
            borderRadius: 9,
            padding: 1,
            border: '1px solid',
            borderColor: isCurrentUser ? '#007bff' : '#e0e0e0',
            backgroundColor: isCurrentUser ? '#007bff' : '#e0e0e0',
            color: isCurrentUser ? 'white' : 'black',
            cursor: 'pointer',
            maxWidth: '70%', // Limit the width of the message bubble
          }}
          onClick={handleClick}
        />
      </ListItem>
      {isClicked && (
        <Typography
          variant="caption"
          color="textSecondary"
          sx={{
            textAlign: isCurrentUser ? 'right' : 'left',
            paddingRight: isCurrentUser ? 0 : 5,
            paddingLeft: isCurrentUser ? 5 : 0,
            marginTop: 0,
          }}
        >
          {new Date(message.timestamp).toLocaleTimeString()}
        </Typography>
      )}
    </Box>
  );
};


const ChatComponent: React.FC<ChatComponentProps> = (props) => {
  const params = useParams<{ roomName: string; username: string }>();
  const roomName = props.roomName || params.roomName;
  const username = props.username || params.username;
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const newSocket = io(`${process.env.REACT_APP_API_BASE_URL}`);
    newSocket.emit('joinRoom', { roomName, username });

    newSocket.on('message', (messageData: Message) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    newSocket.on('roomData', ({ users }) => {
      setUsers(users);
    });

    newSocket.on('userConnected', (data: { userId: string; username: string }) => {
      setNotification(`${data.username} joined the chat`);
    });

    newSocket.on('userDisconnected', (data: { userId: string; username: string }) => {
      setNotification(`${data.username} left the chat`);
    });

    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [roomName, username]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Clear notification after a delay (e.g., 3 seconds)
    const notificationTimeout = setTimeout(() => {
      setNotification(null);
    }, 6000);

    return () => clearTimeout(notificationTimeout);
  }, [notification]);
  const handleSendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    if (socket && message) {
      const messageData = { user: username, text: message };
      socket.emit('sendMessage', { roomName, messageData });
      setMessage('');
    }
  };

  const handleExitChat = () => {
    if (socket) {
      socket.emit('leaveRoom', { roomName });
      socket.disconnect();
    }
    navigate('/chat');
  };

  return (
    <Paper sx={{ padding:2}}>
          <Button
        variant="outlined"
        onClick={handleExitChat}
        sx={{
          alignContent: 'flex-end',
          float: 'right'
        }}
      >
        X
      </Button>
   <Box sx={{ display: 'flex', maxWidth: 1000, mx: 'auto', my: 4 }}>
      <Box sx={{ width: '30%', borderRight: 1, borderColor: 'divider' }}>
        <Typography variant="h6" gutterBottom>Online Users</Typography>
        <List>
          {users.map((user, index) => (
            <ListItem key={index}>
              <ListItemText primary={user.name || ''} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ width: '70%', pl: 2 }}>
        <Typography variant="h4" gutterBottom>Chat Room: {roomName}</Typography>
        <Paper style={{ maxHeight: 300, overflow: 'auto', marginTop: 2 }}>
        <List>
            {messages.map((msg, index) => (
              <MessageBubble
                key={index}
                message={msg}
                isCurrentUser={msg.user === username}
              />
            ))}
            <div ref={messagesEndRef} />
          </List>
        </Paper>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          {notification && (
            <Typography variant="body2" color="textSecondary">{`${notification}`}</Typography>
          )}
        </Box>
        <Box component="form" onSubmit={handleSendMessage} sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button variant="contained" type="submit" disabled={!message}>Send</Button>
        </Box>
      </Box>
    </Box>
    </Paper>
  );
};

export default ChatComponent;
