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
  ImageList,
  ImageListItem
} from '@mui/material';
import { SearchResult } from '../services/api';

const UtilitySearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('请输入搜索内容');
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);
    setError(null);

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
            "images/dust2/1/position.jpg",
            "images/dust2/1/crosshair.jpg"
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
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              {spot.image_paths && spot.image_paths.length > 0 && (
                <Box sx={{ p: 2 }}>
                  <ImageList cols={2} rowHeight={200} gap={8}>
                    {spot.image_paths.map((imagePath, imgIndex) => (
                      <ImageListItem key={imgIndex}>
                        <img
                          src={imagePath}
                          alt={`${spot.location} - ${spot.throwable_type} - 图片${imgIndex + 1}`}
                          loading="lazy"
                          style={{ height: '200px', objectFit: 'cover' }}
                          onError={(e) => {
                            console.error('图片加载失败:', imagePath);
                            e.currentTarget.src = 'https://placehold.co/400x300/png?text=图片加载失败';
                          }}
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
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