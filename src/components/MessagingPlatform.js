// src/components/MessagingPlatform.js
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  Avatar,
  Divider,
  IconButton
} from '@mui/material';
import { styled } from '@mui/system';
import SendIcon from '@mui/icons-material/Send';
import AccountCircle from '@mui/icons-material/AccountCircle';

const MessageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100vh - 200px)',
  maxWidth: '800px',
  margin: '0 auto',
}));

const MessageList = styled(List)(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  padding: theme.spacing(2),
}));

const MessageInput = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

function MessagingPlatform() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "Support", timestamp: new Date(Date.now() - 3600000).toISOString() },
    { id: 2, text: "I have a question about nutrition during pregnancy", sender: "User", timestamp: new Date(Date.now() - 1800000).toISOString() },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = () => {
    if (inputMessage.trim() !== '') {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: "User",
        timestamp: new Date().toISOString()
      };

      setMessages([...messages, newMessage]);
      setInputMessage('');

      // Simulate response after 1 second
      setTimeout(() => {
        const responseMessage = {
          id: messages.length + 2,
          text: "Thank you for your question. Our nutrition expert will respond shortly.",
          sender: "Support",
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, responseMessage]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Messaging Platform
      </Typography>
      <Typography variant="body1" paragraph sx={{ mb: 3 }}>
        Connect with our support team and other mothers
      </Typography>
      
      <Paper elevation={3} sx={{ borderRadius: '12px', overflow: 'hidden' }}>
        <MessageContainer>
          <MessageList>
            {messages.map((message) => (
              <React.Fragment key={message.id}>
                <ListItem sx={{ 
                  justifyContent: message.sender === "User" ? 'flex-end' : 'flex-start',
                  alignItems: 'flex-start',
                }}>
                  {message.sender !== "User" && (
                    <Avatar sx={{ mr: 1, bgcolor: 'primary.main' }}>
                      <AccountCircle />
                    </Avatar>
                  )}
                  <Box sx={{ 
                    maxWidth: '70%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: message.sender === "User" ? 'flex-end' : 'flex-start',
                  }}>
                    <Paper elevation={1} sx={{ 
                      p: 2,
                      borderRadius: message.sender === "User" ? '18px 18px 0 18px' : '18px 18px 18px 0',
                      backgroundColor: message.sender === "User" ? 'primary.light' : 'background.paper',
                      color: message.sender === "User" ? 'primary.contrastText' : 'text.primary',
                    }}>
                      <Typography variant="body1">{message.text}</Typography>
                    </Paper>
                    <Typography variant="caption" sx={{ mt: 0.5, color: 'text.secondary' }}>
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Typography>
                  </Box>
                  {message.sender === "User" && (
                    <Avatar sx={{ ml: 1, bgcolor: 'secondary.main' }}>
                      <AccountCircle />
                    </Avatar>
                  )}
                </ListItem>
                <Divider component="li" sx={{ my: 1 }} />
              </React.Fragment>
            ))}
          </MessageList>
          
          <MessageInput>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              sx={{ mr: 2 }}
            />
            <IconButton 
              color="primary" 
              onClick={sendMessage}
              disabled={!inputMessage.trim()}
              size="large"
            >
              <SendIcon fontSize="large" />
            </IconButton>
          </MessageInput>
        </MessageContainer>
      </Paper>
    </Box>
  );
}

export default MessagingPlatform;