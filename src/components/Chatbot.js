import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Avatar, 
  Paper, 
  List, 
  ListItem, 
  ListItemText,
  ListItemAvatar,
  IconButton,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/system';
import { 
  Send as SendIcon,
  SmartToy as BotIcon,
  Person as UserIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';

// Gemini API configuration
const API_KEY = 'AIzaSyCZr56-VaW66-6WcGP1XGUoyzHz7dTSd7M'; // Replace with your actual API key
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

const ChatContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100vh - 200px)',
  maxWidth: '800px',
  margin: '0 auto',
  padding: theme.spacing(2),
}));

const MessageList = styled(List)(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  padding: theme.spacing(1),
}));

const MessageInput = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your pregnancy care assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message to chat
    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages([...messages, userMessage]);
    setInputMessage('');
    setLoading(true);
    setError(null);

    try {
      // Call Gemini API
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a helpful pregnancy care assistant. Provide accurate, compassionate advice. 
              The user asked: "${inputMessage}"`
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      
      // Extract the response text
      const botResponse = data.candidates[0].content.parts[0].text;

      // Add bot response to chat
      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error('Error calling Gemini API:', err);
      setError('Sorry, I encountered an error. Please try again.');
      
      // Add error message to chat
      const errorMessage = {
        id: messages.length + 2,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages([{
      id: 1,
      text: "Hello! I'm your pregnancy care assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date().toISOString()
    }]);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom color="primary" sx={{ mb: 3 }}>
        Pregnancy Care Assistant
      </Typography>
      
      <Paper elevation={3} sx={{ borderRadius: '16px', overflow: 'hidden' }}>
        <Box sx={{ 
          p: 2, 
          bgcolor: 'primary.main', 
          color: 'primary.contrastText',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <BotIcon sx={{ mr: 1 }} />
            <Typography variant="h6">Ask me anything about pregnancy</Typography>
          </Box>
          <IconButton 
            color="inherit" 
            onClick={handleResetChat}
            title="Reset conversation"
          >
            <RefreshIcon />
          </IconButton>
        </Box>

        <ChatContainer>
          <MessageList>
            {messages.map((message) => (
              <ListItem 
                key={message.id} 
                sx={{ 
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  alignItems: 'flex-start',
                }}
              >
                {message.sender === 'bot' && (
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <BotIcon />
                    </Avatar>
                  </ListItemAvatar>
                )}
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    maxWidth: '80%',
                    borderRadius: message.sender === 'user' 
                      ? '18px 18px 0 18px' 
                      : '18px 18px 18px 0',
                    backgroundColor: message.sender === 'user' 
                      ? 'primary.light' 
                      : 'background.paper',
                    color: message.sender === 'user' 
                      ? 'primary.contrastText' 
                      : 'text.primary',
                  }}
                >
                  <Typography variant="body1">{message.text}</Typography>
                </Paper>
                {message.sender === 'user' && (
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'secondary.main', ml: 1 }}>
                      <UserIcon />
                    </Avatar>
                  </ListItemAvatar>
                )}
              </ListItem>
            ))}
            {loading && (
              <ListItem sx={{ justifyContent: 'flex-start' }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <BotIcon />
                  </Avatar>
                </ListItemAvatar>
                <Paper elevation={1} sx={{ p: 2, borderRadius: '18px 18px 18px 0' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CircularProgress size={20} sx={{ mr: 2 }} />
                    <Typography variant="body1">Thinking...</Typography>
                  </Box>
                </Paper>
              </ListItem>
            )}
            <div ref={messagesEndRef} />
          </MessageList>

          <MessageInput>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              variant="outlined"
              placeholder="Type your question about pregnancy..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              sx={{ mr: 2 }}
            />
            <IconButton 
              color="primary" 
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || loading}
              size="large"
            >
              <SendIcon />
            </IconButton>
          </MessageInput>
        </ChatContainer>
      </Paper>

      {error && (
        <Typography color="error" sx={{ mt: 1, textAlign: 'center' }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}

export default Chatbot;