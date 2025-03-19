import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  TextField, 
  Button, 
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const UtilitySearch: React.FC = () => {
  const [map, setMap] = useState('');
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    // TODO: 实现搜索逻辑
    console.log('Searching for:', { map, query });
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8, mb: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          道具查询
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          输入你的需求，AI将为你推荐合适的道具投掷点位
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>选择地图</InputLabel>
          <Select
            value={map}
            label="选择地图"
            onChange={(e) => setMap(e.target.value)}
          >
            <MenuItem value="dust2">Dust2</MenuItem>
            <MenuItem value="mirage">Mirage</MenuItem>
            <MenuItem value="inferno">Inferno</MenuItem>
            <MenuItem value="overpass">Overpass</MenuItem>
            <MenuItem value="nuke">Nuke</MenuItem>
            <MenuItem value="vertigo">Vertigo</MenuItem>
            <MenuItem value="ancient">Ancient</MenuItem>
            <MenuItem value="anubis">Anubis</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="输入你的需求"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="例如：我想在A点扔一个烟雾弹"
        />

        <Button
          variant="contained"
          size="large"
          startIcon={<SearchIcon />}
          onClick={handleSearch}
        >
          查询
        </Button>
      </Box>
    </Container>
  );
};

export default UtilitySearch; 