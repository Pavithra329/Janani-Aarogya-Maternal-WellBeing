import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  FormControl, 
  FormControlLabel, 
  Radio, 
  RadioGroup, 
  Button,
  Paper,
  Chip,
  Divider,
  LinearProgress
} from '@mui/material';
import { shuffle } from './shuffle';
import { styled } from '@mui/system';
import { 
  CheckCircle as CorrectIcon,
  Cancel as IncorrectIcon,
  EmojiEvents as TrophyIcon
} from '@mui/icons-material';

const QuizContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: '800px',
  margin: '0 auto',
}));

const QuestionCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderRadius: '16px',
  boxShadow: theme.shadows[3],
}));

const allQuestions = [
  {
    question: 'What is the average length of a full-term pregnancy?',
    options: ['37 weeks', '38 weeks', '39 weeks', '40 weeks'],
    answer: '40 weeks',
  },
  // ... (other questions remain the same)
];

const QUIZ_QUESTION_LIMIT = 5;

function Quiz({ onCorrectAnswer }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    const shuffledQuestions = shuffle([...allQuestions]).slice(0, QUIZ_QUESTION_LIMIT);
    setQuestions(shuffledQuestions);
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmitAnswer = () => {
    setShowAnswer(true);
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
      onCorrectAnswer(10);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption('');
    setShowAnswer(false);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    const shuffledQuestions = shuffle([...allQuestions]).slice(0, QUIZ_QUESTION_LIMIT);
    setQuestions(shuffledQuestions);
    setCurrentQuestion(0);
    setSelectedOption('');
    setScore(0);
    setShowScore(false);
    setShowAnswer(false);
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  return (
    <QuizContainer>
      {!quizStarted ? (
        <Card elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: '16px' }}>
          <Typography variant="h4" gutterBottom color="primary">
            Pregnancy Knowledge Quiz
          </Typography>
          <Typography variant="body1" paragraph>
            Test your knowledge about pregnancy with {QUIZ_QUESTION_LIMIT} random questions.
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 4 }}>
            Earn 10 reward points for each correct answer!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={startQuiz}
            sx={{ borderRadius: '28px', px: 4, py: 1.5 }}
          >
            Start Quiz
          </Button>
        </Card>
      ) : showScore ? (
        <Card elevation={3} sx={{ p: 4, borderRadius: '16px' }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <TrophyIcon color="primary" sx={{ fontSize: 80 }} />
            <Typography variant="h4" gutterBottom>
              Quiz Completed!
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom>
              You scored {score} out of {questions.length}
            </Typography>
            <Chip 
              label={`${Math.round((score / questions.length) * 100)}%`} 
              color="primary" 
              variant="outlined"
              sx={{ fontSize: '1.2rem', p: 1.5 }}
            />
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Correct Answers:
          </Typography>
          {questions.map((q, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="body1" fontWeight="medium">
                {index + 1}. {q.question}
              </Typography>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                {q.answer === selectedOption ? (
                  <CorrectIcon color="success" sx={{ mr: 1 }} />
                ) : (
                  <IncorrectIcon color="error" sx={{ mr: 1 }} />
                )}
                {q.answer}
              </Typography>
            </Box>
          ))}

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={restartQuiz}
              sx={{ borderRadius: '28px', px: 4, py: 1.5 }}
            >
              Take Quiz Again
            </Button>
          </Box>
        </Card>
      ) : questions.length > 0 && (
        <QuestionCard elevation={3}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Chip 
                label={`Question ${currentQuestion + 1} of ${questions.length}`}
                color="primary"
                variant="outlined"
              />
              <Chip 
                label={`Score: ${score}`}
                color="secondary"
              />
            </Box>

            <LinearProgress 
              variant="determinate" 
              value={((currentQuestion) / questions.length) * 100} 
              sx={{ mb: 3, height: 8, borderRadius: 4 }}
            />

            <Typography variant="h5" component="div" sx={{ mb: 3 }}>
              {questions[currentQuestion].question}
            </Typography>

            <FormControl component="fieldset" fullWidth>
              <RadioGroup 
                value={selectedOption} 
                onChange={handleOptionChange}
                sx={{ gap: 1 }}
              >
                {questions[currentQuestion].options.map((option, index) => (
                  <Paper 
                    key={index} 
                    elevation={1} 
                    sx={{ 
                      p: 2,
                      borderRadius: '8px',
                      border: selectedOption === option ? '2px solid' : '1px solid',
                      borderColor: selectedOption === option ? 'primary.main' : 'divider',
                      backgroundColor: showAnswer 
                        ? option === questions[currentQuestion].answer 
                          ? 'success.light' 
                          : selectedOption === option 
                            ? 'error.light' 
                            : 'background.paper'
                        : 'background.paper'
                    }}
                  >
                    <FormControlLabel 
                      value={option} 
                      control={<Radio />} 
                      label={option}
                      disabled={showAnswer}
                    />
                  </Paper>
                ))}
              </RadioGroup>
            </FormControl>

            {showAnswer ? (
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNextQuestion}
                  sx={{ borderRadius: '28px', px: 4 }}
                >
                  {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
                </Button>
              </Box>
            ) : (
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmitAnswer}
                  disabled={!selectedOption}
                  sx={{ borderRadius: '28px', px: 4 }}
                >
                  Submit Answer
                </Button>
              </Box>
            )}
          </CardContent>
        </QuestionCard>
      )}
    </QuizContainer>
  );
}

export default Quiz;