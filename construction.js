//显示导航正在施工
// 获取所有带有 .navigation 类的元素
let btns = document.querySelectorAll('a[href="#"]');
let alertEl = document.querySelector(".alert");

// 遍历所有 .navigation 元素并为其添加点击事件监听器
btns.forEach(function(btn) {
    btn.onclick = function () {
        alertEl.style.display = 'flex';
        setTimeout(close_alert, 2000);
    };
});

//关闭弹框
function close_alert() {
    alertEl.style.display = 'none';
}