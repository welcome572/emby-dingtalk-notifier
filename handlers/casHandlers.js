// handlers/casHandlers.js
const { sendDingTalkMessage } = require('./dingtalkHandler');

/**
 * 处理文件重命名事件
 */
const fileRenamed = async (data) => {
    try {
        console.log('处理文件重命名通知:', data);
        
        const message = {
            msgtype: 'markdown',
            markdown: {
                title: '📝 文件重命名完成',
                text: `### 📝 文件重命名完成\n\n**详情:**\n${data.text || '无详细信息'}\n\n**时间:** ${new Date().toLocaleString()}`
            }
        };
        
        return await sendDingTalkMessage(message);
    } catch (error) {
        console.error('处理文件重命名时出错:', error);
        throw error;
    }
};

/**
 * 处理 STRM 文件生成事件
 */
const strmGenerated = async (data) => {
    try {
        console.log('处理STRM文件生成通知:', data);
        
        const message = {
            msgtype: 'markdown',
            markdown: {
                title: '🎯 STRM文件生成完成',
                text: `### 🎯 STRM文件生成完成\n\n**详情:**\n${data.text || '无详细信息'}\n\n**时间:** ${new Date().toLocaleString()}`
            }
        };
        
        return await sendDingTalkMessage(message);
    } catch (error) {
        console.error('处理STRM文件生成时出错:', error);
        throw error;
    }
};

/**
 * 处理媒体库导入事件
 */
const libraryImported = async (data) => {
    try {
        console.log('处理媒体库导入通知:', data);
        
        const message = {
            msgtype: 'markdown',
            markdown: {
                title: '📦 媒体库导入成功',
                text: `### 📦 媒体库导入成功\n\n**详情:**\n${data.text || '无详细信息'}\n\n**时间:** ${new Date().toLocaleString()}`
            }
        };
        
        return await sendDingTalkMessage(message);
    } catch (error) {
        console.error('处理媒体库导入时出错:', error);
        throw error;
    }
};

/**
 * 处理下载完成事件
 */
const downloadCompleted = async (data) => {
    try {
        console.log('处理下载完成通知:', data);
        
        const message = {
            msgtype: 'markdown',
            markdown: {
                title: '✅ 下载完成',
                text: `### ✅ 下载完成\n\n**详情:**\n${data.text || '无详细信息'}\n\n**时间:** ${new Date().toLocaleString()}`
            }
        };
        
        return await sendDingTalkMessage(message);
    } catch (error) {
        console.error('处理下载完成时出错:', error);
        throw error;
    }
};

/**
 * 处理刮削完成事件
 */
const scrapingCompleted = async (data) => {
    try {
        console.log('处理刮削完成通知:', data);
        
        const message = {
            msgtype: 'markdown',
            markdown: {
                title: '🎬 元数据刮削完成',
                text: `### 🎬 元数据刮削完成\n\n**详情:**\n${data.text || '无详细信息'}\n\n**时间:** ${new Date().toLocaleString()}`
            }
        };
        
        return await sendDingTalkMessage(message);
    } catch (error) {
        console.error('处理刮削完成时出错:', error);
        throw error;
    }
};

/**
 * 处理识别完成事件
 */
const identificationCompleted = async (data) => {
    try {
        console.log('处理识别完成通知:', data);
        
        const message = {
            msgtype: 'markdown',
            markdown: {
                title: '🔍 内容识别完成',
                text: `### 🔍 内容识别完成\n\n**详情:**\n${data.text || '无详细信息'}\n\n**时间:** ${new Date().toLocaleString()}`
            }
        };
        
        return await sendDingTalkMessage(message);
    } catch (error) {
        console.error('处理识别完成时出错:', error);
        throw error;
    }
};

/**
 * 默认处理器
 */
const defaultHandler = async (data) => {
    try {
        console.log('处理默认CAS通知:', data);
        
        const message = {
            msgtype: 'markdown',
            markdown: {
                title: '📢 系统通知',
                text: `### 📢 系统通知\n\n**详情:**\n${data.text || '无详细信息'}\n\n**时间:** ${new Date().toLocaleString()}`
            }
        };
        
        return await sendDingTalkMessage(message);
    } catch (error) {
        console.error('处理默认通知时出错:', error);
        throw error;
    }
};

// 导出所有处理器
module.exports = {
    fileRenamed,
    strmGenerated,
    libraryImported,
    downloadCompleted,
    scrapingCompleted,
    identificationCompleted,
    defaultHandler
};
