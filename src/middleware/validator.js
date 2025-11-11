const logger = require('../utils/logger'); /** * 验证 Emby Webhook 数据 */ function validateEmbyWebhook(req, 
res, next) {
  const data = req.body;
  
  // 检查必需字段
  if (!data.Event) { logger.warn('收到无效的 Webhook 请求: 缺少 Event 字段'); return res.status(400).json({ 
      error: '无效的 Webhook 数据: 缺少 Event 字段'
    });
  }
  
  // 验证时间戳
  if (data.Timestamp) { const timestamp = new Date(data.Timestamp); if (isNaN(timestamp.getTime())) { 
      logger.warn('收到无效的 Webhook 请求: 无效的时间戳格式'); return res.status(400).json({
        error: '无效的时间戳格式'
      });
    }
  }
  
  // 记录验证通过的请求
  logger.debug(`Webhook 验证通过: ${data.Event}`); next();
}
/** * 验证 API 密钥 */ function validateApiKey(req, res, next) { const apiKey = req.headers['x-api-key'] || 
  req.query.apiKey; const expectedKey = process.env.WEBHOOK_SECRET;
  
  if (!expectedKey) {
    // 如果没有设置密钥，跳过验证
    return next();
  }
  
  if (!apiKey || apiKey !== expectedKey) { logger.warn('API 密钥验证失败', { provided: apiKey ? '***' + 
      apiKey.slice(-4) : 'none', expected: '***' + expectedKey.slice(-4)
    });
    return res.status(401).json({ error: '无效的 API 密钥'
    });
  }
  
  next();
}
module.exports = { validateEmbyWebhook, validateApiKey
};
