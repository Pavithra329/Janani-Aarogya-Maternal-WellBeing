import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Avatar, 
  Button, 
  Divider, 
  List, 
  ListItem, 
  ListItemText,
  ListItemAvatar,
  Grid,
  Chip
} from '@mui/material';
import { styled } from '@mui/system';
import { 
  EmojiEvents as TrophyIcon,
  CardGiftcard as RewardIcon,
  ShoppingCart as ShopIcon,
  Star as StarIcon,
  Redeem as RedeemIcon
} from '@mui/icons-material';

const RewardContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: '800px',
  margin: '0 auto',
}));

const rewardHistory = [
  { id: 1, action: 'Completed Quiz', points: 50, date: '2023-05-15' },
  { id: 2, action: 'Daily Login', points: 10, date: '2023-05-14' },
  { id: 3, action: 'Shared Experience', points: 20, date: '2023-05-12' },
  { id: 4, action: 'Completed Milestone', points: 30, date: '2023-05-10' },
];

const availableRewards = [
  { id: 1, name: 'Nutrition Guide', cost: 100, icon: <RewardIcon /> },
  { id: 2, name: 'Expert Consultation', cost: 200, icon: <RewardIcon /> },
  { id: 3, name: 'Premium Content', cost: 150, icon: <RewardIcon /> },
  { id: 4, name: 'Discount Coupon', cost: 250, icon: <RewardIcon /> },
];

function RewardPoints({ rewardPoints }) {
  return (
    <RewardContainer>
      <Card elevation={3} sx={{ mb: 3, borderRadius: '16px' }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <Avatar sx={{ 
            bgcolor: 'primary.main', 
            width: 80, 
            height: 80, 
            mx: 'auto',
            mb: 2
          }}>
            <TrophyIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography variant="h4" gutterBottom>
            Your Reward Points
          </Typography>
          <Chip 
            label={`${rewardPoints} points`} 
            color="primary" 
            sx={{ 
              fontSize: '1.5rem',
              p: 2,
              mb: 3
            }}
          />
          <Typography variant="body1" color="text.secondary" paragraph>
            Earn more points by completing activities and redeem them for exclusive rewards
          </Typography>
          <Button 
            variant="contained" 
            color="secondary"
            startIcon={<ShopIcon />}
            sx={{ borderRadius: '20px' }}
          >
            Reward Shop
          </Button>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ borderRadius: '16px' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <StarIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h5">Points History</Typography>
              </Box>
              <List>
                {rewardHistory.map((item) => (
                  <React.Fragment key={item.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.light' }}>
                          <Chip label={`+${item.points}`} color="primary" size="small" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary={item.action} 
                        secondary={item.date}
                        primaryTypographyProps={{ fontWeight: 'medium' }}
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ borderRadius: '16px' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <RedeemIcon color="secondary" sx={{ mr: 1 }} />
                <Typography variant="h5">Available Rewards</Typography>
              </Box>
              <List>
                {availableRewards.map((reward) => (
                  <React.Fragment key={reward.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'secondary.light' }}>
                          {reward.icon}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary={reward.name} 
                        secondary={`${reward.cost} points`}
                        primaryTypographyProps={{ fontWeight: 'medium' }}
                      />
                      <Button 
                        variant="outlined" 
                        color="secondary"
                        disabled={rewardPoints < reward.cost}
                        sx={{ borderRadius: '20px' }}
                      >
                        Redeem
                      </Button>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </RewardContainer>
  );
}

export default RewardPoints;