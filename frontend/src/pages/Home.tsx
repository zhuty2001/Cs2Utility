import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardContent 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MapIcon from '@mui/icons-material/Map';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8, mb: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          CS2 Utility Tool
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          基于大模型的CS2道具点位查询工具
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Card 
            sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/search')}
          >
            <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
              <SearchIcon sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h5" component="h2" gutterBottom>
                道具查询
              </Typography>
              <Typography>
                使用自然语言描述你的需求，AI将为你推荐合适的道具投掷点位
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card 
            sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/map')}
          >
            <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
              <MapIcon sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h5" component="h2" gutterBottom>
                地图视图
              </Typography>
              <Typography>
                在地图上查看和选择道具投掷点位，获取详细的投掷指南
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home; 