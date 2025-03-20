# CS2 道具投掷助手

一个帮助 CS2 玩家学习和练习道具投掷的 Web 应用。

## 功能特点

- 支持多个地图（Dust2, Mirage, Inferno 等）
- 提供详细的投掷点位说明
- 包含投掷点位图片和视频
- 支持 AI 辅助查询

## 开发环境设置

1. 克隆项目
```bash
git clone https://github.com/yourusername/cs2-utility.git
cd cs2-utility
```

2. 安装依赖
```bash
cd frontend
npm install
```

3. 配置环境变量
```bash
# 复制环境变量模板文件
cp .env.example .env.local

# 编辑 .env.local 文件，填入你的 API 密钥
```

### 环境变量说明

- `REACT_APP_OPENAI_API_KEY`: OpenAI API 密钥（可选）
- `REACT_APP_HUGGINGFACE_API_KEY`: Hugging Face API 密钥（可选）

## 运行项目

```bash
npm start
```

访问 http://localhost:3000 查看应用。

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

MIT License - 详见 LICENSE 文件
