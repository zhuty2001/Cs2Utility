import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  TextField, 
  Button, 
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Alert,
  Snackbar,
  MobileStepper,
  IconButton,
  Paper
} from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { SearchResult } from '../services/api';

const UtilitySearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('请输入搜索内容');
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);
    setError(null);
    setActiveStep(0); // 重置图片索引

    try {
      // 使用测试数据
      const testData: SearchResult[] = [
        {
          id: "1",
          location: "A门外",
          target: "A大",
          throwable_type: "FLASH",
          description: "在A门外靠墙站，瞄准树的左下角，在队友进门时站立跳投，帮助队友A大对枪",
          image_paths: [
            "images/dust2/1/1.jpg",
            "images/dust2/1/2.jpg",
            "images/dust2/1/3.jpg"
          ],
          tags: [
            "A门",
            "A大",
            "闪光弹",
            "掩护"
          ]
        }
      ];

      console.log('设置测试数据:', testData);
      setResults(testData);
    } catch (err) {
      console.error('错误:', err);
      setError('显示测试数据时出错');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const imageLabels = ['站位', '准星', '效果'];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          fullWidth
          label="搜索投掷物点位"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button 
          variant="contained" 
          onClick={handleSearch}
          disabled={loading}
          sx={{ minWidth: '120px' }}
        >
          {loading ? <CircularProgress size={24} /> : '搜索'}
        </Button>
      </Box>

      <Grid container spacing={3}>
        {results.map((spot, index) => (
          <Grid item xs={12} key={index}>
            <Card>
              {spot.image_paths && spot.image_paths.length > 0 && (
                <Box sx={{ p: 2 }}>
                  <Paper 
                    elevation={0}
                    sx={{ 
                      position: 'relative',
                      backgroundColor: '#f5f5f5',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      p: 2
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      {imageLabels[activeStep]}
                    </Typography>
                    <Box
                      sx={{
                        height: 500,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden'
                      }}
                    >
                      <img
                        src={spot.image_paths[activeStep]}
                        alt={`${spot.location} - ${spot.throwable_type} - ${imageLabels[activeStep]}`}
                        style={{
                          maxHeight: '100%',
                          maxWidth: '100%',
                          objectFit: 'contain'
                        }}
                        onError={(e) => {
                          console.error('图片加载失败:', spot.image_paths[activeStep]);
                          e.currentTarget.src = 'https://placehold.co/800x600/png?text=图片加载失败';
                        }}
                      />
                    </Box>
                    <MobileStepper
                      variant="dots"
                      steps={spot.image_paths.length}
                      position="static"
                      activeStep={activeStep}
                      sx={{ 
                        maxWidth: 400,
                        flexGrow: 1,
                        mt: 2,
                        backgroundColor: 'transparent'
                      }}
                      nextButton={
                        <Button
                          size="small"
                          onClick={handleNext}
                          disabled={activeStep === spot.image_paths.length - 1}
                          endIcon={<KeyboardArrowRight />}
                        >
                          下一步
                        </Button>
                      }
                      backButton={
                        <Button
                          size="small"
                          onClick={handleBack}
                          disabled={activeStep === 0}
                          startIcon={<KeyboardArrowLeft />}
                        >
                          上一步
                        </Button>
                      }
                    />
                  </Paper>
                </Box>
              )}
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {spot.location} → {spot.target}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  投掷物类型: {spot.throwable_type}
                </Typography>
                <Typography variant="body2">
                  {spot.description}
                </Typography>
                {spot.tags && spot.tags.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      标签:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {spot.tags.map((tag: string, tagIndex: number) => (
                        <Typography
                          key={tagIndex}
                          variant="caption"
                          sx={{
                            backgroundColor: 'primary.main',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '4px',
                          }}
                        >
                          {tag}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UtilitySearch; 