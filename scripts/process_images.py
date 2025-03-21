from PIL import Image
import os
import requests
from bs4 import BeautifulSoup
import time
import re

def download_image(url, save_path):
    """下载图片并保存"""
    try:
        response = requests.get(url)
        if response.status_code == 200:
            with open(save_path, 'wb') as f:
                f.write(response.content)
            print(f'成功下载图片: {save_path}')
            return True
        else:
            print(f'下载失败，状态码: {response.status_code}')
            return False
    except Exception as e:
        print(f'下载出错: {str(e)}')
        return False

def get_map_radar_url(map_url):
    """获取地图详情页面中的雷达图URL"""
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    try:
        response = requests.get(map_url, headers=headers)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            # 查找包含雷达图的图片元素
            radar_images = soup.find_all('img', src=lambda x: x and ('radar' in x.lower() or 'overview' in x.lower()))
            
            for img in radar_images:
                img_url = img.get('src', '')
                if img_url:
                    if not img_url.startswith('http'):
                        img_url = 'https:' + img_url
                    return img_url
        return None
    except Exception as e:
        print(f'获取雷达图URL出错: {str(e)}')
        return None

def download_maps_from_blitz():
    """从 blitz.gg 下载地图雷达图"""
    # 定义所有地图及其对应的URL
    maps = {
        'dust2': 'de_dust2',
        'mirage': 'de_mirage',
        'inferno': 'de_inferno',
        'nuke': 'de_nuke',
        'vertigo': 'de_vertigo',
        'overpass': 'de_overpass',
        'anubis': 'de_anubis',
        'ancient': 'de_ancient'
    }
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    # 创建保存目录
    save_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'public', 'images', 'maps')
    os.makedirs(save_dir, exist_ok=True)
    
    for map_name, map_code in maps.items():
        # 构建地图详情页面的URL
        map_url = f'https://blitz.gg/cs2/database/maps/{map_code}/overview'
        
        # 获取雷达图URL
        radar_url = get_map_radar_url(map_url)
        if not radar_url:
            print(f'未找到地图 {map_name} 的雷达图')
            continue
        
        # 创建地图目录
        map_dir = os.path.join(save_dir, map_name)
        os.makedirs(map_dir, exist_ok=True)
        
        # 下载雷达图
        save_path = os.path.join(map_dir, f'Cs2_{map_name}_radar.png')
        if download_image(radar_url, save_path):
            time.sleep(1)  # 添加延迟，避免请求过快

def main():
    print('开始从 blitz.gg 下载地图雷达图...')
    download_maps_from_blitz()

if __name__ == '__main__':
    main() 