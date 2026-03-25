// === 全局状态 ===
const state = {
    currentLevel: 1,
    currentFilter: 'all',
    keyboardFocusIndex: -1,
    filteredCards: []
};

// === 首屏入场动画 ===
function initEntrance() {
    gsap.to(".slogan", { opacity: 1, y: 0, duration: 1, delay: 0.2 });
    gsap.to(".tags", { opacity: 1, duration: 1, delay: 0.5 });
    gsap.to(".micro-intro", { opacity: 1, duration: 1, delay: 0.7 });
    gsap.to(".action-buttons-group", { opacity: 1, duration: 1, delay: 0.9 });
}

// === Level 过渡 ===
function transitionToLevel2() {
    const flash = document.getElementById('flash-overlay');
    
    gsap.to(flash, { 
        opacity: 1, 
        duration: 0.15,
        onComplete: () => {
            gsap.to(flash, { 
                opacity: 0, 
                duration: 0.3, 
                delay: 0.1
            });
        }
    });
    
    gsap.to("#level1-layer", { 
        opacity: 0, 
        scale: 0.85, 
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
            document.getElementById('level1-layer').style.display = 'none';
            state.currentLevel = 2;
            
            const level2 = document.getElementById('level2-container');
            level2.style.pointerEvents = "auto";
            document.getElementById('back-btn').classList.add('visible');
            
            gsap.to(level2, { opacity: 1, duration: 0.3 });
            animateCardsEntrance();
        }
    });
}

// === 卡片入场动画 ===
function animateCardsEntrance() {
    const cards = document.querySelectorAll('.brutal-card');
    state.filteredCards = Array.from(cards);
    
    gsap.from(cards, {
        scale: 0,
        opacity: 0,
        rotation: () => (Math.random() - 0.5) * 10,
        duration: 0.5,
        stagger: {
            each: 0.08,
            from: "center"
        },
        ease: "back.out(1.7)"
    });
}

// === 返回首屏 ===
function backToLevel1() {
    document.getElementById('back-btn').classList.remove('visible');
    document.getElementById('scroll-top-btn').classList.remove('visible');
    
    // 清除键盘高亮
    state.filteredCards.forEach(card => card.classList.remove('keyboard-focus'));
    state.keyboardFocusIndex = -1;
    
    gsap.to("#level2-container", {
        opacity: 0,
        duration: 0.4,
        onComplete: () => {
            const level2 = document.getElementById('level2-container');
            level2.style.pointerEvents = "none";
            
            const level1 = document.getElementById('level1-layer');
            level1.style.display = 'flex';
            state.currentLevel = 1;
            
            gsap.to(level1, { 
                opacity: 1, 
                scale: 1, 
                duration: 0.5,
                ease: "back.out(1.2)"
            });
        }
    });
}

// === 过滤器逻辑 ===
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            state.currentFilter = btn.getAttribute('data-filter');
            applyFilter(state.currentFilter);
        });
    });
}

function applyFilter(filterValue) {
    const cards = document.querySelectorAll('.brutal-card');
    state.filteredCards = [];
    
    // 清除键盘高亮
    cards.forEach(card => card.classList.remove('keyboard-focus'));
    state.keyboardFocusIndex = -1;
    
    let delay = 0;
    cards.forEach(card => {
        const shouldShow = filterValue === 'all' || 
                          card.getAttribute('data-category') === filterValue;
        
        if (shouldShow) {
            gsap.to(card, { 
                scale: 1, 
                opacity: 1, 
                rotation: 0,
                duration: 0.4,
                delay: delay,
                ease: "back.out(1.5)",
                onStart: () => { card.style.display = 'flex'; }
            });
            state.filteredCards.push(card);
            delay += 0.05;
        } else {
            gsap.to(card, { 
                scale: 0.8, 
                opacity: 0, 
                rotation: (Math.random() - 0.5) * 20,
                duration: 0.3,
                onComplete: () => { card.style.display = 'none'; }
            });
        }
    });
}

