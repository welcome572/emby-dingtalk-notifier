/** * 工具函数集合 */ class Helpers { /** * 将 ticks 转换为可读时长 */ static formatDuration(ticks) { if 
    (!ticks) return '未知';
    
    // Emby 中的 1 tick = 100 纳秒，所以 10,000,000 ticks = 1 秒
    const seconds = Math.floor(ticks / 10000000);
    
    if (seconds < 60) { return `${seconds}秒`;
    }
    
    const minutes = Math.floor(seconds / 60); const remainingSeconds = seconds % 60;
    
    if (minutes < 60) { return `${minutes}分${remainingSeconds}秒`;
    }
    
    const hours = Math.floor(minutes / 60); const remainingMinutes = minutes % 60;
    
    if (hours < 24) { return `${hours}小时${remainingMinutes}分`;
    }
    
    const days = Math.floor(hours / 24); const remainingHours = hours % 24;
    
    return `${days}天${remainingHours}小时`;
  }
  /** * 根据媒体类型返回对应的图标 */ static getMediaTypeIcon(itemType) { const iconMap = { 'Movie': '🎬', 
      'Series': '📺', 'Episode': '🎞️', 'Audio': '🎵', 'Video': '🎥', 'Book': '📚', 'Photo': '🖼️', 'Folder': '📁', 
      'BoxSet': '📦', 'Person': '👤', 'Genre': '🏷️', 'Studio': '🏢', 'Artist': '🎤', 'Album': '💿', 
      'MusicAlbum': '💿', 'MusicArtist': '🎤', 'Playlist': '📋'
    };
    
    return iconMap[itemType] || '📄';
  }
  /** * 格式化文件大小 */ static formatFileSize(bytes) { if (!bytes) return '未知';
    
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']; if (bytes === 0) return '0 B';
    
    const i = Math.floor(Math.log(bytes) / Math.log(1024)); return Math.round(bytes / Math.pow(1024, i) * 100) 
    / 100 + ' ' + sizes[i];
  }
  /** * 安全获取嵌套对象属性 */ static getSafe(obj, path, defaultValue = '未知') { return 
    path.split('.').reduce((acc, part) => acc && acc[part], obj) || defaultValue;
  }
  /** * 生成随机字符串 */ static generateRandomString(length = 8) { const chars = 
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; let result = ''; for (let i = 0; i < 
    length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  /** * 验证 IP 地址格式 */ static isValidIP(ip) { const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/; if 
    (!ipRegex.test(ip)) return false;
    
    return ip.split('.').every(segment => { const num = parseInt(segment, 10); return num >= 0 && num <= 255;
    });
  }
  /** * 截断字符串 */ static truncateString(str, maxLength = 100) { if (!str) return ''; if (str.length <= 
    maxLength) return str; return str.substring(0, maxLength) + '...';
  }
}
module.exports = Helpers;
