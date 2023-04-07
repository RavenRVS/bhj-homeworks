const chatWidget = document.querySelector('.chat-widget');
const chatInput = document.getElementById('chat-widget__input');
const messages = document.querySelector( '.chat-widget__messages' );
let botMessageList = [
    'Мы ещё не проснулись. Позвоните через 10 лет',
    'Сейчас все операторы заняты. Закройте, пожалуйста, чат',
    'Ваше сообщение важно для нас. Возможно, мы ответим вам позже',
    'Технический перерыв. Постарайтесь нас не тревожить',
    'Мы приняли ваше обращение. Если не ответим, повторите его позже',
    'Нам не нравится ваше сообщение. Пожалуйста, перефразируйте его'
];
const messageForLongIdle = 'Хватит тратить наше время! Либо пиши, либо закрой чат';

function formMessageUser (textMessage) {
    const sendTime = new Date()
    const hours = sendTime.getHours();
    const mins = sendTime.getMinutes();
    return `
    <div class="message message_client">
        <div class="message__time">${("0"+hours).slice(-2)}:${("0"+mins).slice(-2)}</div>
        <div class="message__text">
        ${ textMessage }
        </div>
    </div>
    `
}; 

function formMessageBot (message) {
    const sendTime = new Date()
    const hours = sendTime.getHours();
    const mins = sendTime.getMinutes();
    return `
    <div class="message">
        <div class="message__time">${("0"+hours).slice(-2)}:${("0"+mins).slice(-2)}</div>
        <div class="message__text">
        ${ message }
        </div>
    </div>
    `
};

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function sendMessage(textMessage) {
    messages.innerHTML +=formMessageUser(textMessage);
    showLastMessage()
    setTimeout(() => {
        let botMessage = botMessageList[getRandomInt(botMessageList.length)] 
        messages.innerHTML +=formMessageBot(botMessage);
        showLastMessage()
    }, 1000)
};

function showLastMessage() {
    let lastMessage = messages.querySelectorAll('.message')
    lastMessage[lastMessage.length - 1].scrollIntoView(false);
}

chatWidget.addEventListener('click', () => {
    chatWidget.classList.add('chat-widget_active');
    idleControl()
});

chatInput.addEventListener('keydown', (e) => {
    if (e.code == 'Enter' && chatInput.value.trim() !== '') {
        sendMessage(chatInput.value.trim());
        chatInput.value = '';
    }
})

function idleControl () { 
    if (chatWidget.classList.contains('chat-widget_active')) {
        let messageListLength = messages.querySelectorAll('.message').length
        setTimeout(() => {
            let currentLength = messages.querySelectorAll('.message').length
            if (messageListLength == currentLength) {
                messages.innerHTML +=formMessageBot(messageForLongIdle);
                showLastMessage();
            }
            idleControl()
        }, 30000);
    }
};