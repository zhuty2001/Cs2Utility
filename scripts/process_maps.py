import os
from PIL import Image
import glob

def process_image(input_path, output_path, target_size=(2048, 2048)):
    """
    处理图片到指定大小，保持宽高比
    """
    try:
        # 打开图片
        with Image.open(input_path) as img:
            # 转换为 RGBA 模式（如果需要）
            if img.mode != 'RGBA':
                img = img.convert('RGBA')
            
            # 创建一个新的透明背景图片
            new_img = Image.new('RGBA', target_size, (0, 0, 0, 0))
            
            # 计算缩放比例
            ratio = min(target_size[0] / img.width, target_size[1] / img.height)
            new_size = (int(img.width * ratio), int(img.height * ratio))
            
            # 缩放图片
            resized_img = img.resize(new_size, Image.Resampling.LANCZOS)
            
            # 计算居中位置
            position = ((target_size[0] - new_size[0]) // 2,
                       (target_size[1] - new_size[1]) // 2)
            
            # 将缩放后的图片粘贴到新图片上
            new_img.paste(resized_img, position, resized_img)
            
            # 保存处理后的图片
            new_img.save(output_path, 'PNG')
            print(f"Successfully processed: {input_path}")
            
    except Exception as e:
        print(f"Error processing {input_path}: {str(e)}")

def main():
    # 设置输入和输出目录
    input_dir = "../frontend/public/images/maps"
    output_dir = "../frontend/public/images/maps_processed"
    
    # 创建输出目录（如果不存在）
    os.makedirs(output_dir, exist_ok=True)
    
    # 遍历所有地图目录
    for map_dir in os.listdir(input_dir):
        map_path = os.path.join(input_dir, map_dir)
        if os.path.isdir(map_path):
            # 创建对应的输出目录
            output_map_dir = os.path.join(output_dir, map_dir)
            os.makedirs(output_map_dir, exist_ok=True)
            
            # 处理该目录下的所有 PNG 文件
            for png_file in glob.glob(os.path.join(map_path, "*.png")):
                # 获取文件名
                filename = os.path.basename(png_file)
                # 设置输出路径
                output_path = os.path.join(output_map_dir, filename)
                # 处理图片
                process_image(png_file, output_path)

if __name__ == "__main__":
    main() 