// 获取canvas元素
const canvas = document.getElementById('clockCanvas');

// 获取一个2D渲染上下文对象，用于在HTML的<canvas>元素上进行绘图操作。
const ctx = canvas.getContext('2d');

// 设置时钟半径
const radius = canvas.width / 2;

function drawClock() {
    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制表盘
    ctx.beginPath();
    ctx.arc(radius, radius, radius-1, 0, 2 * Math.PI);
    // 设置描边颜色为深灰色
    ctx.strokeStyle = '#fff';
    // 设置线宽为2px
    ctx.lineWidth = 2;
    // 描边绘制圆形
    ctx.stroke();

    // 获取当前时间
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();

    // 绘制时针
    drawHand(hour * 30 + minute * 0.5, radius * 0.5, 4, '#08ff00');

    // 绘制分针
    drawHand(minute * 6, radius * 0.7, 3, '#fff');

    // 绘制秒针
    drawHand(second * 6, radius * 0.9, 2, '#f00');
}

function drawHand(angle, length, width, color) {
    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate(-90 * Math.PI / 180);
    ctx.rotate(angle * Math.PI / 180);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(length, 0);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.restore();
}

// 每秒更新一次时钟
setInterval(drawClock, 1000);

// 立即绘制初始时钟
drawClock();
