import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">CS2 工具集</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/maps" className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors">
            <h2 className="text-2xl font-bold mb-4">地图查看</h2>
            <p className="text-gray-300">查看所有地图的详细信息和投掷物点位</p>
          </Link>
          {/* 可以添加更多功能卡片 */}
        </div>
      </div>
    </div>
  );
};

export default Home; 