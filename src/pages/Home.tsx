import { Link } from 'react-router-dom';
import './Home.css';

const maps = [
  {
    id: 'dust2',
    name: 'Dust2',
    description: '经典地图，适合各种战术和道具投掷',
    image: '/maps/dust2.jpg'
  },
  {
    id: 'mirage',
    name: 'Mirage',
    description: '现代竞技地图，需要精确的道具配合',
    image: '/maps/mirage.jpg'
  },
  {
    id: 'inferno',
    name: 'Inferno',
    description: '意大利风格地图，适合近距离战斗',
    image: '/maps/inferno.jpg'
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