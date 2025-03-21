import { useParams } from 'react-router-dom';
import { useState } from 'react';
import './MapView.css';

const MapView = () => {
  const { mapName } = useParams();
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // 文件名映射
  const imageFileMap: { [key: string]: string } = {
    'dust2': 'Cs2_dust2_overview.png',
    'mirage': 'Cs2_mirage_radar.png',
    'inferno': 'CS2_inferno_radar.png',
    'nuke': 'Cs2_nuke_radar.png',
    'anubis': 'De_anubis_radar.png',
    'ancient': 'Ancient_Radar.png'
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.01;
    const newScale = Math.min(Math.max(scale + delta, 0.5), 3);
    setScale(newScale);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX - startX,
        y: e.clientY - startY
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">{mapName} 地图</h1>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div 
          className="relative w-full h-[600px] overflow-hidden"
          onWheel={handleWheel}
        >
          <div
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            style={{
              transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
              transition: 'transform 0.1s ease-out'
            }}
            onMouseDown={handleMouseDown}
          >
            <img
              src={`/images/maps_processed/${mapName}/${imageFileMap[mapName || '']}`}
              alt={`${mapName} 地图`}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-600">
              提示：使用鼠标滚轮缩放，按住鼠标左键拖动地图
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setScale(1)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                重置缩放
              </button>
              <button
                onClick={() => setPosition({ x: 0, y: 0 })}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                重置位置
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView; 