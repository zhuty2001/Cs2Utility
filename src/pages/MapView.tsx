import { useParams } from 'react-router-dom';
import { useState } from 'react';
import './MapView.css';

interface ThrowableLabel {
  type: 'smoke' | 'flash' | 'molotov' | 'decoy';
  position: { x: number; y: number };
  description: string;
}

interface MapData {
  views: string[];
  throwables: { [key: string]: ThrowableLabel[] };
}

// 地图数据映射
const mapData: { [key: string]: MapData } = {
  'dust2': {
    views: ['Dust-2-callouts-1.jpg'],
    throwables: {
      'Dust-2-callouts-1.jpg': [
        { type: 'smoke', position: { x: 30, y: 40 }, description: 'A点烟雾弹' },
        { type: 'flash', position: { x: 60, y: 70 }, description: 'B点闪光弹' },
        { type: 'molotov', position: { x: 45, y: 55 }, description: '中路燃烧弹' },
        { type: 'decoy', position: { x: 75, y: 85 }, description: '小道诱饵弹' }
      ]
    }
  },
  'mirage': {
    views: ['csgo-mirage-map-callouts-counter-strike.jpg'],
    throwables: {
      'csgo-mirage-map-callouts-counter-strike.jpg': [
        { type: 'smoke', position: { x: 25, y: 35 }, description: 'A点烟雾弹' },
        { type: 'flash', position: { x: 55, y: 65 }, description: 'B点闪光弹' },
        { type: 'molotov', position: { x: 40, y: 50 }, description: '中路燃烧弹' },
        { type: 'decoy', position: { x: 70, y: 80 }, description: '拱门诱饵弹' }
      ]
    }
  },
  // ... 其他地图数据
};

const ThrowableLabel = ({ label }: { label: ThrowableLabel }) => {
  const getIcon = () => {
    switch (label.type) {
      case 'smoke':
        return '💨';
      case 'flash':
        return '⚡';
      case 'molotov':
        return '🔥';
      case 'decoy':
        return '🎯';
      default:
        return '❓';
    }
  };

  return (
    <div 
      className="absolute bg-gray-800 text-white px-2 py-1 rounded-lg text-sm cursor-pointer hover:bg-gray-700 transition-colors"
      style={{
        left: `${label.position.x}%`,
        top: `${label.position.y}%`,
        transform: 'translate(-50%, -50%)'
      }}
      title={label.description}
    >
      {getIcon()}
    </div>
  );
};

const MapView = () => {
  const { mapName } = useParams();
  const [currentViewIndex, setCurrentViewIndex] = useState(0);

  const currentMapData = mapData[mapName || ''] || {
    views: [],
    throwables: {}
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 capitalize text-center">{mapName} 地图</h1>
        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
          {currentMapData.views.length > 1 && (
            <div className="p-4 border-b border-gray-700">
              <div className="flex gap-2 justify-center">
                {currentMapData.views.map((view, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentViewIndex(index)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentViewIndex === index
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {view.replace(/_/g, ' ').replace(/\.jpg$/, '')}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="p-6 bg-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentMapData.views.map((view, index) => (
                <div key={index} className="bg-gray-900 rounded-lg overflow-hidden relative">
                  <img
                    src={`/Cs2Utility/images/maps/${mapName}/${view}`}
                    alt={`${mapName} 地图 ${index + 1}`}
                    className="w-full h-auto object-contain"
                  />
                  {currentMapData.throwables[view]?.map((label, labelIndex) => (
                    <ThrowableLabel key={labelIndex} label={label} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView; 