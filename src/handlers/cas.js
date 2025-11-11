const dingtalk = require('../adapters/dingtalk');
const logger = require('../utils/logger');

class CASHandlers {
  static async genericCAS(data) {
    try {
      // 调试日志：查看完整数据结构
      console.log('=== CAS 通知完整数据 ===');
      console.log(JSON.stringify(data, null, 2));
      
      // 正确解析 CAS 数据结构
      const messageText = (data.data && data.data.text) || data.text || data.message || '';
      
      console.log('=== 解析的消息内容 ===');
      console.log(messageText);
      console.log('=== 数据结束 ===');
      
      // 根据消息内容推断通知类型
      if (messageText.includes('自动重命名')) {
        return await CASHandlers.fileRenamed({message: messageText});
      } else if (messageText.includes('入库成功')) {
        return await CASHandlers.libraryImported({message: messageText});
      } else if (messageText.includes('STRM文件') || messageText.includes('生成STRM文件')) {
        return await CASHandlers.strmGenerated({message: messageText});
      } else if (messageText.includes('追更')) {
        return await CASHandlers.mediaUpdated({message: messageText});
      } else {
        // 通用 CAS 通知
        const message = {
          title: '🔔 CAS 系统通知',
          content: `**内容**: ${messageText || '无详细内容'}\n**时间**: ${new Date().toLocaleString('zh-CN')}\n\nCloud Automation System 通知`,
          atAll: false
        };
        await dingtalk.sendMarkdown(message);
      }
    } catch (error) {
      logger.error('处理 CAS 通知时出错', { error: error.message, data: data });
      throw error;
    }
  }

  static async fileRenamed(data) {
    const message = {
      title: '📁 文件重命名完成',
      content: `**操作**: 文件自动重命名\n**详情**: ${data.message || '未知详情'}\n**时间**: ${new Date().toLocaleString('zh-CN')}`,
      atAll: false
    };
    await dingtalk.sendMarkdown(message);
  }

  static async libraryImported(data) {
    const message = {
      title: '🎉 媒体库入库成功', 
      content: `**操作**: 媒体库入库\n**详情**: ${data.message || '未知详情'}\n**时间**: ${new Date().toLocaleString('zh-CN')}`,
      atAll: false
    };
    await dingtalk.sendMarkdown(message);
  }

  static async strmGenerated(data) {
    const message = {
      title: '📝 STRM 文件生成完成',
      content: `**操作**: STRM 文件生成\n**详情**: ${data.message || '未知详情'}\n**时间**: ${new Date().toLocaleString('zh-CN')}`,
      atAll: false
    };
    await dingtalk.sendMarkdown(message);
  }

  static async mediaUpdated(data) {
    const message = {
      title: '🔄 媒体内容更新',
      content: `**操作**: 媒体内容追更\n**详情**: ${data.message || '未知详情'}\n**时间**: ${new Date().toLocaleString('zh-CN')}`,
      atAll: false
    };
    await dingtalk.sendMarkdown(message);
  }
}

// 确保所有方法都正确导出
module.exports = CASHandlers;
