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
    
    // 处理真实 Emby 数据结构
    const userName = data.User?.Name || data.UserName || '未知用户';
    const itemName = data.Item?.Name || data.ItemName || '未知内容';
    const itemType = data.Item?.Type || data.ItemType || '未知类型';
    const seriesName = data.Item?.SeriesName || '未知系列';
    const seasonNumber = data.Item?.ParentIndexNumber || '未知季';
    const episodeNumber = data.Item?.IndexNumber || '未知集';
    
    const deviceName = data.Session?.DeviceName || data.DeviceName || '未知设备';
    const client = data.Session?.Client || data.Client || '未知客户端';
    const ip = data.Session?.RemoteEndPoint || data.RemoteEndPoint || '未知';
    
    const duration = data.Item?.RunTimeTicks ? formatDuration(data.Item.RunTimeTicks) : '未知';
    
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
    // 处理真实 Emby 数据结构
    const userName = data.User?.Name || data.UserName || '未知用户';
    const itemName = data.Item?.Name || data.ItemName || '未知内容';
    const itemType = data.Item?.Type || data.ItemType || '未知类型';
    const seriesName = data.Item?.SeriesName || '未知系列';
    const seasonNumber = data.Item?.ParentIndexNumber || '未知季';
    const episodeNumber = data.Item?.IndexNumber || '未知集';
    
    const deviceName = data.Session?.DeviceName || data.DeviceName || '未知设备';
    
    const playDuration = data.PlaybackInfo?.PositionTicks ? formatDuration(data.PlaybackInfo.PositionTicks) : '未知';
    const totalDuration = data.Item?.RunTimeTicks ? formatDuration(data.Item.RunTimeTicks) : '未知';
    const icon = getMediaTypeIcon(itemType);
    
    // 计算播放进度
    let progress = 0;
    if (data.Item?.RunTimeTicks && data.PlaybackInfo?.PositionTicks) {
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

  /**
   * 播放暂停事件
   */
  static async playbackPause(data) {
    const playDuration = data.PlaybackDuration ? formatDuration(data.PlaybackDuration) : '未知';
    const icon = getMediaTypeIcon(data.ItemType);
    
    const userName = data.UserName || '未知用户';
    const itemName = data.ItemName || data.Name || '未知内容';
    const deviceName = data.DeviceName || '未知设备';

    const message = {
      title: `${icon} 播放暂停`,
      content: `**用户**: ${userName}
**内容**: ${itemName}
**已播放**: ${playDuration}
**设备**: ${deviceName}`,
      atAll: false
    };

    await dingtalk.sendMarkdown(message);
  }

  /**
   * 播放继续事件
   */
  static async playbackUnpause(data) {
    const icon = getMediaTypeIcon(data.ItemType);
    
    const userName = data.UserName || '未知用户';
    const itemName = data.ItemName || data.Name || '未知内容';
    const deviceName = data.DeviceName || '未知设备';

    const message = {
      title: `${icon} 播放继续`,
      content: `**用户**: ${userName}
**内容**: ${itemName}
**设备**: ${deviceName}`,
      atAll: false
    };

    await dingtalk.sendMarkdown(message);
  }

  /**
   * 播放进度事件 - 只在里程碑点发送
   */
  static async playbackProgress(data) {
    if (!data.RunTimeTicks || !data.PlaybackPosition) return;
    
    const progress = Math.round((data.PlaybackPosition / data.RunTimeTicks) * 100);
    const milestonePoints = [25, 50, 75, 90];
    
    if (milestonePoints.includes(progress)) {
      const icon = getMediaTypeIcon(data.ItemType);
      
      const userName = data.UserName || '未知用户';
      const itemName = data.ItemName || data.Name || '未知内容';
      const deviceName = data.DeviceName || '未知设备';

      const message = {
        title: `${icon} 播放进度`,
        content: `**用户**: ${userName}
**内容**: ${itemName}
**播放进度**: ${progress}%
**设备**: ${deviceName}`,
        atAll: false
      };

      await dingtalk.sendMarkdown(message);
    }
  }

  /**
   * 播放速率变更事件
   */
  static async playbackRateChanged(data) {
    const icon = getMediaTypeIcon(data.ItemType);
    
    const userName = data.UserName || '未知用户';
    const itemName = data.ItemName || data.Name || '未知内容';
    const deviceName = data.DeviceName || '未知设备';

    const message = {
      title: `${icon} 播放速率变更`,
      content: `**用户**: ${userName}
**内容**: ${itemName}
**播放速率**: ${data.PlaybackRate || 1}x
**设备**: ${deviceName}`,
      atAll: false
    };

    await dingtalk.sendMarkdown(message);
  }

  /**
   * 播放错误事件
   */
  static async playbackError(data) {
    const userName = data.UserName || '未知用户';
    const itemName = data.ItemName || data.Name || '未知内容';
    const deviceName = data.DeviceName || '未知设备';
    const client = data.Client || '未知客户端';

    const message = {
      title: `❌ 播放错误`,
      content: `**用户**: ${userName}
**内容**: ${itemName}
**设备**: ${deviceName}
**客户端**: ${client}
**错误信息**: ${data.ErrorMessage || '未知错误'}

> ⚠️ 请检查媒体文件是否正常或网络连接是否稳定`,
      atAll: true
    };

    await dingtalk.sendMarkdown(message);
  }
}

module.exports = PlaybackHandlers;
