const dingtalk = require('../adapters/dingtalk');
const { formatDuration, getMediaTypeIcon } = require('../utils/helpers');
const logger = require('../utils/logger');

class PlaybackHandlers {
  /**
   * 播放开始事件
   */
  static async playbackStart(data) {
    console.log('=== 播放开始事件完整数据 ===');
    console.log(JSON.stringify(data, null, 2));
    console.log('=== 数据结束 ===');
    
    // 处理真实 Emby 数据结构 - 兼容旧版本 Node.js
    const userName = (data.User && data.User.Name) || data.UserName || '未知用户';
    const itemName = (data.Item && data.Item.Name) || data.ItemName || '未知内容';
    const itemType = (data.Item && data.Item.Type) || data.ItemType || '未知类型';
    const seriesName = (data.Item && data.Item.SeriesName) || '未知系列';
    const seasonNumber = (data.Item && data.Item.ParentIndexNumber) || '未知季';
    const episodeNumber = (data.Item && data.Item.IndexNumber) || '未知集';
    
    const deviceName = (data.Session && data.Session.DeviceName) || data.DeviceName || '未知设备';
    const client = (data.Session && data.Session.Client) || data.Client || '未知客户端';
    const ip = (data.Session && data.Session.RemoteEndPoint) || data.RemoteEndPoint || '未知';
    
    const duration = (data.Item && data.Item.RunTimeTicks) ? formatDuration(data.Item.RunTimeTicks) : '未知';
    
    // 处理时间戳
    let timestampStr = '未知时间';
    try {
      if (data.Timestamp || data.Date) {
        timestampStr = new Date(data.Timestamp || data.Date).toLocaleString();
      }
    } catch (e) {
      timestampStr = new Date().toLocaleString();
    }
    
    // 构建更详细的消息内容
    let content = `**用户**: ${userName}\n`;
    content += `**内容**: ${itemName}\n`;
    
    if (itemType === 'Episode') {
      content += `**系列**: ${seriesName}\n`;
      content += `**季数**: ${seasonNumber}\n`;
      content += `**集数**: ${episodeNumber}\n`;
    }
    
    content += `**类型**: ${itemType}\n`;
    content += `**时长**: ${duration}\n`;
    content += `**设备**: ${deviceName}\n`;
    content += `**客户端**: ${client}\n`;
    content += `**IP地址**: ${ip}\n`;
    content += `**时间**: ${timestampStr}`;
    
    const icon = getMediaTypeIcon(itemType);
    
    const message = {
      title: `${icon} 开始播放`,
      content: content,
      atAll: false
    };

    await dingtalk.sendMarkdown(message);
  }

  /**
   * 播放停止事件
   */
  static async playbackStop(data) {
    // 处理真实 Emby 数据结构 - 兼容旧版本 Node.js
    const userName = (data.User && data.User.Name) || data.UserName || '未知用户';
    const itemName = (data.Item && data.Item.Name) || data.ItemName || '未知内容';
    const itemType = (data.Item && data.Item.Type) || data.ItemType || '未知类型';
    const seriesName = (data.Item && data.Item.SeriesName) || '未知系列';
    const seasonNumber = (data.Item && data.Item.ParentIndexNumber) || '未知季';
    const episodeNumber = (data.Item && data.Item.IndexNumber) || '未知集';
    
    const deviceName = (data.Session && data.Session.DeviceName) || data.DeviceName || '未知设备';
    
    const playDuration = (data.PlaybackInfo && data.PlaybackInfo.PositionTicks) ? formatDuration(data.PlaybackInfo.PositionTicks) : '未知';
    const totalDuration = (data.Item && data.Item.RunTimeTicks) ? formatDuration(data.Item.RunTimeTicks) : '未知';
    const icon = getMediaTypeIcon(itemType);
    
    // 计算播放进度
    let progress = 0;
    if (data.Item && data.Item.RunTimeTicks && data.PlaybackInfo && data.PlaybackInfo.PositionTicks) {
      progress = Math.round((data.PlaybackInfo.PositionTicks / data.Item.RunTimeTicks) * 100);
    }

    // 构建详细消息内容
    let content = `**用户**: ${userName}\n`;
    content += `**内容**: ${itemName}\n`;
    
    if (itemType === 'Episode') {
      content += `**系列**: ${seriesName}\n`;
      content += `**季数**: ${seasonNumber}\n`;
      content += `**集数**: ${episodeNumber}\n`;
    }
    
    content += `**类型**: ${itemType}\n`;
    content += `**播放时长**: ${playDuration}\n`;
    content += `**总时长**: ${totalDuration}\n`;
    content += `**完成度**: ${progress}%\n`;
    content += `**设备**: ${deviceName}`;

    const message = {
      title: `${icon} 播放完成`,
      content: content,
      atAll: false
    };

    await dingtalk.sendMarkdown(message);
  }

  // ... 其他方法保持不变
}

module.exports = PlaybackHandlers;
