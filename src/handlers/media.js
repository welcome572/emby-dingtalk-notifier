const dingtalk = require('../adapters/dingtalk');
const { getMediaTypeIcon } = require('../utils/helpers');
const logger = require('../utils/logger');

class MediaHandlers {
  /**
   * 新内容添加
   */
  static async itemAdded(data) {
    // 处理真实 Emby 数据结构
    const itemName = (data.Item && data.Item.Name) || data.ItemName || '未知内容';
    const itemType = (data.Item && data.Item.Type) || data.ItemType || '未知类型';
    const seriesName = (data.Item && data.Item.SeriesName) || '未知系列';
    const seasonNumber = (data.Item && data.Item.ParentIndexNumber) || '未知季';
    const episodeNumber = (data.Item && data.Item.IndexNumber) || '未知集';
    const productionYear = (data.Item && data.Item.ProductionYear) || data.ProductionYear || '未知';
    const overview = (data.Item && data.Item.Overview) || data.Overview || '';
    
    let timestampStr = '未知时间';
    try {
      if (data.Timestamp || data.Date) {
        timestampStr = new Date(data.Timestamp || data.Date).toLocaleString();
      }
    } catch (e) {
      timestampStr = new Date().toLocaleString();
    }
    
    const icon = getMediaTypeIcon(itemType);
    
    // 构建详细消息内容
    let content = `**内容名称**: ${itemName}\n`;
    content += `**内容类型**: ${itemType}\n`;
    
    if (itemType === 'Episode') {
      content += `**系列**: ${seriesName}\n`;
      content += `**季数**: ${seasonNumber}\n`;
      content += `**集数**: ${episodeNumber}\n`;
    }
    
    content += `**年份**: ${productionYear}\n`;
    content += `**添加时间**: ${timestampStr}`;
    
    if (overview) {
      content += `\n\n**简介**: ${overview.substring(0, 150)}...`;
    }

    const message = {
      title: `${icon} 新内容添加`,
      content: content,
      atAll: false
    };

    await dingtalk.sendMarkdown(message);
  }

  /**
   * 内容更新
   */
  static async itemUpdated(data) {
    const icon = getMediaTypeIcon(data.ItemType);
    
    const message = {
      title: `${icon} 内容更新`,
      content: `**内容名称**: ${data.ItemName || '未知内容'}
**内容类型**: ${data.ItemType || '未知类型'}
**更新类型**: ${data.UpdateReason || '元数据更新'}
**更新时间**: ${new Date(data.Timestamp).toLocaleString()}`,
      atAll: false
    };

    await dingtalk.sendMarkdown(message);
  }

  /**
   * 内容删除
   */
  static async itemDeleted(data) {
    const icon = getMediaTypeIcon(data.ItemType);
    
    const message = {
      title: `${icon} 内容删除`,
      content: `**内容名称**: ${data.ItemName || '未知内容'}
**内容类型**: ${data.ItemType || '未知类型'}
**删除路径**: ${data.ItemPath || '未知路径'}
**删除时间**: ${new Date(data.Timestamp).toLocaleString()}

> ⚠️ 内容已从媒体库中删除`,
      atAll: false
    };

    await dingtalk.sendMarkdown(message);
  }

  /**
   * 内容评分
   */
  static async itemRated(data) {
    const icon = getMediaTypeIcon(data.ItemType);
    
    const message = {
      title: `${icon} 内容评分`,
      content: `**用户**: ${data.UserName || '未知用户'}
**内容**: ${data.ItemName || '未知内容'}
**评分**: ${data.Rating || '未知'}/10
**评分时间**: ${new Date(data.Timestamp).toLocaleString()}`,
      atAll: false
    };

    await dingtalk.sendMarkdown(message);
  }

  /**
   * 内容标记为已播放
   */
  static async itemMarkedPlayed(data) {
    const icon = getMediaTypeIcon(data.ItemType);
    
    const message = {
      title: `${icon} 标记为已观看`,
      content: `**用户**: ${data.UserName || '未知用户'}
**内容**: ${data.ItemName || '未知内容'}
**播放进度**: 100%
**标记时间**: ${new Date(data.Timestamp).toLocaleString()}`,
      atAll: false
    };

    await dingtalk.sendMarkdown(message);
  }

  /**
   * 内容标记为未播放
   */
  static async itemMarkedUnplayed(data) {
    const icon = getMediaTypeIcon(data.ItemType);
    
    const message = {
      title: `${icon} 标记为未观看`,
      content: `**用户**: ${data.UserName || '未知用户'}
**内容**: ${data.ItemName || '未知内容'}
**播放进度**: 重置为 0%
**标记时间**: ${new Date(data.Timestamp).toLocaleString()}`,
      atAll: false
    };

    await dingtalk.sendMarkdown(message);
  }
}

module.exports = MediaHandlers;