// === 键盘导航 ===
function initKeyboardNav() {
    document.addEventListener('keydown', (e) => {
        if (state.currentLevel !== 2) return;
        
        // 终端打开时的处理
        if (document.getElementById('terminal-overlay').classList.contains('active')) {
            if (e.key === 'Escape') {
                closeTerminal();
                e.preventDefault();
            }
            return;
        }
        
        switch(e.key) {
            case 'ArrowLeft':
                navigateFilter(-1);
                e.preventDefault();
                break;
            case 'ArrowRight':
                navigateFilter(1);
                e.preventDefault();
                break;
            case 'ArrowUp':
                navigateCards(-1);
                e.preventDefault();
                break;
            case 'ArrowDown':
                navigateCards(1);
                e.preventDefault();
                break;
            case 'Enter':
                activateCurrentCard();
                e.preventDefault();
                break;
            case 'Escape':
                backToLevel1();
                break;
        }
    });
}

function navigateFilter(direction) {
    const btns = Array.from(document.querySelectorAll('.filter-btn'));
    const currentIndex = btns.findIndex(b => b.classList.contains('active'));
    let newIndex = currentIndex + direction;
    
    if (newIndex < 0) newIndex = btns.length - 1;
    if (newIndex >= btns.length) newIndex = 0;
    
    btns[newIndex].click();
    btns[newIndex].focus();
}

function navigateCards(direction) {
    const cards = state.filteredCards;
    if (cards.length === 0) return;
    
    // 移除旧高亮
    if (state.keyboardFocusIndex >= 0 && cards[state.keyboardFocusIndex]) {
        cards[state.keyboardFocusIndex].classList.remove('keyboard-focus');
    }
    
    // 计算新索引
    state.keyboardFocusIndex += direction;
    if (state.keyboardFocusIndex < 0) state.keyboardFocusIndex = cards.length - 1;
    if (state.keyboardFocusIndex >= cards.length) state.keyboardFocusIndex = 0;
    
    // 添加新高亮并滚动
    const currentCard = cards[state.keyboardFocusIndex];
    currentCard.classList.add('keyboard-focus');
    currentCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function activateCurrentCard() {
    if (state.keyboardFocusIndex >= 0 && state.filteredCards[state.keyboardFocusIndex]) {
        const card = state.filteredCards[state.keyboardFocusIndex];
        
        // 触发点击动画
        gsap.to(card, {
            scale: 0.95,
            x: 10,
            y: 10,
            duration: 0.05,
            onComplete: () => {
                gsap.to(card, {
                    scale: 1,
                    x: 0,
                    y: 0,
                    duration: 0.15,
                    ease: "elastic.out(1, 0.3)"
                });
            }
        });
        
        // 标签闪烁
        const tag = card.querySelector('.card-tag');
        if (tag) {
            gsap.fromTo(tag, 
                { opacity: 0.5 }, 
                { opacity: 1, duration: 0.3, yoyo: true, repeat: 1 }
            );
        }
    }
}

// === 终端彩蛋 ===
function openTerminal() {
    const overlay = document.getElementById('terminal-overlay');
    const terminalBox = overlay.querySelector('.terminal-box');
    
    overlay.classList.add('active');
    gsap.from(terminalBox, { 
        scale: 0.8, 
        opacity: 0, 
        duration: 0.3,
        ease: "back.out(1.5)"
    });
    
    const input = document.getElementById('terminal-input');
    input.textContent = '';
    
    setTimeout(() => {
        input.focus();
    }, 100);
    
    // 清除旧的事件监听
    input.onkeydown = null;
    
    input.addEventListener('keydown', function handler(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            checkPassword(input.textContent.trim());
        }
    });
}

function closeTerminal() {
    const overlay = document.getElementById('terminal-overlay');
    const terminalBox = overlay.querySelector('.terminal-box');
    
    gsap.to(terminalBox, { 
        scale: 0.8, 
        opacity: 0, 
        duration: 0.2,
        onComplete: () => {
            overlay.classList.remove('active');
            gsap.set(terminalBox, { scale: 1, opacity: 1 });
        }
    });
}

function checkPassword(pwd) {
    const input = document.getElementById('terminal-input');
    
    if (pwd === 'carbon4') {
        // 成功动画
        const terminalBox = document.querySelector('.terminal-box');
        gsap.to(terminalBox, {
            borderColor: '#00ff00',
            boxShadow: '0 0 30px #00ff00',
            duration: 0.3,
            onComplete: () => {
                closeTerminal();
                setTimeout(celebrateUnlock, 300);
            }
        });
    } else if (pwd.length > 0) {
        // 错误动画
        gsap.to(input, { 
            x: -10, 
            duration: 0.05,
            onComplete: () => {
                gsap.to(input, { x: 10, duration: 0.05 });
                gsap.to(input, { x: -10, duration: 0.05 });
                gsap.to(input, { x: 10, duration: 0.05 });
                gsap.to(input, { x: 0, duration: 0.05 });
            }
        });
        
        // 清空输入
        gsap.to({}, {
            duration: 0.3,
            onComplete: () => { input.textContent = ''; }
        });
    }
}

