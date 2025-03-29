//实时日期
function todayDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const currentDate = date.getDate();
    const now = `${year}年${month}月${currentDate}日`;
    return now;
}

//今日日期
function postDate() {
    const postDate = document.querySelector('.post_date');
    postDate.innerHTML = todayDate();
    setTimeout("postDate()", 86400000);
}

postDate();

// 获取文件上传区域和图片预览区域
const fileDropArea = document.querySelector('#file_drop_area');
const imagePreview = document.querySelector('#image_preview');

// 阻止默认的拖拽行为
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    fileDropArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    // 用于阻止事件冒泡，防止事件传播到其他元素。
    e.stopPropagation();
}

// 监听文件上传区域的 drop 事件
fileDropArea.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;

    handleFiles(files);
}

// 监听文件选择框的 change 事件
const fileUpload = document.querySelector('#file_upload');

fileUpload.addEventListener('change', function () {
    handleFiles(this.files);
});

function handleFiles(files) {
    let successAmount = 0;
    const dropArea = document.querySelector('#file_drop_area');
    const dropAreaText = dropArea.querySelector('p');

    // 添加上传中的状态
    dropArea.classList.add('uploading');
    dropAreaText.textContent = '文件上传中...';

    // 遍历文件列表，判断文件类型并进行预览
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (isValidFileType(file)) {
            successAmount++;
            previewFile(file);
        }
    }

    // 移除上传中的状态，添加上传完成的状态
    dropArea.classList.remove('uploading');
    dropArea.classList.add('uploaded');

    // 更新文本内容
    if (successAmount === files.length) {
        dropAreaText.textContent = `${successAmount} 张照片全部上传成功!`;
    } else if (successAmount !== files.length && successAmount > 0) {
        dropAreaText.textContent = `成功上传${successAmount}张照片,
        ${files.length - successAmount}张照片上传失败!`;
    } else {
        dropAreaText.textContent = `上传失败!`;
        dropArea.classList.remove('uploaded');
    }

    // 重置 #file_upload 输入框
    const fileUpload = document.getElementById('file_upload');
    fileUpload.value = '';
}

// 判断照片类型
function isValidFileType(file) {
    const validTypes = ['image/jpeg', 'image/png'];
    return validTypes.includes(file.type);
}

// 预览图片
function previewFile(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    // 当文件读取完成时，创建一个 Image 对象并设置其 src 属性为文件的 Data URL。
    reader.onloadend = function () {
        const img = new Image();
        img.src = reader.result;

        img.onload = function () {
            const width = img.width;
            const height = img.height;
            const size = (file.size / 1024).toFixed(2); // 转换为 KB 并保留两位小数

            const previewItem = document.createElement('div');
            previewItem.classList.add('preview_item');
            previewItem.draggable = true;
            // 为 previewItem 设置唯一的 id
            previewItem.id = `preview_${Date.now()}`;

            previewItem.innerHTML = `
                <img src = "${reader.result}">
                <div class="preview_info">
                    <div>文件名:${file.name}</div>
                    <div>大小:${size}</div>
                    <div>尺寸:${width} &times; ${height}</div>
                </div>
            `;

            imagePreview.appendChild(previewItem);

            // 监听拖拽开始事件
            previewItem.addEventListener('dragstart', (e) => {
                // 当开始拖拽时，将 previewItem 的 id 存储到 e.dataTransfer 中。
                e.dataTransfer.setData('text/plain', previewItem.id);
            });
        };
    };
}

// 监听图片预览区域的 dragover 和 drop 事件
document.addEventListener('dragover', (e) => {
    // 当拖拽目标在 document 上时，阻止默认行为，即可重叠。
    e.preventDefault();
});

// 监听图片预览区域的 drop 事件
document.addEventListener('drop', (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    const item = document.getElementById(data);
    const rect = item.querySelector('img').getBoundingClientRect();
    const isOutside = (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
    );
    if (item && isOutside) {
        imagePreview.removeChild(item);
    }
});

const submitButton = document.querySelector('#submit_message');
const editorArea = document.querySelector('#editorArea');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal_content');
const modalContentContent = modalContent.querySelector('p');
const nicknameInput = document.querySelector('#nickname');
const resetButton = document.querySelector('#reset_message');

submitButton.addEventListener('click', () => {
    const nickname = nicknameInput.value;
    const content = editorArea.value;
    const Htext = modalContent.querySelector('h3');
    const nicknameRegex = /^[a-zA-Z][a-zA-Z0-9]{0,9}$/;

    // 验证昵称输入
    if (!nicknameRegex.test(nickname)) {
        nicknameInput.classList.add('error');
        Htext.textContent = '上传失败';
        modalContentContent.textContent = '昵称格式不正确，请输入长度不超过10字符，由字母开头，字母和数字组成的昵称。';
        modal.classList.add('show');
        modalContent.classList.add('show');
        return;
    } else {
        nicknameInput.classList.remove('error');
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
    const messageBoard = document.querySelector('.default_post');
    const newPost = document.createElement('div');
    newPost.classList.add('post');
    newPost.innerHTML = `
        <div class="post_header">
            <h2>${nickname}</h2>
            <span class="post_date">${todayDate()}</span>
        </div>
        <div class="post_content">
            <p>${content}</p>
        </div>
    `;
    messageBoard.insertBefore(newPost, messageBoard.children[1]);

    modal.classList.add('show');
    modalContent.classList.add('show');
});


// 点击确定按钮关闭弹窗
const closeButton = modalContent.querySelector('button');
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

const gender = document.querySelector('#gender').value;
const replyDate = document.querySelector('#reply_date').value;
// 添加重置功能
function resetFileUpload() {
    if(nicknameInput.classList.contains('error')){
        nicknameInput.classList.remove('error'); 
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
    if(nicknameInput.value!== ''){
        nicknameInput.value = '';
    }
    if(gender!=='male'){
        gender = 'male';
    }
    document.querySelector('#email').value = '';
    if(replyDate!==''){
        replyDate = postDate();
    }
    const dropArea = document.querySelector('#file_drop_area');
    const dropAreaText = dropArea.querySelector('p');

    dropArea.classList.remove('uploading', 'uploaded');
    dropAreaText.textContent = '拖拽文件到此处上传，或点击选择文件';
}

Window.onload = function(){
    replyDate = postDate();
}
