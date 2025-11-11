const fs = require('fs');
const path = require('path');

// 要修复的文件列表
const filesToFix = [
  'src/handlers/playback.js',
  'src/handlers/user.js', 
  'src/handlers/media.js'
];

filesToFix.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 替换可选链操作符
    content = content.replace(/data\.User\?\.Name/g, '(data.User && data.User.Name)');
    content = content.replace(/data\.Item\?\.Name/g, '(data.Item && data.Item.Name)');
    content = content.replace(/data\.Item\?\.Type/g, '(data.Item && data.Item.Type)');
    content = content.replace(/data\.Item\?\.SeriesName/g, '(data.Item && data.Item.SeriesName)');
    content = content.replace(/data\.Item\?\.ParentIndexNumber/g, '(data.Item && data.Item.ParentIndexNumber)');
    content = content.replace(/data\.Item\?\.IndexNumber/g, '(data.Item && data.Item.IndexNumber)');
    content = content.replace(/data\.Item\?\.ProductionYear/g, '(data.Item && data.Item.ProductionYear)');
    content = content.replace(/data\.Item\?\.Overview/g, '(data.Item && data.Item.Overview)');
    content = content.replace(/data\.Item\?\.RunTimeTicks/g, '(data.Item && data.Item.RunTimeTicks)');
    
    content = content.replace(/data\.Session\?\.DeviceName/g, '(data.Session && data.Session.DeviceName)');
    content = content.replace(/data\.Session\?\.Client/g, '(data.Session && data.Session.Client)');
    content = content.replace(/data\.Session\?\.RemoteEndPoint/g, '(data.Session && data.Session.RemoteEndPoint)');
    
    content = content.replace(/data\.PlaybackInfo\?\.PositionTicks/g, '(data.PlaybackInfo && data.PlaybackInfo.PositionTicks)');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ 修复完成: ${file}`);
  } else {
    console.log(`❌ 文件不存在: ${file}`);
  }
});

console.log('🎉 所有文件语法修复完成！');
