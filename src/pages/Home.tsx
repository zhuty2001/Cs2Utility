import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">CS2 工具集</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/maps" className="block">
            <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-colors">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">地图工具</h2>
                <p className="text-gray-300">查看所有地图的投掷物位置和战术信息</p>
              </div>
            </div>
          </Link>
          {/* 其他功能卡片 */}
        </div>
      </div>
    </div>
  );
};

export default Home; 