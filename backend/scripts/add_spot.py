import os
import json
import shutil
from typing import Dict, Any

def add_new_spot(
    map_name: str,
    location: str,
    throwable_type: str,
    description: str,
    image_path: str,
    tags: list,
    image_file: str
):
    """添加新的投掷物点位"""
    
    # 1. 创建必要的目录
    base_dir = "data/throwable_spots"
    image_dir = os.path.join(base_dir, "images", map_name)
    os.makedirs(image_dir, exist_ok=True)
    
    # 2. 复制图片到正确的位置
    image_name = os.path.basename(image_file)
    target_image_path = os.path.join(image_dir, image_name)
    shutil.copy2(image_file, target_image_path)
    
    # 3. 加载现有的spots.json
    spots_file = os.path.join(base_dir, "spots.json")
    with open(spots_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # 4. 生成新的ID
    new_id = str(len(data['spots']) + 1)
    
    # 5. 创建新的spot数据
    new_spot = {
        "id": new_id,
        "map": map_name,
        "location": location,
        "throwable_type": throwable_type,
        "description": description,
        "image_path": f"/images/{map_name}/{image_name}",
        "tags": tags
    }
    
    # 6. 添加到spots.json
    data['spots'].append(new_spot)
    with open(spots_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    # 7. 更新训练集和测试集划分
    splits_dir = os.path.join(base_dir, "splits")
    for split_file in ["train.json", "test.json"]:
        split_path = os.path.join(splits_dir, split_file)
        with open(split_path, 'r', encoding='utf-8') as f:
            split_data = json.load(f)
        
        # 添加到训练集
        if split_file == "train.json":
            split_data['train'].append(new_id)
        # 添加到测试集
        else:
            split_data['test'].append(new_id)
        
        with open(split_path, 'w', encoding='utf-8') as f:
            json.dump(split_data, f, ensure_ascii=False, indent=2)
    
    print(f"成功添加新的投掷物点位！ID: {new_id}")

if __name__ == "__main__":
    # 示例使用
    add_new_spot(
        map_name="dust2",
        location="A点",
        throwable_type="SMOKE",
        description="从A点投掷烟雾弹到A门，可以阻挡CT的视线",
        image_path="/images/dust2/a_smoke.jpg",
        tags=["A点", "A门", "烟雾弹", "防守"],
        image_file="path/to/your/image.jpg"  # 替换为实际的图片路径
    ) 