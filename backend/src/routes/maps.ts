import express from 'express';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// 获取所有地图列表
router.get('/', async (req, res) => {
  try {
    const mapsDir = path.join(__dirname, '../../frontend/public/images/maps');
    const maps = fs.readdirSync(mapsDir)
      .filter(file => fs.statSync(path.join(mapsDir, file)).isDirectory());
    
    res.json(maps);
  } catch (error) {
    console.error('Error fetching maps:', error);
    res.status(500).json({ error: 'Failed to fetch maps' });
  }
});

// 获取特定地图的雷达图文件列表
router.get('/:mapName/radars', async (req, res) => {
  try {
    const { mapName } = req.params;
    const mapDir = path.join(__dirname, `../../frontend/public/images/maps/${mapName}`);
    
    // 检查目录是否存在
    if (!fs.existsSync(mapDir)) {
      return res.status(404).json({ error: 'Map not found' });
    }

    // 获取所有 PNG 文件
    const allFiles = fs.readdirSync(mapDir)
      .filter(file => file.toLowerCase().endsWith('.png'));

    // 优先使用带有 radar 的图片
    const radarFiles = allFiles.filter(file => 
      file.toLowerCase().includes('radar') || 
      file.toLowerCase().includes('cs2') || 
      file.toLowerCase().includes('de_')
    );

    // 如果没有找到雷达图，则使用 overview.png
    if (radarFiles.length === 0) {
      const overviewFile = allFiles.find(file => 
        file.toLowerCase() === 'overview.png'
      );
      if (overviewFile) {
        return res.json([overviewFile]);
      }
    }

    // 如果找到了雷达图，按字母顺序排序并返回
    console.log(`Found radar files for ${mapName}:`, radarFiles);
    res.json(radarFiles.sort());
  } catch (error) {
    console.error('Error fetching radar files:', error);
    res.status(500).json({ error: 'Failed to fetch radar files' });
  }
});

export default router; 