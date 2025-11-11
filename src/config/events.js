/** * Emby 事件配置 */ const EVENT_TYPES = {
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
// 默认启用的事件
const DEFAULT_ENABLED_EVENTS = [ EVENT_TYPES.PLAYBACK_START, EVENT_TYPES.PLAYBACK_STOP, 
  EVENT_TYPES.USER_AUTHENTICATED, EVENT_TYPES.ITEM_ADDED, EVENT_TYPES.SERVER_STARTED, 
  EVENT_TYPES.SERVER_SHUTDOWN
];
// 重要事件（会 @所有人）
const CRITICAL_EVENTS = [ EVENT_TYPES.SERVER_SHUTDOWN, EVENT_TYPES.PLAYBACK_ERROR, EVENT_TYPES.USER_LOCKED_OUT, 
  EVENT_TYPES.USER_DELETED
]; module.exports = { EVENT_TYPES, DEFAULT_ENABLED_EVENTS, CRITICAL_EVENTS
};
