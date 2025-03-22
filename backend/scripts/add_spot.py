import os
import json
import shutil
import argparse
from datetime import datetime
import random

def create_spot_directory(base_dir, map_name, spot_id):
    """创建点位目录"""
    # 去掉地图名称的de_前缀
    map_name = map_name.replace('de_', '')
    spot_dir = os.path.join(base_dir, map_name, str(spot_id))
    os.makedirs(spot_dir, exist_ok=True)
    return spot_dir

def copy_images(spot_dir, image_paths):
    """复制所有图片到点位目录"""
    copied_paths = []
    for i, image_path in enumerate(image_paths):
        if not os.path.exists(image_path):
            raise FileNotFoundError(f"图片文件不存在: {image_path}")
        
        # 获取文件扩展名
        _, ext = os.path.splitext(image_path)
        # 生成新的文件名（如：position.jpg, crosshair.jpg, result.jpg等）
        new_filename = f"image_{i+1}{ext}"
        new_path = os.path.join(spot_dir, new_filename)
        
        # 复制文件
        shutil.copy2(image_path, new_path)
        copied_paths.append(new_path)
    
    return copied_paths

def update_spots_json(data_dir, map_name, spot_data):
    """更新spots.json文件"""
    # 为每个地图创建独立的spots.json文件
    spots_file = os.path.join(data_dir, f"spots_{map_name}.json")
    
    # 读取现有数据
    if os.path.exists(spots_file):
        try:
            with open(spots_file, 'r', encoding='utf-8') as f:
                spots = json.load(f)
        except json.JSONDecodeError:
            # 如果文件为空或格式错误，初始化为空列表
            spots = []
    else:
        spots = []
    
    # 添加新的点位数据
    spots.append(spot_data)
    
    # 保存更新后的数据
    with open(spots_file, 'w', encoding='utf-8') as f:
        json.dump(spots, f, ensure_ascii=False, indent=2)

def add_spot(map_name, location, target, throwable_type, description, image_paths, tags=None):
    """添加新的投掷物点位"""
    # 设置基础目录
    base_dir = "backend/data/throwable_spots/images"
    
    # 创建地图目录（去掉de_前缀）
    map_name = map_name.replace('de_', '')
    map_dir = os.path.join(base_dir, map_name)
    os.makedirs(map_dir, exist_ok=True)
    
    # 从第一个图片路径中获取目录名作为ID
    first_image_path = image_paths[0]
    spot_id = os.path.basename(os.path.dirname(first_image_path))
    
    # 构建点位数据
    spot_data = {
        "id": spot_id,
        "map": map_name,  # 存储时也去掉de_前缀
        "location": location,
        "target": target,
        "throwable_type": throwable_type,
        "description": description,
        "image_paths": image_paths,  # 现在包含多个图片路径
        "tags": tags or []
    }
    
    # 更新spots.json
    update_spots_json("backend/data/throwable_spots", map_name, spot_data)
    
    print(f"成功添加新的投掷物点位！ID: {spot_id}")
    print(f"数据已保存到: backend/data/throwable_spots/spots_{map_name}.json")

def main():
    parser = argparse.ArgumentParser(description="添加新的投掷物点位")
    parser.add_argument("--map", required=True, help="地图名称（可以带de_前缀，会自动去掉）")
    parser.add_argument("--location", required=True, help="投掷位置")
    parser.add_argument("--target", required=True, help="目标位置")
    parser.add_argument("--throwable_type", required=True, help="投掷物类型")
    parser.add_argument("--description", required=True, help="投掷描述")
    parser.add_argument("--image_paths", nargs="+", required=True, help="图片路径列表")
    parser.add_argument("--tags", nargs="*", help="标签列表")
    
    args = parser.parse_args()
    
    add_spot(
        args.map,
        args.location,
        args.target,
        args.throwable_type,
        args.description,
        args.image_paths,
        args.tags
    )

if __name__ == "__main__":
    main() 