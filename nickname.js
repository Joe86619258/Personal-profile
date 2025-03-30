const nickName = document.querySelector('#nickname');
const nickParent = document.querySelector('#nickname').parentElement;
const nicknameRegex = /^[a-zA-Z][a-zA-Z0-9]{0,9}$/;

// 监听昵称输入框的点击事件
nickName.addEventListener('click', () => {
    if(!nickParent.querySelector('.tips')){
        const tips = document.createElement('div');
        tips.classList.add('tips');
        tips.innerHTML = `
            <div class="len"><span class="iconfont icon-dui-copy"></span>长度不超过10位</div>
            <div class="standard"><span class="iconfont icon-dui-copy"></span>只能由字母、数字构成,不能为纯数字,不能以数字开头</div>
        `;
        nickParent.appendChild(tips);
    }else{
        const tips = nickParent.querySelector('.tips');
        tips.style.display = 'block';
        const len = tips.querySelector('.len');
        const standard = tips.querySelector('.standard');
        len.style.display = 'block';
        standard.style.display = 'block';
        isValidNickname(nickName.value);
    }
});

// 监听昵称框的 input 事件
nickName.addEventListener('input', () => {
    isValidNickname(nickName.value);
})

// 监听昵称框的 blur 事件
nickName.addEventListener('blur', () => {
    const tips = nickParent.querySelector('.tips');
    const len = tips.querySelector('.len');
    const standard = tips.querySelector('.standard');
    const lenIcon = len.querySelector('.iconfont');
    const standIcon = standard.querySelector('.iconfont');
    if (tips) {
        const isLengthValid = lenIcon.classList.contains('icon-dui-copy');
        const isStandardValid = standIcon.classList.contains('icon-dui-copy');
        console.log(isLengthValid, isStandardValid);
        if (isLengthValid && isStandardValid) {
            tips.style.display = 'none'; // 若都符合要求，隐藏提示框
        } else {
            if(len){
                len.style.display = isLengthValid ? 'none' : 'block';
            }
            if(standard){
                standard.style.display = isStandardValid? 'none' : 'block'; 
            }
        }
    }
});

//判断输入昵称是否符合要求
function isValidNickname(nickVal) {
    const tips = nickParent.querySelector('.tips');
    const len = tips.querySelector('.len');
    const standard = tips.querySelector('.standard');
    let lenIcon = len.querySelector('.iconfont');
    let standIcon = standard.querySelector('.iconfont');
    if (nickVal !== '') {
        if (!nicknameRegex.test(nickVal)) {
            standard.style.color = '#ff5b5b'  
            standIcon.classList.remove('icon-dui-copy');
            standIcon.classList.add('icon-tishi'); 
        }else{
            standard.style.color = '#549df8'
            standIcon.classList.remove('icon-tishi');
            standIcon.classList.add('icon-dui-copy');
        }
        if (nickName.value.length > 10) {
            len.style.color = '#ff5b5b' 
            lenIcon.classList.remove('icon-dui-copy');
            lenIcon.classList.add('icon-tishi'); 
        }else{
            len.style.color = '#549df8'
            lenIcon.classList.remove('icon-tishi');
            lenIcon.classList.add('icon-dui-copy');
        }
        if (!nicknameRegex.test(nickVal) || nickVal.length > 10) {
            nickName.classList.add('error');
            return false;
        }else{
            nickName.classList.remove('error');
            return true;
        }
    }
}