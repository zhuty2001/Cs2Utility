export interface MapLocation {
  id: string;
  name: string;
  description: string;
  coordinates: [number, number];
  utility_type: string;
  throw_type: string;
  difficulty: 'easy' | 'medium' | 'hard';
  image_url?: string;
}

export interface MapConfig {
  center: [number, number];
  zoom: number;
  bounds: [[number, number], [number, number]];
  mapImage: {
    url: string;
    width: number;
    height: number;
  };
}

export const mapConfigs: Record<string, MapConfig> = {
  dust2: {
    center: [0, 0],
    zoom: 0,
    bounds: [[0, 0], [1024, 1024]],
    mapImage: {
      url: '/Cs2Utility/images/maps/dust2/Dust-2-callouts-1.jpg',
      width: 1024,
      height: 1024
    }
  },
  mirage: {
    center: [0, 0],
    zoom: 2,
    bounds: [[-1, -1], [1, 1]],
    mapImage: {
      url: '/Cs2Utility/images/maps/mirage/csgo-mirage-map-callouts-counter-strike.jpg',
      width: 1024,
      height: 1024
    }
  },
  inferno: {
    center: [0, 0],
    zoom: 2,
    bounds: [[-1, -1], [1, 1]],
    mapImage: {
      url: '/Cs2Utility/images/maps/inferno/csgo-Inferno-map-callouts-and-positions.jpg',
      width: 2048,
      height: 2048
    }
  },
  overpass: {
    center: [0, 0],
    zoom: 2,
    bounds: [[-1, -1], [1, 1]],
    mapImage: {
      url: '/Cs2Utility/images/maps/overpass/Overpass-Callouts.jpg',
      width: 2048,
      height: 2048
    }
  },
  nuke: {
    center: [0, 0],
    zoom: 2,
    bounds: [[-1, -1], [1, 1]],
    mapImage: {
      url: '/Cs2Utility/images/maps/nuke/Nuke-callouts-A-site.jpg',
      width: 2048,
      height: 2048
    }
  },
  vertigo: {
    center: [0, 0],
    zoom: 2,
    bounds: [[-1, -1], [1, 1]],
    mapImage: {
      url: '/Cs2Utility/images/maps/vertigo/Vertigo-callouts-lower.jpg',
      width: 2048,
      height: 2048
    }
  },
  ancient: {
    center: [0, 0],
    zoom: 2,
    bounds: [[-1, -1], [1, 1]],
    mapImage: {
      url: '/Cs2Utility/images/maps/ancient/Ancient-callouts.jpg',
      width: 2048,
      height: 2048
    }
  },
  anubis: {
    center: [0, 0],
    zoom: 2,
    bounds: [[-1, -1], [1, 1]],
    mapImage: {
      url: '/Cs2Utility/images/maps/anubis/CSGO-Anubis-Callouts.jpg',
      width: 2048,
      height: 2048
    }
  },
  train: {
    center: [0, 0],
    zoom: 2,
    bounds: [[-1, -1], [1, 1]],
    mapImage: {
      url: '/Cs2Utility/images/maps/train/CS2-Train-Map-callouts-and-positions.jpg',
      width: 2048,
      height: 2048
    }
  }
};

