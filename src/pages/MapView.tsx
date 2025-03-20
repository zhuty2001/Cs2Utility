import { useParams } from 'react-router-dom';
import './MapView.css';

const MapView = () => {
  const { mapName } = useParams();

  return (
    <div className="map-view">
      <h1>{mapName?.toUpperCase()} 道具投掷指南</h1>
      <div className="map-content">
        <div className="map-image">
          <img src={`/maps/${mapName}.jpg`} alt={mapName} />
        </div>
        <div className="map-info">
          <h2>常用投掷点位</h2>
          <div className="throw-spots">
            {/* 这里后续会添加具体的投掷点位信息 */}
            <p>正在开发中...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView; 