// handlers/dingtalkHandler.js
const axios = require('axios');

/**
 * 发送钉钉消息
 */
async function sendDingTalkMessage(message) {
    try {
        // 从环境变量获取钉钉webhook地址
        const webhookUrl = process.env.DINGTALK_WEBHOOK;
        
        if (!webhookUrl) {
            throw new Error('钉钉webhook地址未配置');
        }

        console.log('准备发送钉钉消息到:', webhookUrl);
        console.log('消息内容:', JSON.stringify(message, null, 2));

        const response = await axios.post(webhookUrl, message, {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 10000 // 10秒超时
        });

        if (response.data.errcode !== 0) {
            throw new Error(`钉钉API返回错误: ${response.data.errmsg}`);
        }

        console.log('钉钉消息发送成功');
        return response.data;
    } catch (error) {
        console.error('发送钉钉消息失败:', error.message);
        if (error.response) {
            console.error('响应状态:', error.response.status);
            console.error('响应数据:', error.response.data);
        }
        throw error;
    }
}

module.exports = {
    sendDingTalkMessage
};
