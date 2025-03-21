import { useState } from 'react';
import './AIQuery.css';

const AIQuery = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    text: string;
    image?: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      // TODO: 这里需要连接后端 API
      // 临时模拟响应
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResult({
        text: '这是一个示例回答。实际项目中，这里会显示 AI 生成的回答和相关的投掷物示意图。',
        image: './images/items/smoke.png'
      });
    } catch (error) {
      console.error('Error:', error);
      setResult({
        text: '抱歉，查询过程中出现错误，请稍后重试。'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">AI 投掷物查询</h1>
        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="query" className="block text-sm font-medium text-gray-300 mb-2">
                  请输入你的问题
                </label>
                <textarea
                  id="query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                  rows={4}
                  placeholder="例如：如何在 Mirage 的 A 点扔烟雾弹？"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  loading || !query.trim()
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {loading ? '查询中...' : '查询'}
              </button>
            </form>

            {result && (
              <div className="mt-8 bg-gray-700 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">查询结果</h2>
                <div className="space-y-4">
                  <p className="text-gray-300">{result.text}</p>
                  {result.image && (
                    <div className="mt-4">
                      <img
                        src={result.image}
                        alt="投掷物示意图"
                        className="max-w-full h-auto rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIQuery; 