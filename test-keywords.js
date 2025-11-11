require('dotenv').config();
const axios = require('axios');
const crypto = require('crypto');

const webhookUrl = process.env.DINGTALK_WEBHOOK_URL;
const secret = process.env.DINGTALK_SECRET;

function generateSign(timestamp) {
  const stringToSign = `${timestamp}\n${secret}`;
  const sign = crypto.createHmac('sha256', secret)
    .update(stringToSign)
    .digest('base64');
  return encodeURIComponent(sign);
}

async function testKeyword(keyword) {
  const timestamp = Date.now();
  const sign = generateSign(timestamp);
  const url = `${webhookUrl}&timestamp=${timestamp}&sign=${sign}`;
  
  const payload = {
    msgtype: 'text',
    text: {
      content: `${keyword} 测试消息`
    }
  };

  try {
    const response = await axios.post(url, payload, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 5000
    });
    
    if (response.data.errcode === 0) {
      console.log(`✅ 关键词 "${keyword}" 测试成功`);
      return true;
    } else {
      console.log(`❌ 关键词 "${keyword}" 测试失败: ${response.data.errmsg}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ 关键词 "${keyword}" 测试异常: ${error.message}`);
    return false;
  }
}

// 测试常见的关键词
const commonKeywords = ['Emby', 'emby', '通知', '媒体', 'Media', 'movie', '电影', '视频', '播放'];

async function testAllKeywords() {
  console.log('开始测试关键词...');
  for (const keyword of commonKeywords) {
    const success = await testKeyword(keyword);
    if (success) {
      console.log(`\n🎉 找到正确的关键词: "${keyword}"`);
      return keyword;
    }
    // 延迟一下避免请求过快
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  console.log('\n❌ 未找到正确的关键词，请手动查看钉钉机器人设置');
  return null;
}

testAllKeywords();
