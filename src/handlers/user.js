const dingtalk = require('../adapters/dingtalk');
const logger = require('../utils/logger');

class UserHandlers {
  /**
   * 用户认证成功
   */
  static async userAuthenticated(data) {
    // 处理真实 Emby 数据结构
    const userName = (data.User && data.User.Name) || data.UserName || '未知用户';
    const deviceName = (data.Session && data.Session.DeviceName) || data.DeviceName || '未知设备';
    const client = (data.Session && data.Session.Client) || data.Client || '未知客户端';
    const ip = (data.Session && data.Session.RemoteEndPoint) || data.RemoteEndPoint || '未知';
    
    let timestampStr = '未知时间';
    try {
      if (data.Timestamp || data.Date) {
        timestampStr = new Date(data.Timestamp || data.Date).toLocaleString();
      }
    } catch (e) {
      timestampStr = new Date().toLocaleString();
    }

    const message = {
      title: '🔐 用户登录',
      content: `**用户**: ${userName}
**设备**: ${deviceName}
**客户端**: ${client}
**IP地址**: ${ip}
**登录时间**: ${timestampStr}`,
      atAll: false
    };

    await dingtalk.sendMarkdown(message);
  }

  /**
   * 用户登出
   */
  static async userLoggedOut(data) {
    // 处理真实 Emby 数据结构
    const userName = (data.User && data.User.Name) || data.UserName || '未知用户';
    const deviceName = (data.Session && data.Session.DeviceName) || data.DeviceName || '未知设备';
    const client = (data.Session && data.Session.Client) || data.Client || '未知客户端';
    const ip = (data.Session && data.Session.RemoteEndPoint) || data.RemoteEndPoint || '未知';
    
    let timestampStr = '未知时间';
    try {
      if (data.Timestamp || data.Date) {
        timestampStr = new Date(data.Timestamp || data.Date).toLocaleString();
      }
    } catch (e) {
      timestampStr = new Date().toLocaleString();
    }

    const message = {
      title: '🚪 用户登出',
      content: `**用户**: ${userName}
**设备**: ${deviceName}
**客户端**: ${client}
**IP地址**: ${ip}
**登出时间**: ${timestampStr}`,
      atAll: false
    };

    await dingtalk.sendMarkdown(message);
  }

  /**
   * 用户被锁定
   */
  static async userLockedOut(data) {
    const message = {
      title: '🔒 用户账户被锁定',
      content: `**用户**: ${data.UserName || '未知用户'}
**锁定原因**: ${data.LockoutReason || '多次认证失败'}
**IP地址**: ${data.RemoteEndPoint || '未知'}
**锁定时间**: ${new Date(data.Timestamp).toLocaleString()}

> ⚠️ 请注意账户安全，检查是否有异常登录尝试`,
      atAll: true
    };

    await dingtalk.sendMarkdown(message);
  }

  /**
   * 用户密码修改
   */
  static async userPasswordChanged(data) {
    const message = {
      title: '🔑 用户密码修改',
      content: `**用户**: ${data.UserName || '未知用户'}
**修改方式**: ${data.ChangeType || '用户自主修改'}
**修改时间**: ${new Date(data.Timestamp).toLocaleString()}
**IP地址**: ${data.RemoteEndPoint || '未知'}`,
      atAll: false
    };

    await dingtalk.sendMarkdown(message);
  }

  /**
   * 用户策略更新
   */
  static async userPolicyUpdated(data) {
    const message = {
      title: '📋 用户权限更新',
      content: `**用户**: ${data.UserName || '未知用户'}
**策略变更**: ${data.PolicyChanges || '权限设置更新'}
**操作者**: ${data.ModifiedBy || '系统'}
**更新时间**: ${new Date(data.Timestamp).toLocaleString()}`,
      atAll: false
    };

    await dingtalk.sendMarkdown(message);
  }

  /**
   * 用户被删除
   */
  static async userDeleted(data) {
    const message = {
      title: '🗑️ 用户账户删除',
      content: `**用户**: ${data.UserName || '未知用户'}
**删除操作者**: ${data.DeletedBy || '系统管理员'}
**删除时间**: ${new Date(data.Timestamp).toLocaleString()}

> ⚠️ 重要操作，请确认是否为预期行为`,
      atAll: true
    };

    await dingtalk.sendMarkdown(message);
  }

  /**
   * 用户创建
   */
  static async userCreated(data) {
    const message = {
      title: '👤 新用户创建',
      content: `**新用户**: ${data.UserName || '未知用户'}
**创建者**: ${data.CreatedBy || '系统管理员'}
**创建时间**: ${new Date(data.Timestamp).toLocaleString()}
**用户策略**: ${data.UserPolicy || '默认策略'}`,
      atAll: false
    };

    await dingtalk.sendMarkdown(message);
  }

  /**
   * 用户信息更新
   */
  static async userUpdated(data) {
    const message = {
      title: '✏️ 用户信息更新',
      content: `**用户**: ${data.UserName || '未知用户'}
**更新字段**: ${data.UpdatedFields || '用户信息'}
**操作者**: ${data.ModifiedBy || '用户自己'}
**更新时间**: ${new Date(data.Timestamp).toLocaleString()}`,
      atAll: false
    };

    await dingtalk.sendMarkdown(message);
  }
}

module.exports = UserHandlers;
