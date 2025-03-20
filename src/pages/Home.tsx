import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

const maps = [
  {
    id: 'dust2',
    name: 'Dust2',
    description: '经典地图，适合各种战术和道具投掷',
    image: '/maps_processed/dust2/overview.png'
  },
  {
    id: 'mirage',
    name: 'Mirage',
    description: '现代竞技地图，需要精确的道具配合',
    image: '/maps_processed/mirage/overview.png'
  },
  {
    id: 'inferno',
    name: 'Inferno',
    description: '意大利风格地图，适合近距离战斗',
    image: '/maps_processed/inferno/overview.png'
  },
  {
    id: 'nuke',
    name: 'Nuke',
    description: '垂直空间利用的地图，需要特殊投掷技巧',
    image: '/maps_processed/nuke/overview.png'
  },
  {
    id: 'anubis',
    name: 'Anubis',
    description: '埃及主题地图，需要创新的战术配合',
    image: '/maps_processed/anubis/overview.png'
  },
  {
    id: 'ancient',
    name: 'Ancient',
    description: '丛林主题地图，需要灵活的道具运用',
    image: '/maps_processed/ancient/overview.png'
  }
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">CS2 道具查询助手</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* 大模型查询入口 */}
          <div 
            className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow duration-300"
            onClick={() => navigate('/query')}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">AI 道具查询</h2>
              <p className="text-gray-600">使用大语言模型智能分析您的道具投掷需求</p>
            </div>
          </div>

          {/* 地图视图入口 */}
          <div 
            className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow duration-300"
            onClick={() => navigate('/maps')}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">地图视图</h2>
              <p className="text-gray-600">查看各地图的详细投掷点位和路线</p>
            </div>
          </div>
        </div>

        {/* 使用说明 */}
        <div className="mt-12 max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">使用说明</h2>
          <div className="space-y-4 text-gray-600">
            <p>1. <span className="font-medium">AI 道具查询</span>：输入您想要查询的道具投掷需求，AI 将为您提供详细的投掷方案。</p>
            <p>2. <span className="font-medium">地图视图</span>：浏览各地图的详细投掷点位，包括烟雾弹、闪光弹等道具的投掷位置。</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 