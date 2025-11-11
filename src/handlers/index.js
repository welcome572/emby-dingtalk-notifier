const playbackHandlers = require('./playback'); const userHandlers = require('./user'); const mediaHandlers = 
require('./media'); const systemHandlers = require('./system');
// 所有事件处理器的映射
const eventHandlers = {
  // === 播放事件 ===
  'playback.start': playbackHandlers.playbackStart, 'playback.stop': playbackHandlers.playbackStop, 
  'playback.pause': playbackHandlers.playbackPause, 'playback.unpause': playbackHandlers.playbackUnpause, 
  'playback.progress': playbackHandlers.playbackProgress, 'playback.ratechanged': 
  playbackHandlers.playbackRateChanged, 'playback.error': playbackHandlers.playbackError,
  
  // === 用户事件 ===
  'user.authenticated': userHandlers.userAuthenticated, 'user.loggedout': userHandlers.userLoggedOut, 
  'user.lockedout': userHandlers.userLockedOut, 'user.passwordchanged': userHandlers.userPasswordChanged, 
  'user.policyupdated': userHandlers.userPolicyUpdated, 'user.deleted': userHandlers.userDeleted, 
  'user.created': userHandlers.userCreated, 'user.updated': userHandlers.userUpdated,
  
  // === 媒体事件 ===
  'item.added': mediaHandlers.itemAdded, 'item.updated': mediaHandlers.itemUpdated, 'item.deleted': 
  mediaHandlers.itemDeleted, 'item.rated': mediaHandlers.itemRated, 'item.markedplayed': 
  mediaHandlers.itemMarkedPlayed, 'item.markedunplayed': mediaHandlers.itemMarkedUnplayed,
  'library.new': mediaHandlers.libraryNew,
  
  // === 系统事件 ===
  'server.started': systemHandlers.serverStarted, 'server.shutdown': systemHandlers.serverShutdown, 
  'server.restarting': systemHandlers.serverRestarting, 'plugin.installed': systemHandlers.pluginInstalled, 
  'plugin.updated': systemHandlers.pluginUpdated, 'plugin.uninstalled': systemHandlers.pluginUninstalled, 
  'task.completed': systemHandlers.taskCompleted,
};
module.exports = eventHandlers;
