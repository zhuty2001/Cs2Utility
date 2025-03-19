import axios, { AxiosError } from 'axios';

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export interface SearchQuery {
  map: string;
  query: string;
}

export interface SearchResult {
  id: string;
  map: string;
  location: string;
  description: string;
  coordinates: {
    x: number;
    y: number;
    z: number;
  };
  utility_type: string;
  throw_type: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const generatePrompt = (map: string, query: string) => {
  return `作为一个CS2（Counter-Strike 2）的道具投掷专家，请根据以下信息推荐合适的道具投掷点位：

地图：${map}
需求：${query}

请按照以下格式提供3个推荐点位：
1. 位置名称
2. 道具类型（烟雾弹/闪光弹/燃烧弹）
3. 投掷方式（跳投/站立/跑动）
4. 详细描述
5. 难度等级（easy/medium/hard）
6. 坐标位置（x, y, z）

请用JSON格式返回，包含以下字段：
{
  "results": [
    {
      "id": "唯一ID",
      "map": "地图名称",
      "location": "位置名称",
      "description": "详细描述",
      "coordinates": {"x": 数值, "y": 数值, "z": 数值},
      "utility_type": "道具类型",
      "throw_type": "投掷方式",
      "difficulty": "难度等级"
    }
  ]
}`;
};

const api = {
  searchUtility: async (params: SearchQuery): Promise<SearchResult[]> => {
    try {
      if (!OPENAI_API_KEY) {
        throw new Error('OpenAI API key is not configured');
      }

      console.log('API Key configured:', !!OPENAI_API_KEY);
      console.log('Sending request to OpenAI API...');
      
      const response = await axios.post(
        OPENAI_API_URL,
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "你是一个专业的CS2道具投掷专家，请提供准确的道具投掷建议。"
            },
            {
              role: "user",
              content: generatePrompt(params.map, params.query)
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Received response from OpenAI API');
      const content = response.data.choices[0].message.content;
      console.log('Response content:', content);

      try {
        const parsedContent = JSON.parse(content);
        if (!parsedContent.results || !Array.isArray(parsedContent.results)) {
          throw new Error('Invalid response format from AI');
        }
        return parsedContent.results;
      } catch (parseError: unknown) {
        console.error('Error parsing ChatGPT response:', parseError);
        const errorMessage = parseError instanceof Error ? parseError.message : 'Unknown parsing error';
        throw new Error(`Failed to parse AI response: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error details:', error);
      if (error instanceof AxiosError) {
        if (error.response) {
          // 服务器响应了，但状态码不在 2xx 范围内
          const errorMessage = error.response.data.error?.message || error.message;
          throw new Error(`API Error: ${error.response.status} - ${errorMessage}`);
        } else if (error.request) {
          // 请求已发出，但没有收到响应
          throw new Error('No response received from API. Please check your internet connection.');
        } else {
          // 在设置请求时发生了错误
          throw new Error(`Request Error: ${error.message}`);
        }
      }
      throw error;
    }
  }
};

export default api; 