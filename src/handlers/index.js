const playbackHandlers = require('./playback');
const userHandlers = require('./user');
const mediaHandlers = require('./media');
const systemHandlers = require('./system');
const sessionHandlers = require('./session');
const adminHandlers = require('./admin');
const casHandlers = require('./cas');

// 所有事件处理器的映射
const eventHandlers = {
  // === 播放事件 ===
  'playback.start': playbackHandlers.playbackStart,
  'playback.stop': playbackHandlers.playbackStop,
  'playback.pause': playbackHandlers.playbackPause,
  'playback.unpause': playbackHandlers.playbackUnpause,
  'playback.progress': playbackHandlers.playbackProgress,
  'playback.ratechanged': playbackHandlers.playbackRateChanged,
  'playback.error': playbackHandlers.playbackError,
  
  // === 用户事件 ===
  'user.authenticated': userHandlers.userAuthenticated,
  'user.loggedout': userHandlers.userLoggedOut,
  'user.lockedout': userHandlers.userLockedOut,
  'user.passwordchanged': userHandlers.userPasswordChanged,
  'user.policyupdated': userHandlers.userPolicyUpdated,
  'user.deleted': userHandlers.userDeleted,
  'user.created': userHandlers.userCreated,
  'user.updated': userHandlers.userUpdated,
  
  // === 媒体事件 ===
  'item.added': mediaHandlers.itemAdded,
  'item.updated': mediaHandlers.itemUpdated,
  'item.deleted': mediaHandlers.itemDeleted,
  'item.rated': mediaHandlers.itemRated,
  'item.markedplayed': mediaHandlers.itemMarkedPlayed,
  'item.markedunplayed': mediaHandlers.itemMarkedUnplayed,
  'library.new': mediaHandlers.libraryNew,
  
  // === 系统事件 ===
  'server.started': systemHandlers.serverStarted,
  'server.shutdown': systemHandlers.serverShutdown,
  'server.restarting': systemHandlers.serverRestarting,
  'plugin.installed': systemHandlers.pluginInstalled,
  'plugin.updated': systemHandlers.pluginUpdated,
  'plugin.uninstalled': systemHandlers.pluginUninstalled,
  'task.completed': systemHandlers.taskCompleted,
  
  // === 会话事件 ===
  'session.started': sessionHandlers.sessionStarted,
  'session.ended': sessionHandlers.sessionEnded,
  'authentication.failed': sessionHandlers.authenticationFailed,
  'authentication.succeeded': sessionHandlers.authenticationSucceeded,
  'playback.state.changed': sessionHandlers.playbackStateChanged,
  
  // === 管理员事件 ===
  'database.updated': adminHandlers.databaseUpdated,
  'system.awake': adminHandlers.systemAwake,
  'image.download.complete': adminHandlers.imageDownloadComplete,
  'subtitle.download.complete': adminHandlers.subtitleDownloadComplete,
  'scheduled.task.completed': adminHandlers.scheduledTaskCompleted,
  
  // === CAS 系统事件 ===
  'cas.file.renamed': casHandlers.fileRenamed,
  'cas.library.imported': casHandlers.libraryImported,
  'cas.strm.generated': casHandlers.strmGenerated,
  'cas.generic': casHandlers.genericCAS,
};

// 默认处理器
const defaultHandler = async (data) => {
  const logger = require('../utils/logger');
  logger.warn(`收到未注册的事件类型: ${data.Event}`, { data: data });
};

// 使用 Proxy 处理未定义的事件类型
const eventHandlersWithDefault = new Proxy(eventHandlers, {
  get: function(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      const logger = require('../utils/logger');
      logger.warn(`未注册的事件类型: ${prop}`);
      return defaultHandler;
    }
  }
});

module.exports = eventHandlersWithDefault;
