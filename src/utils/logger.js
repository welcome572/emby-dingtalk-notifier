/** * 日志工具类 */ class Logger { /** * 信息日志 */ static info(message, data = null) { const timestamp = new 
    Date().toISOString(); console.log(`[INFO] ${timestamp} - ${message}`); if (data) {
      console.log(JSON.stringify(data, null, 2));
    }
  }
  /** * 错误日志 */ static error(message, error = null) { const timestamp = new Date().toISOString(); 
    console.error(`[ERROR] ${timestamp} - ${message}`); if (error) {
      console.error('Error details:', error); if (error.stack) { console.error('Stack trace:', error.stack);
      }
    }
  }
  /** * 警告日志 */ static warn(message, data = null) { const timestamp = new Date().toISOString(); 
    console.warn(`[WARN] ${timestamp} - ${message}`); if (data) {
      console.warn(JSON.stringify(data, null, 2));
    }
  }
  /** * 调试日志 */ static debug(message, data = null) { if (process.env.NODE_ENV === 'development') { const 
      timestamp = new Date().toISOString(); console.log(`[DEBUG] ${timestamp} - ${message}`); if (data) {
        console.log(JSON.stringify(data, null, 2));
      }
    }
  }
  /** * HTTP 请求日志中间件 */ static requestLogger(req, res, next) { const start = Date.now();
    
    res.on('finish', () => { const duration = Date.now() - start; Logger.info(`${req.method} 
      ${req.originalUrl}`, {
        status: res.statusCode, duration: `${duration}ms`, ip: req.ip, userAgent: req.get('User-Agent')
      });
    });
    
    next();
  }
  /** * 记录 Webhook 事件 */ static webhookEvent(event, data) { Logger.info(`Webhook Event: ${event}`, { user: 
      data.UserName, item: data.ItemName, device: data.DeviceName, client: data.Client, timestamp: 
      data.Timestamp
    });
  }
}
module.exports = Logger;
