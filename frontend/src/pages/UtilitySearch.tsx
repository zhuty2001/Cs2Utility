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
  Chip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import api, { SearchResult } from '../services/api';

const UtilitySearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSearch = async () => {
    if (!query) {
      setError('请输入查询内容');
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      console.log('Starting search with:', { query });
      const searchResults = await api.searchUtility({ query });
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
                  目标: {result.target} | 道具类型: {result.throwable_type}
                </Typography>
                <Typography variant="body2" paragraph>
                  {result.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {result.tags.map((tag, index) => (
                    <Chip key={index} label={tag} size="small" />
                  ))}
                </Box>
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