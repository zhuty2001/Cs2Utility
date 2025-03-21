import { Link } from 'react-router-dom';

const Maps = () => {
  const maps = [
    { 
      name: 'Dust2', 
      description: '经典沙漠地图，以其开阔的视野和标志性的长A大道闻名。',
      image: '/images/maps_processed/dust2/Cs2_dust2_overview.png'
    },
    { 
      name: 'Mirage', 
      description: '中东风格地图，以复杂的巷道系统和中央宫殿为特色。',
      image: '/images/maps_processed/mirage/Cs2_mirage_radar.png'
    },
    { 
      name: 'Inferno', 
      description: '意大利小镇地图，以狭窄的巷道和香蕉道闻名。',
      image: '/images/maps_processed/inferno/CS2_inferno_radar.png'
    },
    { 
      name: 'Nuke', 
      description: '核电站地图，以垂直战斗和复杂的室内外转换著称。',
      image: '/images/maps_processed/nuke/Cs2_nuke_radar.png'
    },
    { 
      name: 'Anubis', 
      description: '埃及主题地图，以金字塔和古埃及建筑为特色。',
      image: '/images/maps_processed/anubis/De_anubis_radar.png'
    },
    { 
      name: 'Ancient', 
      description: '玛雅文明地图，以丛林环境和古代遗迹为特色。',
      image: '/images/maps_processed/ancient/Ancient_Radar.png'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">地图视图</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {maps.map((map) => (
          <Link
            key={map.name}
            to={`/map/${map.name.toLowerCase()}`}
            className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={map.image} 
                alt={`${map.name} 地图预览`}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{map.name}</h2>
              <p className="text-gray-600 leading-relaxed">{map.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Maps; 