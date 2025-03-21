import { useParams } from 'react-router-dom';
import { useState } from 'react';
import './MapView.css';

const MapView = () => {
  const { mapName } = useParams();
  const [currentViewIndex, setCurrentViewIndex] = useState(0);

  // 地图雷达图文件映射
  const mapRadarFiles: { [key: string]: string[] } = {
    'dust2': ['Dust-2-callouts-1.jpg'],
    'mirage': ['csgo-mirage-map-callouts-counter-strike.jpg'],
    'inferno': ['csgo-Inferno-map-callouts-and-positions.jpg'],
    'nuke': ['Nuke-callouts-A-site.jpg', 'Nuke-callouts-B-bombsite.jpg'],
    'anubis': ['CSGO-Anubis-Callouts.jpg'],
    'ancient': ['Ancient-callouts.jpg'],
    'overpass': ['Overpass-Callouts.jpg'],
    'vertigo': ['Vertigo-callouts-lower.jpg', 'Vertigo-callouts-upper.jpg'],
    'train': ['CS2-Train-Map-callouts-and-positions.jpg']
  };

  const currentMapViews = mapRadarFiles[mapName || ''] || [];
  const hasMultipleViews = currentMapViews.length > 1;

  // 获取图片路径的辅助函数
  const getImagePath = (view: string) => {
    return `./images/maps/${mapName}/${view}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 capitalize text-center">{mapName} 地图</h1>
        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
          {hasMultipleViews && (
            <div className="p-4 border-b border-gray-700">
              <div className="flex gap-2 justify-center">
                {currentMapViews.map((view, index) => (
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
            {hasMultipleViews ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentMapViews.map((view, index) => (
                  <div key={index} className="bg-gray-900 rounded-lg overflow-hidden">
                    <img
                      src={getImagePath(view)}
                      alt={`${mapName} 地图 ${index + 1}`}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <img
                    src={getImagePath(currentMapViews[0])}
                    alt={`${mapName} 地图`}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            )}
            <div className="mt-6 bg-gray-900 rounded-lg p-4">
              <div className="text-lg font-bold text-center mb-4">投掷物类型</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2 bg-gray-800 p-2 rounded-lg">
                  <img src="./images/items/smoke.png" alt="烟雾弹" className="w-16 h-16" />
                  <span>烟雾弹</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-800 p-2 rounded-lg">
                  <img src="./images/items/flash.png" alt="闪光弹" className="w-16 h-16" />
                  <span>闪光弹</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-800 p-2 rounded-lg">
                  <img src="./images/items/molotov.png" alt="燃烧弹" className="w-16 h-16" />
                  <span>燃烧弹</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-800 p-2 rounded-lg">
                  <img src="./images/items/grenade.png" alt="手雷" className="w-16 h-16" />
                  <span>手雷</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView; 