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
    zoom: 2,
    bounds: [[-1, -1], [1, 1]],
    mapImage: {
      url: '/images/maps/dust2/overview.png',
      width: 2048,
      height: 2048
    }
  },
  mirage: {
    center: [0, 0],
    zoom: 2,
    bounds: [[-1, -1], [1, 1]],
    mapImage: {
      url: '/images/maps/mirage/overview.png',
      width: 2048,
      height: 2048
    }
  },
  inferno: {
    center: [0, 0],
    zoom: 2,
    bounds: [[-1, -1], [1, 1]],
    mapImage: {
      url: '/images/maps/inferno/overview.png',
      width: 2048,
      height: 2048
    }
  },
  overpass: {
    center: [0, 0],
    zoom: 2,
    bounds: [[-1, -1], [1, 1]],
    mapImage: {
      url: '/images/maps/overpass/overview.png',
      width: 2048,
      height: 2048
    }
  },
  nuke: {
    center: [0, 0],
    zoom: 2,
    bounds: [[-1, -1], [1, 1]],
    mapImage: {
      url: '/images/maps/nuke/overview.png',
      width: 2048,
      height: 2048
    }
  },
  vertigo: {
    center: [0, 0],
    zoom: 2,
    bounds: [[-1, -1], [1, 1]],
    mapImage: {
      url: '/images/maps/vertigo/overview.png',
      width: 2048,
      height: 2048
    }
  },
  ancient: {
    center: [0, 0],
    zoom: 2,
    bounds: [[-1, -1], [1, 1]],
    mapImage: {
      url: '/images/maps/ancient/overview.png',
      width: 2048,
      height: 2048
    }
  },
  anubis: {
    center: [0, 0],
    zoom: 2,
    bounds: [[-1, -1], [1, 1]],
    mapImage: {
      url: '/images/maps/anubis/overview.png',
      width: 2048,
      height: 2048
    }
  }
};

export const mapLocations: Record<string, MapLocation[]> = {
  dust2: [
    {
      id: 'dust2-a-smoke-1',
      name: 'A点烟雾弹 1',
      description: '从A门投掷到A点的烟雾弹，可以完全覆盖A点区域',
      coordinates: [-0.8, 0.8],
      utility_type: '烟雾弹',
      throw_type: '跳投',
      difficulty: 'easy',
      image_url: '/images/maps/dust2/smokes/a-smoke-1.jpg'
    },
    {
      id: 'dust2-a-smoke-2',
      name: 'A点烟雾弹 2',
      description: '从A门投掷到A点的烟雾弹，可以覆盖A点平台',
      coordinates: [-0.6, 0.6],
      utility_type: '烟雾弹',
      throw_type: '站立',
      difficulty: 'medium',
      image_url: '/images/maps/dust2/smokes/a-smoke-2.jpg'
    },
    {
      id: 'dust2-b-smoke-1',
      name: 'B点烟雾弹 1',
      description: '从B洞投掷到B点的烟雾弹，可以完全覆盖B点区域',
      coordinates: [0.8, 0.8],
      utility_type: '烟雾弹',
      throw_type: '跳投',
      difficulty: 'medium',
      image_url: '/images/maps/dust2/smokes/b-smoke-1.jpg'
    },
    {
      id: 'dust2-b-flash-1',
      name: 'B点闪光弹 1',
      description: '从B洞投掷到B点的闪光弹，可以闪白B点区域',
      coordinates: [0.6, 0.6],
      utility_type: '闪光弹',
      throw_type: '站立',
      difficulty: 'easy',
      image_url: '/images/maps/dust2/flashes/b-flash-1.jpg'
    }
  ],
  mirage: [
    {
      id: 'mirage-a-smoke-1',
      name: 'A点烟雾弹 1',
      description: '从A1投掷到A点的烟雾弹，可以完全覆盖A点区域',
      coordinates: [-0.8, 0.8],
      utility_type: '烟雾弹',
      throw_type: '跳投',
      difficulty: 'easy',
      image_url: '/images/maps/mirage/smokes/a-smoke-1.jpg'
    },
    {
      id: 'mirage-a-smoke-2',
      name: 'A点烟雾弹 2',
      description: '从A2投掷到A点的烟雾弹，可以覆盖A点平台',
      coordinates: [-0.6, 0.6],
      utility_type: '烟雾弹',
      throw_type: '站立',
      difficulty: 'medium',
      image_url: '/images/maps/mirage/smokes/a-smoke-2.jpg'
    },
    {
      id: 'mirage-b-smoke-1',
      name: 'B点烟雾弹 1',
      description: '从B洞投掷到B点的烟雾弹，可以完全覆盖B点区域',
      coordinates: [0.8, 0.8],
      utility_type: '烟雾弹',
      throw_type: '跳投',
      difficulty: 'medium',
      image_url: '/images/maps/mirage/smokes/b-smoke-1.jpg'
    },
    {
      id: 'mirage-b-flash-1',
      name: 'B点闪光弹 1',
      description: '从B洞投掷到B点的闪光弹，可以闪白B点区域',
      coordinates: [0.6, 0.6],
      utility_type: '闪光弹',
      throw_type: '站立',
      difficulty: 'easy',
      image_url: '/images/maps/mirage/flashes/b-flash-1.jpg'
    }
  ]
}; 