// 确保环境变量已加载
require('dotenv').config();

const axios = require('axios');
const crypto = require('crypto');
const logger = require('../utils/logger');

class DingtalkAdapter {
  constructor() {
    // 确保环境变量已加载
    if (!process.env.DINGTALK_WEBHOOK_URL) {
      require('dotenv').config();
    }
    
    this.webhookUrl = process.env.DINGTALK_WEBHOOK_URL;
    this.secret = process.env.DINGTALK_SECRET;
    this.enabled = !!(this.webhookUrl && this.secret);
    
    if (!this.enabled) {
      logger.warn('钉钉配置缺失，请设置 DINGTALK_WEBHOOK_URL 和 DINGTALK_SECRET 环境变量');
    } else {
      logger.info('钉钉适配器已启用');
    }
  }

  generateSign(timestamp) {
    const stringToSign = `${timestamp}\n${this.secret}`;
    const sign = crypto.createHmac('sha256', this.secret)
      .update(stringToSign)
      .digest('base64');
    return encodeURIComponent(sign);
  }

  async sendMarkdown(message) {
    if (!this.enabled) {
      logger.warn('钉钉适配器未启用，跳过消息发送');
      return;
    }

    const timestamp = Date.now();
    const sign = this.generateSign(timestamp);
    
    const url = `${this.webhookUrl}&timestamp=${timestamp}&sign=${sign}`; 
    const keyword = "emby";
    const contentWithKeyword = `emby\n\n### ${message.title}\n\n${message.content}\n\n---\n*来自 Emby 服务器*`;
    
    const payload = {
      msgtype: 'markdown',
      markdown: {
        title: message.title,
        text: `### ${message.title}\n\n${message.content}\n\n---\n*来自 Emby 服务器*`
      },
      at: {
        isAtAll: message.atAll || false,
        atMobiles: message.atMobiles || [],
        atUserIds: message.atUserIds || []
      }
    };

    try {
      const response = await axios.post(url, payload, {
        headers: { 
          'Content-Type': 'application/json',
          'User-Agent': 'Emby-Dingtalk-Notifier/1.0.0'
        },
        timeout: 10000
      });
      
      if (response.data.errcode === 0) {
        logger.info(`钉钉消息发送成功: ${message.title}`);
      } else {
        logger.error(`钉钉消息发送失败: ${response.data.errmsg}`);
      }
      
      return response.data;
    } catch (error) {
      logger.error('钉钉消息发送异常:', {
        error: error.message,
        title: message.title
      });
      throw error;
    }
  }

  async sendText(text, atAll = false) {
    const message = {
      title: 'Emby 通知',
      content: text,
      atAll: atAll
    };
    return this.sendMarkdown(message);
  }

  async testConnection() {
    if (!this.enabled) {
      return { success: false, message: '钉钉适配器未配置' };
    }

    try {
      await this.sendText('🔗 Emby 钉钉通知器连接测试成功！服务运行正常。');
      return { success: true, message: '连接测试成功' };
    } catch (error) {
      return { 
        success: false, 
        message: `连接测试失败: ${error.message}` 
      };
    }
  }
}

// 创建单例
module.exports = new DingtalkAdapter();
