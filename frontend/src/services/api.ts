import axios, { AxiosError } from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

export interface SearchQuery {
  query: string;
}

export interface SearchResult {
  id: string;
  location: string;
  target: string;
  throwable_type: string;
  description: string;
  image_paths: string[];
  tags: string[];
}

const api = {
  searchUtility: async (params: SearchQuery): Promise<SearchResult[]> => {
    try {
      console.log('Sending request to backend API...');
      
      const response = await axios.get(
        `${API_BASE_URL}/api/throwable-spots/query`,
        {
          params: {
            query: params.query
          }
        }
      );

      console.log('Received response from backend API');
      console.log('Response:', response.data);

      if (response.data.status === 'success' && Array.isArray(response.data.data.spots)) {
        return response.data.data.spots;
      } else {
        throw new Error('Invalid response format from backend');
      }
    } catch (error) {
      console.error('Error details:', error);
      if (error instanceof AxiosError) {
        if (error.response) {
          // 服务器响应了，但状态码不在 2xx 范围内
          const errorMessage = error.response.data.message || error.message;
          throw new Error(`API Error: ${error.response.status} - ${errorMessage}`);
        } else if (error.request) {
          // 请求已发出，但没有收到响应
          throw new Error('无法连接到服务器，请检查网络连接');
        } else {
          // 在设置请求时发生了错误
          throw new Error(`请求错误: ${error.message}`);
        }
      }
      throw error;
    }
  }
};

export default api; 