const dingtalk = require('../adapters/dingtalk');
const logger = require('../utils/logger');

class SessionHandlers {
  /**
   * 会话开始
   */
  static async sessionStarted(data) {
    const message = {
      title: '🟢 会话开始',
      content: `**用户**: ${data.UserName || '未知用户'}
**设备**: ${data.DeviceName || '未知设备'}
**客户端**: ${data.Client || '未知客户端'}
**IP地址**: ${data.RemoteEndPoint || '未知'}

会话已开始`,
      atAll: false
    };

    await dingtalk.sendMarkdown(message);
  }

  /**
   * 会话结束
   */
  static async sessionEnded(data) {
    const message = {
      title: '🔴 会话结束',
      content: `**用户**: ${data.UserName || '未知用户'}
**设备**: ${data.DeviceName || '未知设备'}
**客户端**: ${data.Client || '未知客户端'}
**IP地址**: ${data.RemoteEndPoint || '未知'}

会话已结束`,
      atAll: false
    };

    await dingtalk.sendMarkdown(message);
  }

  /**
   * 用户认证失败
   */
  static async authenticationFailed(data) {
    const message = {
      title: '❌ 用户认证失败',
      content: `**用户名**: ${data.Username || '未知用户'}
**设备**: ${data.DeviceName || '未知设备'}
**IP地址**: ${data.RemoteEndPoint || '未知'}
**客户端**: ${data.Client || '未知客户端'}

> ⚠️ 认证失败，请检查用户名和密码`,
      atAll: true
    };

    await dingtalk.sendMarkdown(message);
  }

  /**
   * 用户认证成功
   */
  static async authenticationSucceeded(data) {
    const message = {
      title: '✅ 用户认证成功',
      content: `**用户**: ${data.UserName || '未知用户'}
**设备**: ${data.DeviceName || '未知设备'}
**IP地址**: ${data.RemoteEndPoint || '未知'}

认证成功`,
      atAll: false
    };

    await dingtalk.sendMarkdown(message);
  }

  /**
   * 播放状态变更
   */
  static async playbackStateChanged(data) {
    const message = {
      title: '🔄 播放状态变更',
      content: `**用户**: ${data.UserName || '未知用户'}
**内容**: ${data.ItemName || '未知内容'}
**状态**: ${data.PlayState || '未知'}
**设备**: ${data.DeviceName || '未知设备'}

播放状态已变更`,
      atAll: false
    };

    await dingtalk.sendMarkdown(message);
  }
}

module.exports = SessionHandlers;
