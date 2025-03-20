import { Link } from 'react-router-dom';
import './Home.css';

const maps = [
  {
    id: 'dust2',
    name: 'Dust2',
    description: '经典地图，适合各种战术和道具投掷',
    image: '/maps_processed/dust2/overview.png'
  },
  {
    id: 'mirage',
    name: 'Mirage',
    description: '现代竞技地图，需要精确的道具配合',
    image: '/maps_processed/mirage/overview.png'
  },
  {
    id: 'inferno',
    name: 'Inferno',
    description: '意大利风格地图，适合近距离战斗',
    image: '/maps_processed/inferno/overview.png'
  },
  {
    id: 'nuke',
    name: 'Nuke',
    description: '垂直空间利用的地图，需要特殊投掷技巧',
    image: '/maps_processed/nuke/overview.png'
  },
  {
    id: 'anubis',
    name: 'Anubis',
    description: '埃及主题地图，需要创新的战术配合',
    image: '/maps_processed/anubis/overview.png'
  },
  {
    id: 'ancient',
    name: 'Ancient',
    description: '丛林主题地图，需要灵活的道具运用',
    image: '/maps_processed/ancient/overview.png'
  }
];

const Home = () => {
  return (
    <div className="home">
      <h1>CS2 道具查询助手</h1>
      <p className="description">
        帮助你学习和练习 CS2 中的道具投掷技巧
      </p>
      <div className="map-grid">
        {maps.map(map => (
          <Link to={`/map/${map.id}`} key={map.id} className="map-card">
            <img src={map.image} alt={map.name} />
            <div className="map-card-content">
              <h2>{map.name}</h2>
              <p>{map.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home; 