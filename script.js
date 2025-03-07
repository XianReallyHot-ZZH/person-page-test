// 初始化AOS动画库
AOS.init({
    duration: 1000,
    once: true
});

// 初始化Swiper轮播图
const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// AI聊天功能
class AIChat {
    constructor() {
        this.modal = document.querySelector('.ai-chat-modal');
        this.messagesContainer = document.querySelector('.chat-messages');
        this.input = document.querySelector('.chat-input textarea');
        this.sendButton = document.querySelector('.send-message');
        this.closeButton = document.querySelector('.close-chat');
        this.voiceButton = document.querySelector('.voice-input');
        this.chatButtons = document.querySelectorAll('.ai-chat-btn');
        
        this.messages = [];
        this.isProcessing = false;

        this.bindEvents();
    }

    bindEvents() {
        // 打开聊天窗口
        this.chatButtons.forEach(btn => {
            btn.addEventListener('click', () => this.openChat());
        });

        // 关闭聊天窗口
        this.closeButton.addEventListener('click', () => this.closeChat());

        // 发送消息
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // 语音输入
        this.voiceButton.addEventListener('click', () => this.startVoiceInput());
    }

    openChat() {
        this.modal.style.display = 'block';
        this.input.focus();
    }

    closeChat() {
        this.modal.style.display = 'none';
    }

    async sendMessage() {
        if (this.isProcessing) return;

        const message = this.input.value.trim();
        if (!message) return;

        this.addMessage(message, 'user');
        this.input.value = '';
        
        // 显示加载动画
        this.isProcessing = true;
        this.showTypingIndicator();

        // 模拟AI响应
        await this.simulateAIResponse(message);
    }

    addMessage(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        messageDiv.textContent = content;
        
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
        
        this.messages.push({ content, type });
    }

    showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'message ai-message typing-indicator';
        indicator.innerHTML = '<span class="loading"></span>';
        this.messagesContainer.appendChild(indicator);
        this.scrollToBottom();
    }

    removeTypingIndicator() {
        const indicator = this.messagesContainer.querySelector('.typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    async simulateAIResponse(userMessage) {
        // 模拟AI思考时间
        await new Promise(resolve => setTimeout(resolve, 1000));

        this.removeTypingIndicator();
        
        // 模拟AI回复
        const responses = [
            "我明白你的意思了。让我想想...",
            "这是一个很好的问题！",
            "根据我的理解...",
            "让我为你解释一下...",
        ];
        
        const response = responses[Math.floor(Math.random() * responses.length)];
        
        // 使用打字机效果显示回复
        await this.typeMessage(response);
        
        this.isProcessing = false;
    }

    async typeMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message ai-message';
        this.messagesContainer.appendChild(messageDiv);

        for (let i = 0; i < text.length; i++) {
            messageDiv.textContent += text[i];
            await new Promise(resolve => setTimeout(resolve, 30));
            this.scrollToBottom();
        }
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    startVoiceInput() {
        if (!('webkitSpeechRecognition' in window)) {
            alert('抱歉，你的浏览器不支持语音输入功能。');
            return;
        }

        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'zh-CN';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = (event) => {
            const text = event.results[0][0].transcript;
            this.input.value = text;
        };

        recognition.start();
    }
}

// 返回顶部按钮
function handleBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 导航栏滚动效果
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.style.transform = 'translateY(0)';
            return;
        }

        if (currentScroll > lastScroll) {
            // 向下滚动
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });
}

// 平滑滚动
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
    const chat = new AIChat();
    handleBackToTop();
    handleNavbarScroll();
    initSmoothScroll();
}); 