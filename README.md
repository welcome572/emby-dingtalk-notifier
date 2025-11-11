# Emby 钉钉通知器

一个完整的 Emby 媒体服务器 Webhook 通知系统，支持将所有 Emby 事件实时推送到钉钉群。

## 功能特性

- 🎬 **播放事件通知** - 开始播放、停止播放、暂停、继续等
- 🔐 **用户事件通知** - 用户登录、登出、账户相关事件
- 📥 **媒体库事件通知** - 新内容添加、更新、删除等
- 🟢 **系统事件通知** - 服务器启动、关闭、重启等
- 🔧 **插件事件通知** - 插件安装、更新、卸载等
- 📱 **钉钉集成** - 实时推送到钉钉群聊




## 🚀 快速开始

### 环境要求

- Node.js >= 14.0.0
- npm >= 6.0.0

### 1. 克隆项目

```bash
git clone https://github.com/welcome572/emby-dingtalk-notifier.git
cd emby-dingtalk-notifier  2. 安装依赖 bash 复制 下载  npm install  3. 配置环境变量 复制环境变量模板文件： bash 复制 下载  cp .env.example .env  编辑  .env  文件，配置以下参数： env 复制 下载  # 钉钉机器人配置
DINGTALK_ACCESS_TOKEN=你的钉钉机器人AccessToken
DINGTALK_SECRET=你的钉钉机器人Secret

# 服务器配置
PORT=3000
NODE_ENV=production

# Emby 配置（可选）
EMBY_SERVER_URL=http://your-emby-server:8096
EMBY_API_KEY=你的EmbyAPI密钥  4. 启动服务 开发模式： bash 复制 下载  npm start  生产模式（使用PM2）： bash 复制 下载  npm install -g pm2
pm2 start server.js --name "emby-dingtalk"
pm2 save
pm2 startup  5. 配置 Emby Webhook 1.  登录 Emby 管理后台  2.  进入 设置 → Webhooks  3.  点击 添加 Webhook  4.  配置如下： ◦  URL:  http://你的服务器IP:3000/webhook   ◦  事件类型: 选择需要通知的事件     6. 测试通知 bash 复制 下载  curl http://localhost:3000/test/dingtalk  ⚙️ 配置说明 钉钉机器人配置 1.  在钉钉群添加自定义机器人  2.  选择「加签」安全设置  3.  复制  Webhook  URL 中的  access_token  和加签密钥   环境变量     变量名 必填 说明   DINGTALK_ACCESS_TOKEN  是 钉钉机器人Access Token  DINGTALK_SECRET  是 钉钉机器人加签密钥  PORT  否 服务端口，默认3000  NODE_ENV  否 环境变量，默认production    🔧 API 端点 •  GET /health  - 健康检查  •  POST /webhook  - Emby Webhook 接收  •  GET /test/dingtalk  - 钉钉测试通知   📝 许可证 MIT License text 复制 下载  
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
EOF  📦 创建 package.json 脚本 确保  package.json  包含有用的脚本： json 复制 下载  {
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}  🔄 提交这些文档文件 bash 复制 下载  git add README.md .env.example
git commit -m "docs: 添加项目安装文档和配置模板"
git push  🌟 额外建议 1. 添加 LICENSE 文件 bash 复制 下载  # 添加 MIT 许可证
curl -o LICENSE https://opensource.org/licenses/MIT  2. 创建 .gitignore bash 复制 下载  cat > .gitignore << 'EOF'
node_modules/
.env
*.log
.DS_Store
npm-debug.log*
yarn-debug.log*
yarn-error.log*
EOF  3. 添加版本标签（可选） bash 复制 下载  git tag v1.0.0
git push origin v1.0.0
