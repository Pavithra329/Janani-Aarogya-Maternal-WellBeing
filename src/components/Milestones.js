// src/components/Milestones.js
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Stepper, 
  Step, 
  StepLabel, 
  Button, 
  TextField,
  Card,
  CardContent
} from '@mui/material';
import { styled } from '@mui/system';

const milestonesDetails = [
  {
    month: 1,
    title: "First Month",
    description: "During the first month of pregnancy, many women may not yet realize they are pregnant. It's crucial to start taking prenatal vitamins with folic acid to prevent neural tube defects. A balanced diet rich in fruits, vegetables, lean proteins, and whole grains is essential. Avoid alcohol, caffeine, and smoking. Emotionally, you may experience mood swings due to hormonal changes. Regular light exercise, like walking, can help manage stress. Internally, the fertilized egg implants in the uterus, and the placenta begins to form, leading to missed periods and possibly light spotting."
  },
  {
    month: 2,
    title: "Second Month",
    description: "By the second month, morning sickness and fatigue may be more pronounced. It's important to eat small, frequent meals to manage nausea and maintain energy levels. Ensure you're drinking plenty of water and getting enough sleep. Emotionally, you might feel more anxious as the reality of pregnancy sets in. Support from loved ones and prenatal yoga can be beneficial. Internally, the baby's organs begin to develop, and the embryo grows rapidly. You might notice breast tenderness and increased urination due to hormonal changes and growing uterus."
  },
  {
    month: 3,
    title: "Third Month",
    description: "In the third month, nausea might begin to subside, but it's important to continue eating nutritious foods and staying hydrated. Incorporate iron-rich foods to support increased blood volume. Emotionally, you may feel relief as the risk of miscarriage decreases, but it's normal to still feel a range of emotions. Regular exercise can help maintain emotional well-being. Internally, the baby’s arms, hands, fingers, feet, and toes are fully formed, and the heartbeat can be detected. You might start to notice a slight baby bump as your uterus expands."
  },
  {
    month: 4,
    title: "Fourth Month",
    description: "By the fourth month, energy levels often improve, and many women start to feel better. Continue focusing on a balanced diet, with extra calcium for bone development. It’s a good time to begin regular prenatal check-ups. Emotionally, you may feel more connected to the baby as movements might become noticeable. Body changes include a growing belly, and some women experience skin changes. Internally, the baby’s skeleton is starting to harden from rubbery cartilage to bone, and the nervous system is functioning."
  },
  {
    month: 5,
    title: "Fifth Month",
    description: "During the fifth month, increased appetite is common as the baby grows. Eating nutrient-dense snacks and staying active is important. Regular prenatal visits are crucial for monitoring the baby's development. Emotionally, you may feel excitement mixed with anxiety about the upcoming changes. Internally, the baby’s muscles are developing, and you may start to feel more defined movements. Stretch marks might appear, and backaches can start due to the growing uterus."
  },
  {
    month: 6,
    title: "Sixth Month",
    description: "In the sixth month, you should continue eating a healthy diet, focusing on foods rich in omega-3 fatty acids for brain development. Managing your weight gain through proper nutrition and exercise is important. Emotionally, it’s common to experience a nesting instinct and feel a stronger bond with the baby. Internally, the baby’s lungs and taste buds develop. Physical changes include noticeable weight gain and possibly swollen ankles and feet."
  },
  {
    month: 7,
    title: "Seventh Month",
    description: "By the seventh month, you may need to adjust your diet to avoid excessive weight gain, focusing on smaller, balanced meals. Regular prenatal visits continue to be important. Emotionally, feelings of anticipation and anxiety about childbirth may increase. Internally, the baby is more active and responsive to sounds and light. You might experience Braxton Hicks contractions and more frequent bathroom trips as the baby grows."
  },
  {
    month: 8,
    title: "Eighth Month",
    description: "In the eighth month, you may need to rest more often and adjust your daily routine to accommodate your growing belly. Continuing with a healthy diet and staying hydrated is crucial. Emotionally, you might feel impatient and nervous as the due date approaches. Internally, the baby’s brain development accelerates, and the baby gains more weight. Physical changes include more pronounced swelling, shortness of breath, and difficulty sleeping."
  },
  {
    month: 9,
    title: "Ninth Month",
    description: "During the ninth month, preparing for labor and delivery is key. Continue with a balanced diet, and attend regular prenatal appointments. It’s important to rest and conserve energy. Emotionally, you may feel a mix of excitement and anxiety about the upcoming birth. Internally, the baby drops lower into the pelvis, preparing for birth, which might relieve some pressure on your lungs but increase pelvic discomfort. Body changes include the cervix beginning to dilate, and you may experience more frequent Braxton Hicks contractions."
  }
];

const MilestoneContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: '900px',
  margin: '0 auto',
}));

const MonthForm = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  marginBottom: theme.spacing(4),
}));

const MilestoneStepper = styled(Stepper)(({ theme }) => ({
  padding: theme.spacing(3, 0),
  marginBottom: theme.spacing(4),
}));

function Milestones() {
  const [currentMonth, setCurrentMonth] = useState(0);
  const [userMonth, setUserMonth] = useState('');

  useEffect(() => {
    const storedMonth = localStorage.getItem('currentMonth');
    if (storedMonth) {
      setCurrentMonth(parseInt(storedMonth, 10));
    }
  }, []);

  const handleUserMonthSubmit = (e) => {
    e.preventDefault();
    const month = parseInt(userMonth, 10);
    if (month >= 1 && month <= 9) {
      localStorage.setItem('currentMonth', month);
      setCurrentMonth(month);
    } else {
      alert('Please enter a valid month between 1 and 9.');
    }
  };

  if (currentMonth === 0) {
    return (
      <MilestoneContainer>
        <MonthForm elevation={3}>
          <Typography variant="h4" gutterBottom color="primary">
            Track Your Pregnancy Journey
          </Typography>
          <Typography variant="body1" paragraph>
            Enter your current pregnancy month to get personalized information and track your progress
          </Typography>
          <Box 
            component="form" 
            onSubmit={handleUserMonthSubmit}
            sx={{ mt: 3 }}
          >
            <TextField
              type="number"
              inputProps={{ min: 1, max: 9 }}
              value={userMonth}
              onChange={(e) => setUserMonth(e.target.value)}
              placeholder="Month (1-9)"
              variant="outlined"
              required
              sx={{ mr: 2, width: '120px' }}
            />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              size="large"
            >
              Continue
            </Button>
          </Box>
        </MonthForm>
      </MilestoneContainer>
    );
  }

  return (
    <MilestoneContainer>
      <Typography variant="h4" gutterBottom color="primary">
        Pregnancy Milestones
      </Typography>
      <Typography variant="body1" paragraph sx={{ mb: 4 }}>
        You are currently in month {currentMonth} of your pregnancy
      </Typography>

      <MilestoneStepper activeStep={currentMonth - 1} alternativeLabel>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((month) => (
          <Step key={month}>
            <StepLabel>{`Month ${month}`}</StepLabel>
          </Step>
        ))}
      </MilestoneStepper>

      <Card elevation={3}>
        <CardContent>
          <Typography variant="h5" color="primary" gutterBottom>
            {milestonesDetails[currentMonth - 1].title}
          </Typography>
          <Typography variant="body1" paragraph>
            {milestonesDetails[currentMonth - 1].description}
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button 
          variant="outlined" 
          color="primary"
          onClick={() => setCurrentMonth(0)}
          sx={{ mr: 2 }}
        >
          Change Month
        </Button>
        {currentMonth > 1 && (
          <Button 
            variant="contained" 
            color="secondary"
            onClick={() => setCurrentMonth(currentMonth - 1)}
            sx={{ mr: 2 }}
          >
            Previous Month
          </Button>
        )}
        {currentMonth < 9 && (
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => setCurrentMonth(currentMonth + 1)}
          >
            Next Month
          </Button>
        )}
      </Box>
    </MilestoneContainer>
  );
}

export default Milestones;