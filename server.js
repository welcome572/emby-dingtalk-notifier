require("dotenv").config();

const express = require('express');
const eventHandlers = require('./src/handlers');
const logger = require('./src/utils/logger');
const CASHandlers = require("./src/handlers/cas");

const app = express();
const PORT = process.env.PORT || 3010;

// 中间件
app.use(express.json({ limit: '10mb' }));

// 健康检查端点
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'Emby Dingtalk Notifier',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// 钉钉测试端点
app.get('/test/dingtalk', async (req, res) => {
  try {
    const dingtalk = require('./src/adapters/dingtalk');
    const message = {
      title: '🧪 测试通知',
      content: `**服务**: Emby Dingtalk Notifier
**状态**: 正常运行
**时间**: ${new Date().toLocaleString('zh-CN')}
**消息**: 这是一条测试消息，用于验证钉钉通知功能是否正常工作`,
      atAll: false
    };
    
    await dingtalk.sendMarkdown(message);
    res.json({ status: 'success', message: '测试消息发送成功' });
  } catch (error) {
    logger.error('钉钉测试发送失败', { error: error.message });
    res.status(500).json({ error: '测试发送失败', message: error.message });
  }
});

// Emby Webhook 路由
app.post('/webhook', async (req, res) => {
  const data = req.body;
  const userAgent = req.get('User-Agent') || '';
  const sourceIp = req.ip;

  // 空请求处理
  if (Object.keys(data).length === 0) {
    if (userAgent.includes('got') || sourceIp.includes('172.17.')) {
      logger.info('收到容器服务测试请求', { ip: sourceIp, userAgent: userAgent });
      res.json({ 
        status: 'success', 
        message: 'Webhook 服务正常运行',
        service: 'Emby Dingtalk Notifier',
        version: '1.0.0',
        timestamp: new Date().toISOString()
      });
    } else {
      logger.info('收到空的测试请求', { 
        ip: sourceIp,
        userAgent: userAgent,
        headers: req.headers
      });
      res.status(200).json({ 
        status: 'info', 
        message: '收到空请求，服务正常运行',
        usage: '请发送有效的 Emby Webhook 数据',
        example_events: [
          'playback.start',
          'playback.stop', 
          'item.added',
          'user.authenticated',
          'library.new'
        ],
        test_endpoint: '/webhook?test=true',
        timestamp: new Date().toISOString()
      });
    }
    return;
  }

  const event = data.Event;
  
  logger.info(`收到 Emby Webhook 事件: ${event}`, {
    user: data.UserName,
    item: data.ItemName,
    device: data.DeviceName
  });
  
  const handler = eventHandlers[event];
  
  if (handler) {
    await handler(data);
    res.json({ 
      status: 'success', 
      message: '事件处理成功',
      event: event
    });
  } else {
    logger.warn(`未处理的事件类型: ${event}`);
    res.status(404).json({ 
      error: '未支持的事件类型',
      event: event
    });
  }
});

// 事件测试端点
app.post('/test/:eventType', async (req, res) => {
  const eventType = req.params.eventType;
  
  const testData = {
    Event: eventType,
    UserName: '测试用户',
    ItemName: '测试内容',
    ItemType: 'Movie',
    DeviceName: '测试设备',
    Client: '测试客户端',
    Timestamp: new Date().toISOString(),
    ...req.body
  };
  
  try {
    const handler = eventHandlers[eventType];
    if (handler) {
      await handler(testData);
      res.json({ 
        status: 'success', 
        message: '测试消息发送成功',
        event: eventType 
      });
    } else {
      res.status(404).json({ error: '未找到对应的事件处理器' });
    }
  } catch (error) {
    logger.error('测试事件处理失败', { error: error.message, eventType: eventType });
    res.status(500).json({ error: '测试失败', message: error.message });
  }
});

// CAS 系统 Webhook 路由
app.post('/cas-webhook', async (req, res) => {
  const originalData = req.body;
  const userAgent = req.get('User-Agent') || '';
  const sourceIp = req.ip;

  logger.info('收到 CAS 系统通知', {
    ip: sourceIp,
    userAgent: userAgent,
    data: originalData
  });

  try {
    // 处理 CAS 数据结构：数据可能在 data.data.text 或 data.text
    const messageText = (originalData.data && originalData.data.text) || originalData.text || '';
    const notificationType = originalData.notificationType || '系统通知';
    
    // 重构数据格式以匹配 CAS 处理器的期望
    const processedData = {
      message: messageText,
      notificationType: notificationType,
      ...originalData
    };

    // 根据消息内容路由到不同的处理器
    if (messageText.includes('自动重命名')) {
      await CASHandlers.fileRenamed(processedData);
    } else if (messageText.includes('入库成功')) {
      await CASHandlers.libraryImported(processedData);
    } else if (messageText.includes('STRM文件') || messageText.includes('生成STRM文件')) {
      await CASHandlers.strmGenerated(processedData);
    } else {
      await CASHandlers.genericCAS(processedData);
    }

    res.json({ 
      status: 'success', 
      message: 'CAS 通知处理成功',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error('处理 CAS 通知时出错', { error: error.message, data: originalData });
    res.status(500).json({ 
      error: '处理通知时出错',
      message: error.message 
    });
  }
});

// 404 处理
app.use('*', (req, res) => {
  res.status(404).json({ error: '接口不存在' });
});

// 错误处理中间件
app.use((error, req, res, next) => {
  logger.error('服务器错误', { error: error.message, stack: error.stack });
  res.status(500).json({ error: '服务器内部错误', message: error.message });
});

// 启动服务器
app.listen(PORT, () => {
  console.log('🚀 Emby Dingtalk Notifier 服务已启动');
  console.log('📍 服务地址: http://localhost:' + PORT);
  console.log('📝 Webhook 端点: http://localhost:' + PORT + '/webhook');
  console.log('🔧 健康检查: http://localhost:' + PORT + '/health');
  console.log('🧪 钉钉测试: http://localhost:' + PORT + '/test/dingtalk');
  console.log('🌐 CAS Webhook: http://localhost:' + PORT + '/cas-webhook');
});
