import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-white text-xl font-bold hover:text-gray-300 transition-colors">
            CS2 工具集
          </Link>
          <div className="flex space-x-4">
            <Link to="/maps" className="text-gray-300 hover:text-white transition-colors">
              地图
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 