import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemButton
} from '@mui/material';

const MapView: React.FC = () => {
  const [selectedMap, setSelectedMap] = useState('dust2');

  const maps = [
    { id: 'dust2', name: 'Dust2' },
    { id: 'mirage', name: 'Mirage' },
    { id: 'inferno', name: 'Inferno' },
    { id: 'overpass', name: 'Overpass' },
    { id: 'nuke', name: 'Nuke' },
    { id: 'vertigo', name: 'Vertigo' },
    { id: 'ancient', name: 'Ancient' },
    { id: 'anubis', name: 'Anubis' }
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, mb: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          地图视图
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          在地图上查看和选择道具投掷点位
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* 左侧地图列表 */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ height: '100%' }}>
            <List>
              {maps.map((map) => (
                <ListItem key={map.id} disablePadding>
                  <ListItemButton
                    selected={selectedMap === map.id}
                    onClick={() => setSelectedMap(map.id)}
                  >
                    <ListItemText primary={map.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* 右侧地图显示区域 */}
        <Grid item xs={12} md={9}>
          <Paper sx={{ height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              地图显示区域 - {maps.find(m => m.id === selectedMap)?.name}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MapView; 