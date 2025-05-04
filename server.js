// 安装依赖: npm install ws
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3000 });

let clients = [];

wss.on('connection', (ws) => {
    console.log('新客户端连接');
    clients.push(ws);

    ws.on('message', (message) => {
        console.log('收到消息:', message);
        // 转发给其他客户端
        clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('客户端断开');
        clients = clients.filter(c => c !== ws);
    });
});

console.log('信令服务器已启动 ws://localhost:3000');
