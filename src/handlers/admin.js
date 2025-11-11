const dingtalk = require('../adapters/dingtalk');
const logger = require('../utils/logger');

class AdminHandlers {
  /**
   * 数据库更新
   */
  static async databaseUpdated(data) {
    const message = {
      title: '🗃️ 数据库已更新',
      content: `**更新类型**: ${data.UpdateType || '未知'}
**更新内容**: ${data.UpdateDescription || '数据库维护'}

数据库更新完成`,
      atAll: false
    };

    await dingtalk.sendMarkdown(message);
  }

  /**
   * 系统唤醒
   */
  static async systemAwake(data) {
    const message = {
      title: '⏰ 系统唤醒',
      content: `系统从睡眠状态唤醒

**唤醒时间**: ${new Date().toLocaleString('zh-CN')}`,
      atAll: false
    };

    await dingtalk.sendMarkdown(message);
  }

  /**
   * 图片下载完成
   */
  static async imageDownloadComplete(data) {
    const message = {
      title: '🖼️ 图片下载完成',
      content: `**项目**: ${data.ItemName || '未知内容'}
**图片类型**: ${data.ImageType || '未知'}
**成功**: ${data.Success ? '是' : '否'}

图片元数据下载完成`,
      atAll: false
    };

    await dingtalk.sendMarkdown(message);
  }

  /**
   * 字幕下载完成
   */
  static async subtitleDownloadComplete(data) {
    const message = {
      title: '📝 字幕下载完成',
      content: `**项目**: ${data.ItemName || '未知内容'}
**语言**: ${data.Language || '未知'}
**提供者**: ${data.Provider || '未知'}
**成功**: ${data.Success ? '是' : '否'}

字幕下载完成`,
      atAll: false
    };

    await dingtalk.sendMarkdown(message);
  }

  /**
   * 定时任务完成
   */
  static async scheduledTaskCompleted(data) {
    const message = {
      title: '⏱️ 定时任务完成',
      content: `**任务名称**: ${data.Name || '未知任务'}
**结果**: ${data.Result || '完成'}
**开始时间**: ${data.StartTimeUtc ? new Date(data.StartTimeUtc).toLocaleString('zh-CN') : '未知'}
**结束时间**: ${data.EndTimeUtc ? new Date(data.EndTimeUtc).toLocaleString('zh-CN') : '未知'}

定时任务执行完成`,
      atAll: false
    };

    await dingtalk.sendMarkdown(message);
  }
}

module.exports = AdminHandlers;
