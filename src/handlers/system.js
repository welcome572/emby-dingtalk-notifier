const dingtalk = require('../adapters/dingtalk'); const logger = require('../utils/logger'); class 
SystemHandlers {
  /** * 服务器启动 */ static async serverStarted(data) { const message = { title: '🟢 服务器已启动', content: 
      `**服务器名称**: ${data.ServerName || 'Emby Server'}
**服务器版本**: ${data.ServerVersion || '未知版本'} **启动时间**: ${new Date(data.Timestamp).toLocaleString()} 
**服务器地址**: ${data.ServerUrl || '未知'}
> ✅ 服务器运行正常，可以开始使用了`,
      atAll: true
    };
    await dingtalk.sendMarkdown(message);
  }
  /** * 服务器关闭 */ static async serverShutdown(data) { const message = { title: '🔴 服务器已关闭', content: 
      `**服务器名称**: ${data.ServerName || 'Emby Server'}
**关闭原因**: ${data.ShutdownReason || '正常关闭'} **关闭时间**: ${new Date(data.Timestamp).toLocaleString()}
> ⚠️ 服务器已停止服务`,
      atAll: true
    };
    await dingtalk.sendMarkdown(message);
  }
  /** * 服务器重启中 */ static async serverRestarting(data) { const message = { title: '🔄 服务器重启中', 
      content: `**服务器名称**: ${data.ServerName || 'Emby Server'}
**重启原因**: ${data.RestartReason || '系统维护'} **重启时间**: ${new Date(data.Timestamp).toLocaleString()}
> 🔄 服务器正在重启，请稍候...`,
      atAll: false
    };
    await dingtalk.sendMarkdown(message);
  }
  /** * 插件安装 */ static async pluginInstalled(data) { const message = { title: '📦 插件已安装', content: 
      `**插件名称**: ${data.PluginName || '未知插件'}
**插件版本**: ${data.PluginVersion || '未知版本'} **安装时间**: ${new Date(data.Timestamp).toLocaleString()} 
**安装方式**: ${data.InstallationType || '手动安装'}`,
      atAll: false
    };
    await dingtalk.sendMarkdown(message);
  }
  /** * 插件更新 */ static async pluginUpdated(data) { const message = { title: '🔄 插件已更新', content: 
      `**插件名称**: ${data.PluginName || '未知插件'}
**旧版本**: ${data.OldVersion || '未知'} **新版本**: ${data.NewVersion || '未知'} **更新时间**: ${new 
Date(data.Timestamp).toLocaleString()}`,
      atAll: false
    };
    await dingtalk.sendMarkdown(message);
  }
  /** * 插件卸载 */ static async pluginUninstalled(data) { const message = { title: '🗑️ 插件已卸载', content: 
      `**插件名称**: ${data.PluginName || '未知插件'}
**插件版本**: ${data.PluginVersion || '未知版本'} **卸载时间**: ${new Date(data.Timestamp).toLocaleString()} 
**卸载原因**: ${data.UninstallReason || '用户操作'}`,
      atAll: false
    };
    await dingtalk.sendMarkdown(message);
  }
  /** * 任务完成 */ static async taskCompleted(data) { const message = { title: '✅ 系统任务完成', content: 
      `**任务名称**: ${data.TaskName || '未知任务'}
**任务结果**: ${data.TaskResult || '成功'} **开始时间**: ${new Date(data.StartTimeUtc).toLocaleString()} 
**结束时间**: ${new Date(data.EndTimeUtc).toLocaleString()} **执行时长**: ${data.TimeSpan || '未知'}`,
      atAll: false
    };
    await dingtalk.sendMarkdown(message);
  }
}
module.exports = SystemHandlers;
