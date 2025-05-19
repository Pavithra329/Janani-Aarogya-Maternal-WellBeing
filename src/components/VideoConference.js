import React, { useState,useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Avatar, 
  Divider,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/system';
import { 
  Videocam as VideoIcon,
  Mic as MicIcon,
  ScreenShare as ShareIcon,
  CallEnd as EndCallIcon,
  Person as PersonIcon
} from '@mui/icons-material';

const VideoContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: '1000px',
  margin: '0 auto',
}));

const VideoConference = ({ roomName, displayName }) => {
  const jitsiContainerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [callStarted, setCallStarted] = useState(false);

  useEffect(() => {
    const loadJitsiScript = () => {
      return new Promise((resolve, reject) => {
        const existingScript = document.getElementById('jitsi-script');
        if (!existingScript) {
          const script = document.createElement('script');
          script.src = 'https://meet.jit.si/external_api.js';
          script.id = 'jitsi-script';
          document.body.appendChild(script);

          script.onload = () => {
            resolve();
          };

          script.onerror = (error) => {
            reject(error);
          };
        } else {
          resolve();
        }
      });
    };

    const initJitsi = async () => {
      try {
        await loadJitsiScript();
        setLoading(false);

        if (callStarted) {
          const domain = 'meet.jit.si';
          const options = {
            roomName,
            parentNode: jitsiContainerRef.current,
            userInfo: {
              displayName,
            },
            configOverwrite: {
              startWithAudioMuted: true,
              startWithVideoMuted: false,
            },
            interfaceConfigOverwrite: {
              filmStripOnly: false,
              SHOW_JITSI_WATERMARK: false,
            }
          };
          
          const api = new window.JitsiMeetExternalAPI(domain, options);
          
          api.executeCommand('displayName', displayName);
          
          api.addListener('videoConferenceJoined', () => {
            console.log('You joined the conference');
          });

          return () => {
            api.dispose();
          };
        }
      } catch (error) {
        console.error('Failed to load Jitsi Meet API', error);
        setLoading(false);
      }
    };

    initJitsi();
  }, [roomName, displayName, callStarted]);

  const startCall = () => {
    setCallStarted(true);
  };

  return (
    <VideoContainer>
      <Typography variant="h3" gutterBottom color="primary" sx={{ mb: 3 }}>
        Video Consultation
      </Typography>

      {!callStarted ? (
        <Card elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: '16px' }}>
          <Avatar sx={{ 
            bgcolor: 'primary.main', 
            width: 80, 
            height: 80, 
            mx: 'auto',
            mb: 3
          }}>
            <VideoIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography variant="h5" gutterBottom>
            Ready to Start Your Consultation
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Connect with our experts for personalized advice and support
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={startCall}
            startIcon={<VideoIcon />}
            sx={{ borderRadius: '28px', px: 4, mt: 2 }}
          >
            Start Video Call
          </Button>
        </Card>
      ) : loading ? (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          p: 4
        }}>
          <CircularProgress size={80} thickness={4} sx={{ mb: 3 }} />
          <Typography variant="h6" gutterBottom>
            Connecting to Video Call...
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Please wait while we connect you with the expert
          </Typography>
        </Box>
      ) : (
        <>
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
            <PersonIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6">
              Connected with: <strong>{displayName}</strong>
            </Typography>
          </Box>
          
          <Card elevation={3} sx={{ borderRadius: '16px', overflow: 'hidden' }}>
            <div ref={jitsiContainerRef} style={{ height: '600px', width: '100%' }} />
          </Card>

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mt: 3,
            gap: 2
          }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<MicIcon />}
              sx={{ borderRadius: '28px', px: 3 }}
            >
              Mute
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<VideoIcon />}
              sx={{ borderRadius: '28px', px: 3 }}
            >
              Video Off
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ShareIcon />}
              sx={{ borderRadius: '28px', px: 3 }}
            >
              Share Screen
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<EndCallIcon />}
              sx={{ borderRadius: '28px', px: 3 }}
            >
              End Call
            </Button>
          </Box>
        </>
      )}
    </VideoContainer>
  );
};

export default VideoConference;