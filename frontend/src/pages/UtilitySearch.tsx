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
  MenuItem,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import api, { SearchResult } from '../services/api';

const UtilitySearch: React.FC = () => {
  const [map, setMap] = useState('');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSearch = async () => {
    if (!map || !query) {
      setError('请选择地图并输入查询内容');
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      console.log('Starting search with:', { map, query });
      const searchResults = await api.searchUtility({ map, query });
      console.log('Search results:', searchResults);
      setResults(searchResults);
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : '查询失败，请稍后重试');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'success.main';
      case 'medium': return 'warning.main';
      case 'hard': return 'error.main';
      default: return 'text.primary';
    }
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
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? '查询中...' : '查询'}
        </Button>
      </Box>

      <Grid container spacing={2}>
        {results.map((result) => (
          <Grid item xs={12} key={result.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {result.location}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  道具类型: {result.utility_type} | 投掷方式: {result.throw_type}
                </Typography>
                <Typography variant="body2" paragraph>
                  {result.description}
                </Typography>
                <Typography 
                  variant="body2" 
                  color={getDifficultyColor(result.difficulty)}
                >
                  难度: {result.difficulty}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="error" 
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UtilitySearch; 