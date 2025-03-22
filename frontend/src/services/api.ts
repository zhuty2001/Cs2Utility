import axios, { AxiosError } from 'axios';

// 根据环境使用不同的API地址
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://cs2utility.onrender.com/api'  // 生产环境API地址
  : 'http://127.0.0.1:8000/api';  // 开发环境API地址

console.log('当前环境:', process.env.NODE_ENV);
console.log('API基础URL:', API_BASE_URL);

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

export interface ApiResponse {
  status: string;
  data: {
    spots: SearchResult[];
  };
}

const api = {
  searchUtility: async (query: string): Promise<ApiResponse> => {
    try {
      console.log('准备发送请求到后端API...');
      console.log('请求URL:', `${API_BASE_URL}/throwable-spots/query`);
      console.log('请求参数:', { query });
      
      const response = await axios.get<ApiResponse>(
        `${API_BASE_URL}/throwable-spots/query`,
        {
          params: { query },
          timeout: 10000, // 设置超时时间为10秒
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('收到后端API响应');
      console.log('响应状态:', response.status);
      console.log('响应数据:', response.data);

      if (!response.data) {
        throw new Error('API返回数据为空');
      }

      return response.data;
    } catch (error) {
      console.error('API调用错误:', error);
      if (error instanceof AxiosError) {
        if (error.response) {
          // 服务器响应了，但状态码不在 2xx 范围内
          const errorMessage = error.response.data?.message || error.message;
          console.error('服务器错误响应:', error.response.status, errorMessage);
          throw new Error(`API Error: ${error.response.status} - ${errorMessage}`);
        } else if (error.request) {
          // 请求已发出，但没有收到响应
          console.error('未收到服务器响应');
          throw new Error('无法连接到服务器，请检查网络连接');
        } else {
          // 在设置请求时发生了错误
          console.error('请求设置错误:', error.message);
          throw new Error(`请求错误: ${error.message}`);
        }
      }
      throw error;
    }
  }
};

export default api; 