import axios, { AxiosError } from 'axios';

// 根据环境选择API基础URL
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://cs2utility.onrender.com/api'  // 生产环境URL
  : '/api';  // 开发环境URL

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
      console.log('准备发送请求到后端API...');
      console.log('当前环境:', process.env.NODE_ENV);
      console.log('请求URL:', `${API_BASE_URL}/throwable-spots/query`);
      console.log('请求参数:', params);
      
      const response = await axios.get(
        `${API_BASE_URL}/throwable-spots/query`,
        {
          params: {
            query: params.query
          }
        }
      );

      console.log('收到后端API响应');
      console.log('响应状态:', response.status);
      console.log('响应数据:', response.data);

      if (response.data.status === 'success' && Array.isArray(response.data.data.spots)) {
        console.log('成功解析响应数据');
        return response.data.data.spots;
      } else {
        console.error('响应数据格式无效:', response.data);
        throw new Error('Invalid response format from backend');
      }
    } catch (error) {
      console.error('API调用错误:', error);
      if (error instanceof AxiosError) {
        if (error.response) {
          // 服务器响应了，但状态码不在 2xx 范围内
          const errorMessage = error.response.data.message || error.message;
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