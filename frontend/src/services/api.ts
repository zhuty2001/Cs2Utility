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

请严格按照以下JSON格式返回3个推荐点位，确保所有属性名都使用双引号，所有字符串值也使用双引号：

{
  "results": [
    {
      "id": "spot_1",
      "map": "${map}",
      "location": "位置名称",
      "description": "详细描述",
      "coordinates": {
        "x": 0,
        "y": 0,
        "z": 0
      },
      "utility_type": "烟雾弹",
      "throw_type": "跳投",
      "difficulty": "easy"
    }
  ]
}

注意：
1. 所有属性名必须使用双引号
2. 所有字符串值必须使用双引号
3. 坐标值使用数字，不要使用字符串
4. difficulty 只能是 "easy"、"medium" 或 "hard" 之一
5. utility_type 可以是 "烟雾弹"、"闪光弹" 或 "燃烧弹"
6. throw_type 可以是 "跳投"、"站立" 或 "跑动"`;
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
              content: "你是一个专业的CS2道具投掷专家。请严格按照指定的JSON格式返回结果，确保所有属性名和字符串值都使用双引号。"
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