/** * 常量定义 */
// Emby 事件类型
const EMBAY_EVENTS = {
  // 播放事件
  PLAYBACK_START: 'playback.start', PLAYBACK_STOP: 'playback.stop', PLAYBACK_PAUSE: 'playback.pause', 
  PLAYBACK_UNPAUSE: 'playback.unpause', PLAYBACK_PROGRESS: 'playback.progress', PLAYBACK_RATE_CHANGED: 
  'playback.ratechanged', PLAYBACK_ERROR: 'playback.error',
  
  // 用户事件
  USER_AUTHENTICATED: 'user.authenticated', USER_LOGGED_OUT: 'user.loggedout', USER_LOCKED_OUT: 
  'user.lockedout', USER_PASSWORD_CHANGED: 'user.passwordchanged', USER_POLICY_UPDATED: 'user.policyupdated', 
  USER_DELETED: 'user.deleted', USER_CREATED: 'user.created', USER_UPDATED: 'user.updated',
  
  // 媒体事件
  ITEM_ADDED: 'item.added', ITEM_UPDATED: 'item.updated', ITEM_DELETED: 'item.deleted', ITEM_RATED: 
  'item.rated', ITEM_MARKED_PLAYED: 'item.markedplayed', ITEM_MARKED_UNPLAYED: 'item.markedunplayed',
  
  // 系统事件
  SERVER_STARTED: 'server.started', SERVER_SHUTDOWN: 'server.shutdown', SERVER_RESTARTING: 'server.restarting', 
  PLUGIN_INSTALLED: 'plugin.installed', PLUGIN_UPDATED: 'plugin.updated', PLUGIN_UNINSTALLED: 
  'plugin.uninstalled', TASK_COMPLETED: 'task.completed'
};
// 媒体类型
const MEDIA_TYPES = { MOVIE: 'Movie', SERIES: 'Series', EPISODE: 'Episode', AUDIO: 'Audio', VIDEO: 'Video', 
  BOOK: 'Book', PHOTO: 'Photo'
};
// 消息类型
const MESSAGE_TYPES = { INFO: 'info', WARNING: 'warning', ERROR: 'error', SUCCESS: 'success'
};
// HTTP 状态码
const HTTP_STATUS = { OK: 200, CREATED: 201, BAD_REQUEST: 400, UNAUTHORIZED: 401, FORBIDDEN: 403, NOT_FOUND: 
  404, INTERNAL_SERVER_ERROR: 500
};
module.exports = { EMBAY_EVENTS, MEDIA_TYPES, MESSAGE_TYPES, HTTP_STATUS
};
