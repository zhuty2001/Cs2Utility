import { useParams } from 'react-router-dom';
import './MapView.css';

const MapView = () => {
  const { mapName } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{mapName?.toUpperCase()} 地图详情</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600">地图详情页面正在开发中...</p>
      </div>
    </div>
  );
};

export default MapView; 