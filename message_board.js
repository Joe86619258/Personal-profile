// import { isValidNickname } from "./nickname.js";

submitButton.addEventListener('click', () => {
    const nickname = nickName.value;
    const content = editorArea.value;
    const Htext = modalContent.querySelector('h3');

    // 验证昵称输入
    if (!isValidNickname(nickname)) {
        Htext.textContent = '上传失败';
        modalContentContent.textContent = '昵称格式不正确，请输入长度不超过10字符，由字母开头，字母和数字组成的昵称。';
        modal.classList.add('show');
        modalContent.classList.add('show');
        return;
    }

    // 验证富文本输入框
    if (content.trim() === '') {
        editorArea.classList.add('error');
        Htext.textContent = '上传失败';
        modalContentContent.textContent = '留言内容不能为空，请输入留言内容。';
        modal.classList.add('show');
        modalContent.classList.add('show');
        return;
    } else {
        editorArea.classList.remove('error');
    }

    console.log(content);

    Htext.textContent = '上传成功';
    
    // 根据是否有图片，设置弹窗内容
    if (imagePreview.childElementCount > 0) {
        modalContentContent.textContent = `上传内容为:${content},共上传了${imagePreview.childElementCount}张照片`;
    } else {
        modalContentContent.textContent = `上传内容为:${content}`;
    }

    // 将留言添加到留言区
    const messageBoard = document.querySelector('.default_post_container');
    const newPost = document.createElement('div');
    newPost.classList.add('post_entirety');
    newPost.innerHTML = `
        <div class="post_header">${nickname}<span class="iconfont icon-aixin"></span></div>
        <div class="post_date">${todayDate()}</div>
        <div class="post_content">${content}</div>
        <div class="post_line"></div>
    `;
    const heartIcon = newPost.querySelector('.iconfont');
    heartIcon.addEventListener('click', () => {
        heartIcon.classList.toggle('icon-aixin');
        heartIcon.classList.toggle('icon-aixin-copy'); 
        console.log('已点赞');
    });
    messageBoard.insertBefore(newPost, messageBoard.children[1]);

    modal.classList.add('show');
    modalContent.classList.add('show');
});


// 点击确定按钮关闭弹窗
closeButton.addEventListener('click', () => {
    if(modal.classList.contains('show')){
        modal.classList.remove('show');
        modalContent.classList.remove('show'); 
    }
    // 重置文件上传区域
    resetFileUpload();
});

// 重置按钮点击事件
resetButton.addEventListener('click', () => {
    // 重置文件上传区域
    resetFileUpload();
});

// 添加重置功能
function resetFileUpload() {
    if(nickName.classList.contains('error')){
        nickName.classList.remove('error'); 
        if(nickParent.querySelector('.tips')){
            nickParent.querySelector('.tips').remove();
        }
    }
    if(editorArea.classList.contains('error')){
        editorArea.classList.remove('error');
    }
    if(imagePreview.childElementCount > 0){
        imagePreview.innerHTML = ''; 
    }
    if(editorArea.value !== ''){
        editorArea.value = ''; 
    }
    if(nickName.value!== ''){
        nickName.value = '';
    }
    if(gender!=='male'){
        gender = 'male';
    }
    document.querySelector('#email').value = '';
    replyDate = postDate();
    const dropArea = document.querySelector('#file_drop_area');
    const dropAreaText = dropArea.querySelector('p');

    dropArea.classList.remove('uploading', 'uploaded');
    dropAreaText.textContent = '拖拽文件到此处上传，或点击选择文件';
}

window.onload = function(){
    replyDate = postDate();
}
