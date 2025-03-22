# CS2 道具查询助手

一个帮助 CS2 玩家学习和练习道具投掷的 Web 应用。

## 功能特点

- 支持多个地图（Dust2, Mirage, Inferno, Nuke, Anubis, Ancient）
- 提供详细的投掷点位说明
- 包含投掷点位图片和视频
- 支持 AI 辅助查询

## 在线访问

访问 [https://zhuty2001.github.io/Cs2Utility/](https://zhuty2001.github.io/Cs2Utility/) 使用应用。

## 本地开发

### 环境要求

- Node.js 18.0.0 或更高版本
- npm 9.0.0 或更高版本

### 安装步骤

1. 克隆项目
```bash
git clone https://github.com/zhuty2001/Cs2Utility.git
cd Cs2Utility
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 构建生产版本
```bash
npm run build
```

### 项目结构

```
Cs2Utility/
├── src/                # 源代码目录
│   ├── components/    # React 组件
│   ├── pages/        # 页面组件
│   ├── App.tsx       # 主应用组件
│   └── main.tsx      # 应用入口
├── public/           # 静态资源
│   └── maps_processed/  # 处理后的地图图片
├── scripts/          # 工具脚本
└── dist/            # 构建输出目录
```

## 地图支持

目前支持以下地图：

- Dust2
- Mirage
- Inferno
- Nuke
- Anubis
- Ancient

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

MIT License - 详见 LICENSE 文件

## 更新日志

### v0.1.0 (2024-03-20)
- 初始版本发布
- 支持基本的地图浏览功能
- 添加了地图处理脚本
- 实现了响应式布局

## 待开发功能

- [ ] 添加具体的投掷点位信息
- [ ] 实现 AI 辅助查询功能
- [ ] 添加视频教程支持
- [ ] 优化地图显示效果
- [ ] 添加用户反馈功能

## 联系方式

如有问题或建议，请通过以下方式联系：

- GitHub Issues: [https://github.com/zhuty2001/Cs2Utility/issues](https://github.com/zhuty2001/Cs2Utility/issues)

# CS2 投掷物点位工具

这是一个基于机器学习的 CS2 投掷物点位推荐工具，可以帮助玩家找到合适的投掷物点位。

## 项目结构

```
backend/
├── data/
│   └── throwable_spots/
│       ├── images/          # 投掷物图片
│       ├── splits/          # 训练集和测试集划分
│       └── spots.json       # 投掷物数据
├── models/                  # 训练好的模型
├── scripts/                 # 工具脚本
└── src/                    # 源代码
```

## 训练数据收集方法

### 1. 准备图片

1. 在游戏中找到合适的投掷物点位
2. 使用游戏内截图或录屏截图
3. 图片要求：
   - 清晰展示投掷物轨迹
   - 清晰展示落点位置
   - 分辨率建议 1920x1080 或更高

### 2. 添加新的投掷物点位

使用 `scripts/add_spot.py` 脚本添加新的投掷物点位：

```python
python scripts/add_spot.py

# 示例：
add_new_spot(
    map_name="dust2",           # 地图名称
    location="A点",             # 投掷位置
    throwable_type="SMOKE",     # 投掷物类型（SMOKE/FLASH/MOLOTOV/GRENADE）
    description="从A点投掷烟雾弹到A门，可以阻挡CT的视线",  # 投掷说明
    image_path="/images/dust2/a_smoke.jpg",  # 图片路径
    tags=["A点", "A门", "烟雾弹", "防守"],   # 相关标签
    image_file="path/to/your/image.jpg"      # 实际图片文件路径
)
```

### 3. 数据格式说明

每个投掷物点位包含以下信息：
```json
{
  "id": "唯一标识符",
  "map": "地图名称",
  "location": "投掷位置",
  "throwable_type": "投掷物类型",
  "description": "投掷说明",
  "image_path": "图片路径",
  "tags": ["标签列表"]
}
```

## 模型训练方法

### 1. 环境准备

```bash
# 创建虚拟环境
python -m venv venv
source venv/bin/activate  # Linux/Mac
# 或
.\venv\Scripts\activate  # Windows

# 安装依赖
pip install -r backend/requirements.txt
```

### 2. 训练模型

```bash
# 进入后端目录
cd backend

# 训练模型
python train_model.py
```

训练参数说明：
- 模型：ResNet50（预训练）
- 训练轮数：100
- 批次大小：32
- 优化器：SGD
- 学习率：0.001

### 3. 模型输出

训练完成后，模型将保存在 `backend/models/trained_model.pth`。

## 注意事项

1. 图片命名规范：
   - 使用小写字母
   - 单词间用下划线连接
   - 例如：`a_smoke.jpg`

2. 标签建议：
   - 位置标签：A点、B点、中路等
   - 战术标签：进攻、防守、清点等
   - 投掷物类型标签：烟雾弹、闪光弹等

3. 投掷说明要求：
   - 包含投掷位置
   - 包含投掷目标
   - 包含投掷效果

## 贡献指南

1. Fork 项目
2. 创建新的分支
3. 添加新的投掷物点位
4. 提交更改
5. 发起 Pull Request

## 许可证

MIT License
