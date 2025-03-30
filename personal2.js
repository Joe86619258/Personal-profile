let disptimeText;
const max_threshold = 800;
const min_threshold = 600;
//获取disptime元素
const disptime = document.querySelector('#disptime');
// 获取 record-container 元素
const recordContainer = document.querySelector('#recordContainer');

//实时时间
function currentTime() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const currentDate = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const now = `${year}年${month}月${currentDate}日 ${hours}:${minutes}:${seconds}`;
    return now;
}

//计算距离下一个元旦还有几天
function disp_time() {
    const date = new Date();
    const year = date.getFullYear();
    const now = currentTime();
    const diffDays = Math.floor((new Date(year + 1, 0, 1) - new Date()) / 86400000);
    const month = date.getMonth();
    const day = date.getDay();
    // 获取 disptime 元素
    if (window.innerWidth < min_threshold) {
        disptimeText = `${year}年${month+1}月${day}日`;
    } else if (window.innerWidth < max_threshold) {
        disptimeText = now;
    } else {
        disptimeText = `${now} 距${year+1}年元旦还有${diffDays}天`;
    }
    disptime.innerHTML = disptimeText;
    setTimeout("disp_time()", 1000);
}

//点赞拉踩,更改按钮样式,并弹窗
function comment(id_name) {
    const element = document.getElementById(id_name);
    let current_Time = currentTime();
    let content = `游客在${current_Time}留下了一个`;
    //点赞/拉踩
    if (element.classList.toggle('active')) {
        element.style.backgroundColor = id_name === 'like' ? '#f6c428' : '#7e85b4';
        content += id_name === 'like' ? "点赞" : "踩";
        // 创建一个新的 p 元素来显示信息
        let p = document.createElement('p');
        p.textContent = content;
        // 将新的 p 元素添加到 record-container 中
        recordContainer.prepend(p);
        checkRecordContainerVisibility();
        alert(content);
        setTimeout(()=>{
            //点赞/拉踩消失
            element.classList.toggle('active');
            element.style.backgroundColor = '#a5a4a4';
        },2000);
        // // 设置 5 秒的定时器，时间到了就移除 p 元素
        // setTimeout(() => {
        //     recordContainer.removeChild(p);
        //     checkRecordContainerVisibility();
        // }, 5000);
    }else{
        //取消点赞/拉踩
        element.classList.toggle('active');
        element.style.backgroundColor = '#a5a4a4';
    }
}

// 检查 recordContainer 中是否有 p 元素并控制其显示
function checkRecordContainerVisibility() {
    if (recordContainer) {
        // 检查记录数量，超过 5 条则删除最老的记录
        const records = recordContainer.children;
        if(records.length===0){
            recordContainer.style.display = 'none';
        }else{
            recordContainer.style.display = 'block';
            if (records.length > 5) {
                recordContainer.removeChild(records[records.length - 1]);
            }
        }
    }
}

// 页面加载完成时检查
window.addEventListener('load', checkRecordContainerVisibility);

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

disp_time();
