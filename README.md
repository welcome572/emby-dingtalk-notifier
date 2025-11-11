# Emby 钉钉通知器

一个完整的 Emby 媒体服务器 Webhook 通知系统，支持将所有 Emby 事件实时推送到钉钉群。

## 功能特性

- 🎬 **播放事件通知** - 开始播放、停止播放、暂停、继续等
- 🔐 **用户事件通知** - 用户登录、登出、账户相关事件
- 📥 **媒体库事件通知** - 新内容添加、更新、删除等
- 🟢 **系统事件通知** - 服务器启动、关闭、重启等
- 🔧 **插件事件通知** - 插件安装、更新、卸载等
- 📱 **钉钉集成** - 实时推送到钉钉群聊

## 快速开始

### 1. 安装依赖
```bash
npm install
# 钉钉机器人配置
DINGTALK_WEBHOOK_URL=你的钉钉Webhook_URL
DINGTALK_SECRET=你的钉钉Secret

# 服务器配置
PORT=3000
NODE_ENV=productionnpm start
npm start
npm start
配置 Emby Webhook 在 Emby 管理控制台中： •  进入 高级 → Webhooks  •  添加 Webhook URL:  http://你的服务器IP:3000/webhook   •  选择需要通知的事件类型
eof
