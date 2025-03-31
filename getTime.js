//实时日期
function todayDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const currentDate = date.getDate();
    let now;
    now = `${year}年${month}月${currentDate}日`;
    return now;
}

//今日日期
function postDate() {
    const postDate = document.querySelector('.post_date');
    postDate.innerHTML = todayDate();
    setTimeout("postDate()", 86400000);
}

postDate();