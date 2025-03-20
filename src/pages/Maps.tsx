import { Link } from 'react-router-dom';

const Maps = () => {
  const maps = [
    { name: 'Dust2', description: '经典沙漠地图' },
    { name: 'Mirage', description: '中东风格地图' },
    { name: 'Inferno', description: '意大利小镇地图' },
    { name: 'Nuke', description: '核电站地图' },
    { name: 'Anubis', description: '埃及主题地图' },
    { name: 'Ancient', description: '玛雅文明地图' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">地图视图</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {maps.map((map) => (
          <Link
            key={map.name}
            to={`/map/${map.name.toLowerCase()}`}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{map.name}</h2>
            <p className="text-gray-600">{map.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Maps; 