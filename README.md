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
