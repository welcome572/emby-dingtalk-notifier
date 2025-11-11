# Emby DingTalk Notifier

一个将 Emby 播放通知推送到钉钉群的 Webhook 服务。

## ✨ 功能特性

- 🔔 Emby 播放状态通知
- 🤖 钉钉机器人消息推送
- 🏥 健康状态检查
- 🔧 易于配置和部署

## 🚀 快速开始

### 环境要求

- Node.js >= 14.0.0
- npm >= 6.0.0

### 1. 克隆项目

```bash
git clone https://github.com/welcome572/emby-dingtalk-notifier.git
cd emby-dingtalk-notifier
2. 安装依赖
bash
npm install
3. 配置环境变量
复制环境变量模板文件：

bash
cp .env.example .env
编辑 .env 文件，配置以下参数：

env
# 钉钉机器人配置
DINGTALK_ACCESS_TOKEN=你的钉钉机器人AccessToken
DINGTALK_SECRET=你的钉钉机器人Secret

# 服务器配置
PORT=3000
NODE_ENV=production

# Emby 配置（可选）
EMBY_SERVER_URL=http://your-emby-server:8096
EMBY_API_KEY=你的EmbyAPI密钥
4. 启动服务
开发模式：

bash
npm start
生产模式（使用PM2）：

bash
npm install -g pm2
pm2 start server.js --name "emby-dingtalk"
pm2 save
pm2 startup
5. 配置 Emby Webhook
登录 Emby 管理后台

进入 设置 → Webhooks

点击 添加 Webhook

配置如下：

URL: http://你的服务器IP:3000/webhook

事件类型: 选择需要通知的事件

6. 测试通知
bash
curl http://localhost:3000/test/dingtalk
⚙️ 配置说明
钉钉机器人配置
在钉钉群添加自定义机器人

选择「加签」安全设置

复制 Webhook URL 中的 access_token 和加签密钥

环境变量
变量名	必填	说明
DINGTALK_ACCESS_TOKEN	是	钉钉机器人Access Token
DINGTALK_SECRET	是	钉钉机器人加签密钥
PORT	否	服务端口，默认3000
NODE_ENV	否	环境变量，默认production
🔧 API 端点
GET /health - 健康检查

POST /webhook - Emby Webhook 接收

GET /test/dingtalk - 钉钉测试通知

📝 许可证
MIT License

text

## 🛠️ 创建配置文件模板

创建 `.env.example` 文件：

```bash
cat > .env.example << 'EOF'
# 钉钉机器人配置
DINGTALK_ACCESS_TOKEN=your_dingtalk_access_token_here
DINGTALK_SECRET=your_dingtalk_secret_here

# 服务器配置
PORT=3000
NODE_ENV=production

# Emby 配置（可选）
EMBY_SERVER_URL=http://your-emby-server:8096
EMBY_API_KEY=your_emby_api_key_here
EOF
📦 创建 package.json 脚本
确保 package.json 包含有用的脚本：

json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
🔄 提交这些文档文件
bash
git add README.md .env.example
git commit -m "docs: 添加项目安装文档和配置模板"
git push
🌟 额外建议
1. 添加 LICENSE 文件
bash
# 添加 MIT 许可证
curl -o LICENSE https://opensource.org/licenses/MIT
2. 创建 .gitignore
bash
cat > .gitignore << 'EOF'
node_modules/
.env
*.log
.DS_Store
npm-debug.log*
yarn-debug.log*
yarn-error.log*
EOF
3. 添加版本标签（可选）
bash
git tag v1.0.0
git push origin v1.0.0