function celebrateUnlock() {
    // 粒子爆炸效果
    const colors = ['#FFDE00', '#111', '#fff', '#00ff00'];
    
    for (let i = 0; i < 60; i++) {
        createParticle(colors[i % colors.length]);
    }
    
    // 全屏闪光
    const flash = document.getElementById('flash-overlay');
    flash.style.background = '#FFDE00';
    gsap.to(flash, {
        opacity: 0.3,
        duration: 0.1,
        onComplete: () => {
            gsap.to(flash, { opacity: 0, duration: 0.5 });
        }
    });
}

function createParticle(color) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 15 + 5;
    particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border: 2px solid #111;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    `;
    
    document.body.appendChild(particle);
    
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 400 + 200;
    const duration = Math.random() * 0.5 + 0.5;
    
    gsap.to(particle, {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        rotation: Math.random() * 720 - 360,
        opacity: 0,
        scale: 0,
        duration: duration,
        ease: "power2.out",
        onComplete: () => particle.remove()
    });
}

// === 滚动按钮 ===
function initScrollButton() {
    const btn = document.getElementById('scroll-top-btn');
    const viewport = document.querySelector('.multiverse-viewport');
    
    if (!viewport) return;
    
    viewport.addEventListener('scroll', () => {
        if (viewport.scrollTop > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });
    
    btn.addEventListener('click', () => {
        viewport.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// === 卡片机械轴交互 ===
function initCardInteraction() {
    const cards = document.querySelectorAll('.brutal-card');
    
    cards.forEach(card => {
        card.addEventListener('mousedown', (e) => {
            // 防止与键盘导航冲突
            if (state.keyboardFocusIndex >= 0) {
                state.filteredCards.forEach(c => c.classList.remove('keyboard-focus'));
                const index = state.filteredCards.indexOf(card);
                if (index >= 0) state.keyboardFocusIndex = index;
            }
            
            gsap.to(card, {
                scale: 0.98,
                x: 10,
                y: 10,
                duration: 0.05,
                ease: "power2.inOut"
            });
        });
        
        const releaseCard = () => {
            gsap.to(card, {
                scale: 1,
                x: 0,
                y: 0,
                duration: 0.15,
                ease: "elastic.out(1, 0.3)"
            });
        };
        
        card.addEventListener('mouseup', releaseCard);
        card.addEventListener('mouseleave', releaseCard);
        
        // 触摸支持
        card.addEventListener('touchstart', () => {
            gsap.to(card, {
                scale: 0.98,
                x: 10,
                y: 10,
                duration: 0.05
            });
        });
        
        card.addEventListener('touchend', releaseCard);
        
        // 点击反馈
        card.addEventListener('click', () => {
            const tag = card.querySelector('.card-tag');
            if (tag) {
                gsap.fromTo(tag, 
                    { opacity: 0.5 }, 
                    { opacity: 1, duration: 0.3, yoyo: true, repeat: 1 }
                );
            }
        });
    });
}

// === 侧边栏密码锁 ===
function initEasterEgg() {
    const lock = document.getElementById('easter-egg-lock-side');
    
    lock.addEventListener('click', openTerminal);
    
    // hover 效果
    lock.addEventListener('mouseenter', () => {
        gsap.to(lock, { scale: 1.05, duration: 0.2 });
    });
    
    lock.addEventListener('mouseleave', () => {
        gsap.to(lock, { scale: 1, duration: 0.2 });
    });
}

// === 初始化 ===
document.addEventListener('DOMContentLoaded', () => {
    // 初始化各模块
    initEntrance();
    initFilters();
    initKeyboardNav();
    initScrollButton();
    initCardInteraction();
    initEasterEgg();
    
    // 绑定主要按钮事件
    document.getElementById('explore-btn').addEventListener('click', transitionToLevel2);
    document.getElementById('back-btn').addEventListener('click', backToLevel1);
    
    // 点击终端背景关闭
    document.getElementById('terminal-overlay').addEventListener('click', (e) => {
        if (e.target.id === 'terminal-overlay') {
            closeTerminal();
        }
    });
});
