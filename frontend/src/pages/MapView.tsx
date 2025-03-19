import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar
} from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup, useMap, ImageOverlay } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { mapConfigs, mapLocations, MapLocation } from '../data/mapData';

// 修复Leaflet默认图标问题
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// 地图更新组件
function ChangeView({ center, zoom, bounds }: { center: [number, number], zoom: number, bounds: [[number, number], [number, number]] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
    map.fitBounds(bounds);
  }, [center, zoom, bounds, map]);
  return null;
}

const MapView: React.FC = () => {
  const [selectedMap, setSelectedMap] = useState('dust2');
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const locations = mapLocations[selectedMap] || [];
  const mapConfig = mapConfigs[selectedMap];

  const handleLocationClick = (location: MapLocation) => {
    setSelectedLocation(location);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedLocation(null);
  };

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
              {Object.keys(mapLocations).map((map) => (
                <ListItem key={map} disablePadding>
                  <ListItemButton
                    selected={selectedMap === map}
                    onClick={() => setSelectedMap(map)}
                  >
                    <ListItemText primary={map.toUpperCase()} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* 右侧地图显示区域 */}
        <Grid item xs={12} md={9}>
          <Paper sx={{ height: '600px', overflow: 'hidden' }}>
            <MapContainer
              center={mapConfig.center}
              zoom={mapConfig.zoom}
              style={{ height: '100%', width: '100%' }}
            >
              <ChangeView 
                center={mapConfig.center} 
                zoom={mapConfig.zoom}
                bounds={mapConfig.bounds}
              />
              {/* 使用地图图片作为底图 */}
              <ImageOverlay
                url={mapConfig.mapImage.url}
                bounds={mapConfig.bounds}
                opacity={0.8}
              />
              {locations.map((location) => (
                <Marker
                  key={location.id}
                  position={location.coordinates}
                  eventHandlers={{
                    click: () => handleLocationClick(location)
                  }}
                >
                  <Popup>
                    <Typography variant="h6">{location.name}</Typography>
                    <Typography variant="body2">{location.description}</Typography>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* 详情对话框 */}
      <Dialog 
        open={dialogOpen} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedLocation?.name}
        </DialogTitle>
        <DialogContent>
          {selectedLocation?.image_url && (
            <Box sx={{ mb: 2 }}>
              <img 
                src={selectedLocation.image_url} 
                alt={selectedLocation.name}
                style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
              />
            </Box>
          )}
          <Typography variant="body1" paragraph>
            {selectedLocation?.description}
          </Typography>
          <Typography variant="body2">
            <strong>道具类型：</strong> {selectedLocation?.utility_type}
          </Typography>
          <Typography variant="body2">
            <strong>投掷方式：</strong> {selectedLocation?.throw_type}
          </Typography>
          <Typography variant="body2">
            <strong>难度：</strong> {selectedLocation?.difficulty}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>关闭</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MapView; 