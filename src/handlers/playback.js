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
    const duration = (data.Item && data.Item.RunTimeTicks) ? formatDuration(data.Item.RunTimeTicks) : '未知';

    const message = {
      title: `${getMediaTypeIcon(itemType)} 开始播放`,
      content: `**用户**: ${userName}
**内容**: ${itemName}
**类型**: ${itemType}
**系列**: ${seriesName !== '未知系列' ? seriesName : '单集内容'}
**季数**: ${seasonNumber}
**集数**: ${episodeNumber}
**时长**: ${duration}
**设备**: ${data.DeviceName || '未知设备'}
**客户端**: ${data.Client || '未知客户端'}`,
      atAll: false
    };

    await dingtalk.sendMarkdown(message);
  }

  /**
   * 播放停止事件
   */
  static async playbackStop(data) {
    const userName = (data.User && data.User.Name) || data.UserName || '未知用户';
    const itemName = (data.Item && data.Item.Name) || data.ItemName || '未知内容';
    const itemType = (data.Item && data.Item.Type) || data.ItemType || '未知类型';
    const seriesName = (data.Item && data.Item.SeriesName) || '未知系列';
    const seasonNumber = (data.Item && data.Item.ParentIndexNumber) || '未知季';
    const episodeNumber = (data.Item && data.Item.IndexNumber) || '未知集';
    const totalDuration = (data.Item && data.Item.RunTimeTicks) ? formatDuration(data.Item.RunTimeTicks) : '未知';

    // 计算播放进度
    let progress = '未知';
    if (data.Item && data.Item.RunTimeTicks && data.PlaybackInfo && data.PlaybackInfo.PositionTicks) {
      const playedSeconds = Math.floor(data.PlaybackInfo.PositionTicks / 10000000);
      const totalSeconds = Math.floor(data.Item.RunTimeTicks / 10000000);
      const percentage = totalSeconds > 0 ? Math.round((playedSeconds / totalSeconds) * 100) : 0;
      progress = `${formatDuration(data.PlaybackInfo.PositionTicks)} / ${totalDuration} (${percentage}%)`;
    }

    const message = {
      title: `${getMediaTypeIcon(itemType)} 停止播放`,
      content: `**用户**: ${userName}
**内容**: ${itemName}
**类型**: ${itemType}
**系列**: ${seriesName !== '未知系列' ? seriesName : '单集内容'}
**季数**: ${seasonNumber}
**集数**: ${episodeNumber}
**播放进度**: ${progress}
**播放状态**: ${data.PlayedToCompletion ? '✅ 观看完成' : '⏸️ 未完成'}`,
      atAll: false
    };

    await dingtalk.sendMarkdown(message);
  }

  /**
   * 通用播放事件处理器
   */
  static async genericHandler(data) {
    const userName = (data.User && data.User.Name) || data.UserName || '未知用户';
    const itemName = (data.Item && data.Item.Name) || data.ItemName || '未知内容';
    const itemType = (data.Item && data.Item.Type) || data.ItemType || '未知类型';

    const message = {
      title: `${getMediaTypeIcon(itemType)} 播放活动`,
      content: `**用户**: ${userName}
**内容**: ${itemName}
**类型**: ${itemType}
**事件**: ${data.Event || '未知事件'}
**设备**: ${data.DeviceName || '未知设备'}`,
      atAll: false
    };

    await dingtalk.sendMarkdown(message);
  }
}

// 为兼容性保留旧方法名
PlaybackHandlers.playbackPause = PlaybackHandlers.genericHandler;
PlaybackHandlers.playbackUnpause = PlaybackHandlers.genericHandler;
PlaybackHandlers.playbackProgress = PlaybackHandlers.genericHandler;
PlaybackHandlers.playbackRateChanged = PlaybackHandlers.genericHandler;
PlaybackHandlers.playbackError = PlaybackHandlers.genericHandler;

module.exports = PlaybackHandlers;
