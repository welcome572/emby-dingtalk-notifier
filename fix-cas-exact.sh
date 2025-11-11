#!/bin/bash

# 备份原文件
cp /root/emby-dingtalk-notifier/server.js /root/emby-dingtalk-notifier/server.js.backup

# 使用 sed 替换第146-175行的内容
sed -i '146,175c\
// CAS 系统 Webhook 路由\
app.post('\''/cas-webhook'\'', async (req, res) => {\
  const originalData = req.body;\
  const userAgent = req.get('\''User-Agent'\'') || '\'''\'';\
  const sourceIp = req.ip;\
\
  logger.info('\''收到 CAS 系统通知'\'', {\
    ip: sourceIp,\
    userAgent: userAgent,\
    data: originalData\
  });\
\
  try {\
    // 处理 CAS 数据结构：数据可能在 data.data.text 或 data.text\
    const messageText = (originalData.data && originalData.data.text) || originalData.text || '\'''\'';\
    const notificationType = originalData.notificationType || '\''系统通知'\'';\
    \
    // 重构数据格式以匹配 CAS 处理器的期望\
    const processedData = {\
      message: messageText,\
      notificationType: notificationType,\
      ...originalData\
    };\
\
    // 根据消息内容路由到不同的处理器\
    if (messageText.includes('\''自动重命名'\'')) {\
      await casHandlers.fileRenamed(processedData);\
    } else if (messageText.includes('\''入库成功'\'')) {\
      await casHandlers.libraryImported(processedData);\
    } else if (messageText.includes('\''STRM文件'\'') || messageText.includes('\''生成STRM文件'\'')) {\
      await casHandlers.strmGenerated(processedData);\
    } else {\
      await casHandlers.genericCAS(processedData);\
    }\
\
    res.json({ \
      status: '\''success'\'', \
      message: '\''CAS 通知处理成功'\'',\
      timestamp: new Date().toISOString()\
    });\
  } catch (error) {\
    logger.error('\''处理 CAS 通知时出错'\'', { error: error.message, data: originalData });\
    res.status(500).json({ \
      error: '\''处理通知时出错'\'',\
      message: error.message \
    });\
  }\
});' /root/emby-dingtalk-notifier/server.js

echo "CAS Webhook 路由替换完成！"
