const { validateApiKey } = require('./validator'); const logger = require('../utils/logger'); /** * 认证中间件 
 */
function authenticate(req, res, next) {
  // 检查是否来自本地网络的请求
  const isLocalRequest = isFromLocalNetwork(req);
  
  if (isLocalRequest) {
    // 本地网络请求跳过认证
    logger.debug('本地网络请求，跳过认证'); return next();
  }
  
  // 外部请求需要 API 密钥认证
  return validateApiKey(req, res, next);
}
/** * 检查是否来自本地网络 */ function isFromLocalNetwork(req) { const clientIP = req.ip || 
  req.connection.remoteAddress;
  
  // 本地回环地址
  if (clientIP === '127.0.0.1' || clientIP === '::1') { return true;
  }
  
  // 私有 IP 地址范围
  const privateIPRanges = [ '10.', '172.16.', '172.17.', '172.18.', '172.19.', '172.20.', '172.21.', '172.22.', 
    '172.23.', '172.24.', '172.25.', '172.26.', '172.27.', '172.28.', '172.29.', '172.30.', '172.31.', 
    '192.168.'
  ];
  
  return privateIPRanges.some(range => clientIP.startsWith(range));
}
module.exports = { authenticate
};
