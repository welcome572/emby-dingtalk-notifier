const fs = require('fs');
const filePath = '/root/emby-dingtalk-notifier/src/handlers/playback.js';

let content = fs.readFileSync(filePath, 'utf8');

// 修复可选链操作符
content = content.replace(/data\.Item\?\.Name/g, '(data.Item && data.Item.Name)');
content = content.replace(/data\.Item\?\.Type/g, '(data.Item && data.Item.Type)');
content = content.replace(/data\.Item\?\.SeriesName/g, '(data.Item && data.Item.SeriesName)');
content = content.replace(/data\.Item\?\.ParentIndexNumber/g, '(data.Item && data.Item.ParentIndexNumber)');
content = content.replace(/data\.Item\?\.IndexNumber/g, '(data.Item && data.Item.IndexNumber)');

fs.writeFileSync(filePath, content, 'utf8');
console.log('playback.js 修复完成');
