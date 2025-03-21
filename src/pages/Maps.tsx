import { Link } from 'react-router-dom';

const maps = [
  {
    name: 'dust2',
    description: '经典沙漠地图，以开阔的视野和多样的战术选择著称。',
    image: '/Cs2Utility/images/maps/dust2/Dust-2-callouts-1.jpg'
  },
  {
    name: 'mirage',
    description: '中东风格的城市地图，以复杂的室内外转换和多样的战术选择著称。',
    image: '/Cs2Utility/images/maps/mirage/csgo-mirage-map-callouts-counter-strike.jpg'
  },
  {
    name: 'inferno',
    description: '意大利小镇风格的地图，以狭窄的街道和复杂的室内战斗著称。',
    image: '/Cs2Utility/images/maps/inferno/csgo-Inferno-map-callouts-and-positions.jpg'
  },
  {
    name: 'nuke',
    description: '核电站地图，以垂直战斗和复杂的室内外转换著称。',
    image: '/Cs2Utility/images/maps/nuke/Nuke-callouts-A-site.jpg'
  },
  {
    name: 'anubis',
    description: '埃及风格的地图，以开阔的视野和多样的战术选择著称。',
    image: '/Cs2Utility/images/maps/anubis/CSGO-Anubis-Callouts.jpg'
  },
  {
    name: 'ancient',
    description: '玛雅文明风格的地图，以复杂的室内外转换和多样的战术选择著称。',
    image: '/Cs2Utility/images/maps/ancient/Ancient-callouts.jpg'
  },
  {
    name: 'overpass',
    description: '德国城市地图，以复杂的地下通道和桥梁系统著称。',
    image: '/Cs2Utility/images/maps/overpass/Overpass-Callouts.jpg'
  },
  {
    name: 'vertigo',
    description: '摩天大楼地图，以垂直战斗和复杂的室内外转换著称。',
    image: '/Cs2Utility/images/maps/vertigo/Vertigo-callouts-lower.jpg'
  },
  {
    name: 'train',
    description: '火车站地图，以复杂的铁路系统和室内外转换著称。',
    image: '/Cs2Utility/images/maps/train/CS2-Train-Map-callouts-and-positions.jpg'
  }
];

const Maps = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">地图列表</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {maps.map((map) => (
            <Link
              key={map.name}
              to={`/maps/${map.name}`}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:bg-gray-700 transition-colors"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={map.image}
                  alt={map.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-2 capitalize">{map.name}</h2>
                <p className="text-gray-300">{map.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Maps; 