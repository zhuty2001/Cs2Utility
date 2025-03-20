import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          CS2 道具查询
        </Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">首页</Link>
          <Link to="/map/dust2" className="navbar-link">Dust2</Link>
          <Link to="/map/mirage" className="navbar-link">Mirage</Link>
          <Link to="/map/inferno" className="navbar-link">Inferno</Link>
          <Link to="/map/nuke" className="navbar-link">Nuke</Link>
          <Link to="/map/anubis" className="navbar-link">Anubis</Link>
          <Link to="/map/ancient" className="navbar-link">Ancient</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 