export const mapLocations: Record<string, MapLocation[]> = {
  dust2: [
    {
      id: 'dust2-a-cross-smoke',
      name: 'A 点十字烟',
      description: '从A大坡投掷到A点的烟雾弹，可以完全覆盖A点十字。\n\n投掷方法：\n1. 站在A大坡靠近蓝箱位置\n2. 瞄准A点十字架上方\n3. 使用跳投（按住W+空格，同时投掷）',
      coordinates: [800, 200],
      utility_type: '烟雾弹',
      throw_type: '跳投',
      difficulty: 'easy',
      image_url: '/images/maps/dust2/smokes/a-cross-smoke.jpg'
    },
    {
      id: 'dust2-a-ct-smoke',
      name: 'A 点警家烟',
      description: '从A大坡投掷到A点警家的烟雾弹。\n\n投掷方法：\n1. 站在A大坡靠近蓝箱位置\n2. 瞄准警家上方\n3. 使用站立投掷',
      coordinates: [850, 150],
      utility_type: '烟雾弹',
      throw_type: '站立',
      difficulty: 'medium',
      image_url: '/images/maps/dust2/smokes/a-ct-smoke.jpg'
    },
    {
      id: 'dust2-b-box-smoke',
      name: 'B 点箱子烟',
      description: '从B通道投掷到B点的烟雾弹，可以完全覆盖B点箱子位置。\n\n投掷方法：\n1. 站在B通道入口\n2. 瞄准B点箱子上方\n3. 使用跳投',
      coordinates: [200, 200],
      utility_type: '烟雾弹',
      throw_type: '跳投',
      difficulty: 'medium',
      image_url: '/images/maps/dust2/smokes/b-box-smoke.jpg'
    },
    {
      id: 'dust2-mid-door-smoke',
      name: '中门烟',
      description: '从T门口投掷到中门的烟雾弹。\n\n投掷方法：\n1. 站在T门口右侧\n2. 瞄准中门上方\n3. 使用站立投掷',
      coordinates: [512, 512],
      utility_type: '烟雾弹',
      throw_type: '站立',
      difficulty: 'easy',
      image_url: '/images/maps/dust2/smokes/mid-door-smoke.jpg'
    },
    {
      id: 'dust2-b-entry-flash',
      name: 'B 点进点闪',
      description: '从B通道投掷到B点的闪光弹，可以闪白整个B点。\n\n投掷方法：\n1. 站在B通道入口\n2. 瞄准B点天空\n3. 使用站立投掷',
      coordinates: [150, 250],
      utility_type: '闪光弹',
      throw_type: '站立',
      difficulty: 'easy',
      image_url: '/images/maps/dust2/flashes/b-entry-flash.jpg'
    }
  ],
  mirage: [
    {
      id: 'mirage-a-smoke-1',
      name: 'A点烟雾弹 1',
      description: '从A1投掷到A点的烟雾弹，可以完全覆盖A点区域。\n\n投掷方法：\n1. 站在A1入口\n2. 瞄准A点箱子右上角\n3. 使用跳投',
      coordinates: [-0.7, 0.7],
      utility_type: '烟雾弹',
      throw_type: '跳投',
      difficulty: 'easy',
      image_url: '/images/maps/mirage/smokes/a-smoke-1.jpg'
    },
    {
      id: 'mirage-a-smoke-2',
      name: 'A点烟雾弹 2',
      description: '从A2投掷到A点的烟雾弹，可以覆盖A点平台。\n\n投掷方法：\n1. 站在A2入口\n2. 瞄准A点平台左上角\n3. 使用站立投掷',
      coordinates: [-0.5, 0.5],
      utility_type: '烟雾弹',
      throw_type: '站立',
      difficulty: 'medium',
      image_url: '/images/maps/mirage/smokes/a-smoke-2.jpg'
    },
    {
      id: 'mirage-b-smoke-1',
      name: 'B点烟雾弹 1',
      description: '从B洞投掷到B点的烟雾弹，可以完全覆盖B点区域。\n\n投掷方法：\n1. 站在B洞入口\n2. 瞄准B点箱子右上角\n3. 使用跳投',
      coordinates: [0.7, 0.7],
      utility_type: '烟雾弹',
      throw_type: '跳投',
      difficulty: 'medium',
      image_url: '/images/maps/mirage/smokes/b-smoke-1.jpg'
    },
    {
      id: 'mirage-b-flash-1',
      name: 'B点闪光弹 1',
      description: '从B洞投掷到B点的闪光弹，可以闪白B点区域。\n\n投掷方法：\n1. 站在B洞入口\n2. 瞄准B点箱子左上角\n3. 使用站立投掷',
      coordinates: [0.5, 0.5],
      utility_type: '闪光弹',
      throw_type: '站立',
      difficulty: 'easy',
      image_url: '/images/maps/mirage/flashes/b-flash-1.jpg'
    }
  ]
}; 