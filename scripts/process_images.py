from PIL import Image
import os

def process_image(input_path, output_path):
    # 打开图片
    img = Image.open(input_path)
    
    # 转换为 RGBA 模式（如果还不是的话）
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    
    # 获取图片数据
    data = img.getdata()
    
    # 创建新的像素数据
    new_data = []
    
    # 处理每个像素
    for item in data:
        # 如果像素接近黑色（R,G,B 都小于 30），则将其转换为白色
        if item[0] < 30 and item[1] < 30 and item[2] < 30:
            new_data.append((255, 255, 255, item[3]))  # 转换为白色，保持原始透明度
        else:
            new_data.append(item)  # 保持其他像素不变
    
    # 更新图片数据
    img.putdata(new_data)
    
    # 保存处理后的图片
    img.save(output_path, 'PNG')

def main():
    # 获取脚本所在目录的父目录（项目根目录）
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    
    # 设置输入和输出目录
    base_dir = os.path.join(project_root, 'public', 'images', 'maps_processed')
    
    # 遍历所有地图文件夹
    for map_name in os.listdir(base_dir):
        map_dir = os.path.join(base_dir, map_name)
        
        # 确保是目录
        if not os.path.isdir(map_dir):
            continue
            
        # 遍历地图文件夹中的所有图片
        for filename in os.listdir(map_dir):
            if filename.lower().endswith('.png'):
                input_path = os.path.join(map_dir, filename)
                output_path = os.path.join(map_dir, f'processed_{filename}')
                
                print(f'处理图片: {input_path}')
                process_image(input_path, output_path)
                
                # 替换原文件
                os.remove(input_path)
                os.rename(output_path, input_path)
                print(f'完成处理: {input_path}')

if __name__ == '__main__':
    main() 