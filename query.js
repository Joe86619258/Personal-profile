const submitButton = document.querySelector('#submit_message');
const editorArea = document.querySelector('#editorArea');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal_content');
const modalContentContent = modalContent.querySelector('p');
// const nickName = document.querySelector('#nickname');
const resetButton = document.querySelector('#reset_message');

const closeButton = modalContent.querySelector('button');

let gender = document.querySelector('#gender').value;

let replyDate = document.querySelector('#reply_date').value;