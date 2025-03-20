import React from 'react';
import { Typography, Box, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h1" gutterBottom>
        CS2 道具查询工具
      </Typography>
      <Typography variant="h5" color="text.secondary" paragraph>
        基于大模型的CS2道具点位查询工具
      </Typography>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          mt: 4, 
          maxWidth: 800, 
          mx: 'auto',
          backgroundColor: 'rgba(255, 255, 255, 0.05)'
        }}
      >
        <Typography variant="body1" paragraph>
          使用自然语言描述你的需求，AI将为你推荐合适的道具投掷点位。
          例如："我想在A点扔一个烟雾弹"或"如何封住B点的过点烟"。
        </Typography>
      </Paper>
      <Box sx={{ mt: 4 }}>
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          onClick={() => navigate('/search')}
          sx={{ mr: 2 }}
        >
          开始查询
        </Button>
        <Button 
          variant="contained" 
          color="secondary" 
          size="large"
          onClick={() => navigate('/map')}
        >
          查看地图
        </Button>
      </Box>
    </Box>
  );
};

export default Home; 