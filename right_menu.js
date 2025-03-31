// 选择自定义右键菜单
const rightMenu = document.getElementById('right_menu');
const deleteItem = document.getElementById('delete_item');
const addItem = document.getElementById('add_item');
const messageBoard = document.querySelector('.default_post_container');
const pinnedMessageBoard = document.querySelector('.pinned_post_container');

let currentSelectedPost = null;

// 清除选中状态
function clearSelection() {
    if (currentSelectedPost) {
        currentSelectedPost.style.backgroundColor = '';
        currentSelectedPost = null;
    }
    rightMenu.style.display = 'none';
}

function removePost(post) {
    if(messageBoard.contains(post)){
        messageBoard.removeChild(post);
    }else if(pinnedMessageBoard.contains(post)){
        pinnedMessageBoard.removeChild(post);
    }
    clearSelection();
}

function add(post) {
    console.log(post);
    if(messageBoard.contains(post)){
        messageBoard.removeChild(post);
        pinnedMessageBoard.insertBefore(post, pinnedMessageBoard.firstChild);
    }else if(pinnedMessageBoard.contains(post)){
        pinnedMessageBoard.removeChild(post);
        messageBoard.insertBefore(post, messageBoard.firstChild);
    }
    clearSelection();
}

// 处理菜单项点击
function handleMenuItemClick(action) {
    if (currentSelectedPost) {
        action(currentSelectedPost);
    } else {
        console.log('没有选中的元素');
    }
}

// 监听删除选项的点击事件
deleteItem.addEventListener('click', function (e) {
    e.stopPropagation(); // 阻止事件冒泡
    handleMenuItemClick(removePost);
});

// 监听添加到置顶选项的点击事件
addItem.addEventListener('click', function (e) {
    e.stopPropagation(); // 阻止事件冒泡
    handleMenuItemClick(add);
});

// 监听.post_entirety 元素的右键点击事件
document.addEventListener('contextmenu', function (e) {
    const post = e.target.closest('.post_entirety');
    if (post) {
        e.preventDefault(); // 阻止默认右键菜单
        // 清除之前选中的元素
        clearSelection();

        currentSelectedPost = post;

        post.style.backgroundColor = '#bbb'; // 临时改变背景颜色

        // 显示自定义右键菜单
        rightMenu.style.display = 'block';
        rightMenu.style.left = e.pageX + 'px';
        rightMenu.style.top = e.pageY + 'px';
        addItem.textContent = messageBoard.contains(post) ? '添加到置顶留言' : '添加到默认留言';
    } else {
        clearSelection();
    }
});

// 监听点击事件，隐藏右键菜单
document.addEventListener('click', function (e) {
    if (!e.target.closest('#right_menu')) {
        clearSelection();
    }
});

