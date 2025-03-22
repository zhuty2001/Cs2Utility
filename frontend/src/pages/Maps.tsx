import React from 'react';

const Maps = () => {
  const maps = [
    { 
      name: 'Dust2', 
      description: '经典沙漠地图，以其开阔的视野和标志性的长A大道闻名。',
      image: '/images/maps/dust2/Dust-2-callouts-1.jpg'
    },
    { 
      name: 'Mirage', 
      description: '中东风格地图，以复杂的巷道系统和中央宫殿为特色。',
      image: '/images/maps/mirage/csgo-mirage-map-callouts-counter-strike.jpg'
    },
    { 
      name: 'Inferno', 
      description: '意大利小镇地图，以狭窄的巷道和香蕉道闻名。',
      image: '/images/maps/inferno/csgo-Inferno-map-callouts-and-positions.jpg'
    },
    { 
      name: 'Nuke', 
      description: '核电站地图，以垂直战斗和复杂的室内外转换著称。',
      image: '/images/maps/nuke/Nuke-callouts-A-site.jpg'
    },
    { 
      name: 'Anubis', 
      description: '埃及主题地图，以金字塔和古埃及建筑为特色。',
      image: '/images/maps/anubis/CSGO-Anubis-Callouts.jpg'
    },
    { 
      name: 'Ancient', 
      description: '玛雅文明地图，以丛林环境和古代遗迹为特色。',
      image: '/images/maps/ancient/Ancient-callouts.jpg'
    },
    {
      name: 'Overpass',
      description: '德国城市地图，以复杂的地下通道和桥梁系统为特色。',
      image: '/images/maps/overpass/Overpass-Callouts.jpg'
    },
    {
      name: 'Vertigo',
      description: '摩天大楼地图，以垂直战斗和复杂的室内外转换著称。',
      image: '/images/maps/vertigo/Vertigo-callouts-lower.jpg'
    },
    {
      name: 'Train',
      description: '火车站地图，以复杂的铁路系统和室内外转换著称。',
      image: '/images/maps/train/CS2-Train-Map-callouts-and-positions.jpg'
    }
  ];

  return (
    <div>
      <h1>CS2 地图</h1>
      <div className="maps-grid">
        {maps.map((map) => (
          <div key={map.name} className="map-card">
            <img src={map.image} alt={map.name} />
            <h2>{map.name}</h2>
            <p>{map.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Maps; 