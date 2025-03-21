import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { MapContainer, ImageOverlay, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

type MapConfig = {
  center: [number, number];
  zoom: number;
  bounds: [[number, number], [number, number]];
};

type MapConfigs = {
  [key: string]: MapConfig;
};

type MapInfo = {
  name: string;
  radarFiles: string[];
  currentRadarIndex: number;
};

// 默认地图配置
const defaultMapConfig: MapConfig = {
  center: [512, 512],
  zoom: 0,
  bounds: [[0, 0], [1024, 1024]]
};

// 地图名称映射
const mapNameMapping: { [key: string]: string } = {
  dust2: 'Dust 2',
  mirage: 'Mirage',
  inferno: 'Inferno',
  overpass: 'Overpass',
  nuke: 'Nuke',
  vertigo: 'Vertigo',
  ancient: 'Ancient',
  anubis: 'Anubis'
};

// 地图雷达图文件映射
const mapRadarFiles: { [key: string]: string[] } = {
  dust2: ['Dust-2-callouts-1.jpg'],
  mirage: ['csgo-mirage-map-callouts-counter-strike.jpg'],
  inferno: ['csgo-Inferno-map-callouts-and-positions.jpg'],
  nuke: ['Nuke-callouts-A-site.jpg', 'Nuke-callouts-B-bombsite.jpg'],
  ancient: ['Ancient-callouts.jpg'],
  anubis: ['CSGO-Anubis-Callouts.jpg'],
  overpass: ['Overpass-Callouts.jpg'],
  vertigo: ['Vertigo-callouts-lower.jpg', 'Vertigo-callouts-upper.jpg'],
  train: ['CS2-Train-Map-callouts-and-positions.jpg']
};

// 地图更新组件
function ChangeView({ center, zoom, bounds }: MapConfig) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
    map.fitBounds(bounds);
    map.setMinZoom(-2);
    map.setMaxZoom(2);
    // 设置最大边界，防止拖出范围
    map.setMaxBounds(bounds);
  }, [center, zoom, bounds, map]);
  return null;
}

const MapView: React.FC = () => {
  const [selectedMap, setSelectedMap] = useState<string>('dust2');
  const [imageError, setImageError] = useState<boolean>(false);
  const [currentRadarIndex, setCurrentRadarIndex] = useState<number>(0);

  useEffect(() => {
    const radarFiles = mapRadarFiles[selectedMap];
    if (radarFiles && radarFiles.length > 0) {
      const img = new Image();
      const imagePath = `/images/maps/${selectedMap}/${radarFiles[currentRadarIndex]}`;
      console.log('Loading image:', imagePath);
      img.src = imagePath;
      img.onerror = () => {
        console.error('Failed to load map image:', imagePath);
        setImageError(true);
      };
      img.onload = () => {
        console.log('Image loaded successfully:', imagePath);
        setImageError(false);
      };
    }
  }, [selectedMap, currentRadarIndex]);

  const mapConfig = defaultMapConfig;
  const radarFiles = mapRadarFiles[selectedMap] || [];
  const hasMultipleRadars = radarFiles.length > 1;

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          CS2 地图视图
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          选择地图查看详细视图
        </Typography>
      </Box>

      <Box sx={{ mb: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>选择地图</InputLabel>
          <Select
            value={selectedMap}
            label="选择地图"
            onChange={(e) => {
              setSelectedMap(e.target.value);
              setCurrentRadarIndex(0);
            }}
            sx={{ bgcolor: 'background.paper' }}
          >
            {Object.entries(mapNameMapping).map(([key, name]) => (
              <MenuItem key={key} value={key}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {hasMultipleRadars && (
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>选择视图</InputLabel>
            <Select
              value={currentRadarIndex}
              label="选择视图"
              onChange={(e) => setCurrentRadarIndex(Number(e.target.value))}
              sx={{ bgcolor: 'background.paper' }}
            >
              {radarFiles.map((file, index) => (
                <MenuItem key={index} value={index}>
                  {file.replace(/_/g, ' ').replace(/\.png$/, '')}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Box>

      <Paper sx={{ height: '600px', overflow: 'hidden', position: 'relative' }}>
        {imageError ? (
          <Box 
            sx={{ 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              bgcolor: '#1a1a1a',
              color: 'text.secondary'
            }}
          >
            <Typography variant="h6">
              地图图片加载失败，请确保图片已放置在正确位置
            </Typography>
          </Box>
        ) : (
          <MapContainer
            center={mapConfig.center}
            zoom={mapConfig.zoom}
            style={{ height: '100%', width: '100%', backgroundColor: '#1a1a1a' }}
            zoomControl={true}
            attributionControl={false}
            minZoom={-2}
            maxZoom={2}
            scrollWheelZoom={true}
            crs={L.CRS.Simple}
            maxBounds={mapConfig.bounds}
            maxBoundsViscosity={1.0}
            dragging={true}
          >
            <ChangeView 
              center={mapConfig.center} 
              zoom={mapConfig.zoom}
              bounds={mapConfig.bounds}
            />
            {radarFiles.length > 0 && (
              <ImageOverlay
                url={`/images/maps/${selectedMap}/${radarFiles[currentRadarIndex]}`}
                bounds={mapConfig.bounds}
                opacity={1}
              />
            )}
          </MapContainer>
        )}
      </Paper>
    </Container>
  );
};

export default MapView; 