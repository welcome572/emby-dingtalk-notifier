const logger = require('../utils/logger');
// 简单的内存限流器
const requestCounts = new Map(); /** * 限流中间件 */ function rateLimiter(req, res, next) { const clientIP = 
  req.ip || req.connection.remoteAddress; const now = Date.now(); const windowMs = 15 * 60 * 1000; // 
  15分钟窗口 const maxRequests = 100; // 最大请求数
  
  // 清理过期记录
  cleanupExpiredRecords();
  
  if (!requestCounts.has(clientIP)) { requestCounts.set(clientIP, { count: 1, firstRequest: now
    });
  } else {
    const clientData = requestCounts.get(clientIP);
    
    // 检查是否在时间窗口内
    if (now - clientData.firstRequest < windowMs) { clientData.count++;
      
      if (clientData.count > maxRequests) { logger.warn(`IP ${clientIP} 触发限流`, { count: clientData.count, 
          max: maxRequests
        });
        
        return res.status(429).json({ error: '请求过于频繁，请稍后重试', retryAfter: Math.ceil((windowMs - (now 
          - clientData.firstRequest)) / 1000)
        });
      }
    } else {
      // 重置计数器
      clientData.count = 1; clientData.firstRequest = now;
    }
  }
  
  next();
}
/** * 清理过期记录 */ function cleanupExpiredRecords() { const now = Date.now(); const windowMs = 15 * 60 * 
  1000;
  
  for (const [ip, data] of requestCounts.entries()) { if (now - data.firstRequest > windowMs) { 
      requestCounts.delete(ip);
    }
  }
}
module.exports = { rateLimiter
};
