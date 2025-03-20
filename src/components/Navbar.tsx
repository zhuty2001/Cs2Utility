import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-gray-800">
            CS2 道具查询助手
          </Link>
          <div className="flex space-x-4">
            <Link
              to="/query"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/query'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              AI 查询
            </Link>
            <Link
              to="/maps"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/maps'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              地图视图
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 