import React from 'react';
import { 
  Typography, 
  Container, 
  Card, 
  CardContent, 
  CardActionArea, 
  Grid,
  Chip,
  Divider,
  Box,
  InputAdornment,
  TextField,
  Button
} from '@mui/material';
import { 
  Search,
  Favorite,
  LocalHospital,
  Psychology,
  FitnessCenter,
  ChildFriendly,
  Bookmark,
  OpenInNew
} from '@mui/icons-material';
import { styled } from '@mui/system';

// Categorized resources
const resourcesData = [
  {
    category: 'Pregnancy Guides',
    icon: <Favorite color="primary" />,
    items: [
      {
        title: 'Pregnancy Care Guide',
        description: 'Comprehensive guide to taking care of yourself during pregnancy',
        link: 'https://go.logansportmemorial.org/healthy-pregnancy-guide',
        tags: ['health', 'guide']
      },
      {
        title: 'Weekly Pregnancy Tracker',
        description: 'Track your pregnancy week by week with expert advice',
        link: 'https://www.whattoexpect.com/pregnancy/week-by-week/',
        tags: ['tracker', 'weekly']
      }
    ]
  },
  {
    category: 'Nutrition',
    icon: <LocalHospital color="primary" />,
    items: [
      {
        title: 'Nutrition Tips for Expecting Mothers',
        description: 'Essential nutrition tips for maintaining a healthy diet',
        link: 'https://vikaspedia.in/health/nutrition/dietary-guidelines-1/nutrition-for-pregnant-and-lactating-women',
        tags: ['diet', 'nutrition']
      }
    ]
  },
  {
    category: 'Mental Health',
    icon: <Psychology color="primary" />,
    items: [
      {
        title: 'Mental Health Resources',
        description: 'Support for mental health during and after pregnancy',
        link: 'https://www.nhs.uk/pregnancy/keeping-well/mental-health/',
        tags: ['wellness', 'support']
      }
    ]
  },
  {
    category: 'Fitness',
    icon: <FitnessCenter color="primary" />,
    items: [
      {
        title: 'Exercise and Fitness',
        description: 'Safe exercise routines for pregnant women',
        link: 'https://www.betterhealth.vic.gov.au/health/healthyliving/pregnancy-and-exercise',
        tags: ['workout', 'safety']
      }
    ]
  },
  {
    category: 'Postpartum',
    icon: <ChildFriendly color="primary" />,
    items: [
      {
        title: 'Postpartum Care Guide',
        description: 'Caring for yourself and your newborn after delivery',
        link: 'https://www.marchofdimes.org/find-support/topics/postpartum/postpartum-care',
        tags: ['recovery', 'newborn']
      }
    ]
  }
];

const ResourceCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8]
  }
}));

const CategoryHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  borderBottom: `2px solid ${theme.palette.primary.light}`
}));

function Resources() {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredResources = resourcesData.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })).filter(category => category.items.length > 0);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Maternal Health Resources
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Curated collection of trusted resources for every stage of motherhood
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="primary" />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <Button onClick={() => setSearchTerm('')}>Clear</Button>
            )
          }}
        />
      </Box>

      {filteredResources.length === 0 ? (
        <Typography variant="h6" align="center" sx={{ py: 4 }}>
          No resources found matching your search
        </Typography>
      ) : (
        filteredResources.map((category, index) => (
          <Box key={index} sx={{ mb: 6 }}>
            <CategoryHeader>
              {category.icon}
              <Typography variant="h5" sx={{ ml: 1, fontWeight: 'medium' }}>
                {category.category}
              </Typography>
            </CategoryHeader>

            <Grid container spacing={3}>
              {category.items.map((item, itemIndex) => (
                <Grid item xs={12} sm={6} md={4} key={itemIndex}>
                  <ResourceCard elevation={3}>
                    <CardActionArea 
                      component="a" 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      sx={{ flexGrow: 1 }}
                    >
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="h6" gutterBottom>
                            {item.title}
                          </Typography>
                          <OpenInNew fontSize="small" color="action" />
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {item.description}
                        </Typography>
                        <Box sx={{ mt: 'auto' }}>
                          {item.tags.map((tag, tagIndex) => (
                            <Chip
                              key={tagIndex}
                              label={tag}
                              size="small"
                              sx={{ mr: 1, mb: 1 }}
                            />
                          ))}
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </ResourceCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))
      )}
    </Container>
  );
}

export default Resources;