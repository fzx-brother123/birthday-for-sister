// 给姐姐的生日礼物 - JavaScript交互代码（完整版）

// 全局变量
let fireworkLevel = 1;
let isPlayingMusic = false;
let hasDecrypted = false; // 标记是否已解密
let isTyping = false; // 标记是否正在打字
let typingComplete = false; // 标记打字是否完成

// 等待页面完全加载
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎉 生日礼物页面加载完成！');
    
    // 初始化所有功能
    initLoadingAnimation();
    initCountdown();
    initDecryption();
    initEffects();
    initWishes();
    initNavigation();
    initFireworkUpgrade();
    initKeyboardShortcuts();
    initTypingAnimation();
    
    // 页面完全加载后显示内容
    setTimeout(() => {
        document.getElementById('loading').classList.add('fade-out');
        setTimeout(() => {
            document.getElementById('loading').style.display = 'none';
            // 自动尝试播放音乐
            setTimeout(tryAutoPlayMusic, 1000);
        }, 500);
    }, 2000);
    
    // 控制台欢迎信息
    console.log('%c🎂 姐姐生日快乐！ 🎂', 'color: #ff6b8b; font-size: 20px; font-weight: bold;');
    console.log('%c这是弟弟用代码制作的生日礼物，每一行都代表我的祝福！', 'color: #6b48ff; font-size: 14px;');
    console.log('%c❤️ 永远爱你的弟弟 ❤️', 'color: #ff6b8b; font-size: 16px; font-weight: bold;');
});

// ==================== 功能函数 ====================

// 1. 加载动画
function initLoadingAnimation() {
    console.log('初始化加载动画');
}

// 2. 倒计时
function initCountdown() {
    const secondsElement = document.getElementById('seconds');
    let seconds = 3;
    
    const countdownInterval = setInterval(() => {
        seconds--;
        secondsElement.textContent = seconds;
        
        if (seconds <= 0) {
            clearInterval(countdownInterval);
            secondsElement.textContent = '0';
            
            // 倒计时结束后显示提示
            setTimeout(() => {
                document.querySelector('.countdown-box').innerHTML = `
                    <h3><i class="fas fa-check-circle"></i> 生日祝福已就绪！</h3>
                    <p>向下滚动查看完整祝福</p>
                `;
                document.querySelector('.countdown-box').classList.add('fade-in');
            }, 500);
        }
    }, 1000);
}

// 3. 解密功能 - 修复：只支持点击解密
function initDecryption() {
    const decryptBtn = document.getElementById('decrypt-btn');
    const decryptedMessage = document.getElementById('decrypted-message');
    
    if (!decryptBtn) return;
    
    // 移除所有自动解密，只保留点击解密
    decryptBtn.addEventListener('click', function() {
        if (hasDecrypted) return;
        
        // 禁用按钮防止重复点击
        hasDecrypted = true;
        this.disabled = true;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 正在解密中...';
        
        // 模拟解密过程
        setTimeout(() => {
            const binary = '01001000 01100001 01110000 01110000 01111001 00100000 01000010 01101001 01110010 01110100 01101000 01100100 01100001 01111001';
            
            // 创建解密动画效果
            let index = 0;
            const binaryArray = binary.split(' ');
            const textArray = binaryArray.map(bin => 
                String.fromCharCode(parseInt(bin, 2))
            );
            
            const displayElement = document.querySelector('#decrypted-message .highlight');
            displayElement.textContent = '';
            
            // 逐个字符显示的解密动画
            function showNextChar() {
                if (index < textArray.length) {
                    displayElement.textContent += textArray[index];
                    
                    // 每个字符显示时的音效
                    playDecryptSound();
                    
                    // 随机添加小庆祝效果
                    if (index % 3 === 0) {
                        createMiniConfetti();
                    }
                    
                    index++;
                    setTimeout(showNextChar, 200);
                } else {
                    // 解密完成
                    decryptedMessage.classList.remove('hidden');
                    decryptBtn.innerHTML = '<i class="fas fa-lock-open"></i> 祝福已解密';
                    decryptBtn.classList.add('selected');
                    
                    // 添加庆祝效果
                    setTimeout(() => {
                        createConfetti();
                        playCelebrationSound();
                    }, 300);
                    
                    console.log('解密完成：', textArray.join(''));
                    
                    // 显示成功消息
                    showMessage('🎉 解密成功！生日祝福已解锁！', 'success');
                }
            }
            
            // 开始解密动画
            showNextChar();
        }, 800);
    });
}

// 4. 特效系统
function initEffects() {
    const canvas = document.getElementById('effect-canvas');
    const ctx = canvas.getContext('2d');
    
    // 设置画布大小
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // 烟花按钮
    const fireworksBtn = document.getElementById('fireworks-btn');
    if (fireworksBtn) {
        fireworksBtn.addEventListener('click', createFireworks);
    }
    
    // 五彩纸屑按钮
    const confettiBtn = document.getElementById('confetti-btn');
    if (confettiBtn) {
        confettiBtn.addEventListener('click', createConfetti);
    }
    
    // 爱心按钮
    const heartsBtn = document.getElementById('hearts-btn');
    if (heartsBtn) {
        heartsBtn.addEventListener('click', createHearts);
    }
    
    // 点击画布创建特效
    canvas.addEventListener('click', function(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        createClickEffect(x, y);
    });
    
    // 拖动画布创建轨迹
    let isDrawing = false;
    canvas.addEventListener('mousedown', () => isDrawing = true);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mousemove', (event) => {
        if (!isDrawing) return;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        createTrailEffect(x, y, ctx);
    });
}

// 5. 烟花升级系统
function initFireworkUpgrade() {
    const fireworkButton = document.getElementById('fireworks-btn');
    const fireworkLevelElement = document.getElementById('firework-level');
    const fireworkTextElement = document.getElementById('firework-text');
    
    if (!fireworkButton) return;
    
    fireworkButton.addEventListener('click', function() {
        fireworkLevel++;
        
        // 更新等级显示
        if (fireworkLevelElement) {
            const levels = ['✨', '🎇', '🎆', '💥', '🚀'];
            const levelIndex = Math.min(levels.length - 1, Math.floor((fireworkLevel - 1) / 3));
            fireworkLevelElement.textContent = levels[levelIndex];
        }
        
        // 每点击3次升级文字
        if (fireworkLevel % 3 === 0 && fireworkTextElement) {
            const texts = ['发射超级烟花', '发射梦幻烟花', '发射终极烟花', '发射宇宙烟花'];
            const textIndex = Math.min(texts.length - 1, Math.floor(fireworkLevel / 3) - 1);
            fireworkTextElement.textContent = texts[textIndex];
            
            // 按钮特效
            this.style.animation = 'buttonSparkle 0.5s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
            
            // 显示升级提示
            showMessage(`烟花升级到 ${texts[textIndex]}！`, 'success');
        }
        
        console.log(`🎆 烟花等级: ${fireworkLevel}`);
    });
}

// 6. 许愿功能
function initWishes() {
    const wishStars = document.querySelectorAll('.wish-star');
    const wishResult = document.getElementById('wish-result');
    const selectedWishElement = document.getElementById('selected-wish');
    
    wishStars.forEach(star => {
        star.addEventListener('click', function() {
            // 移除所有选中状态
            wishStars.forEach(s => s.classList.remove('active'));
            
            // 添加当前选中状态
            this.classList.add('active');
            
            // 显示许愿结果
            const wish = this.getAttribute('data-wish');
            if (selectedWishElement) {
                selectedWishElement.textContent = wish;
            }
            if (wishResult) {
                wishResult.classList.remove('hidden');
            }
            
            // 添加庆祝效果
            createConfetti();
            
            // 保存到本地存储
            localStorage.setItem('birthdayWish', wish);
            
            console.log('为姐姐许愿：', wish);
        });
    });
    
    // 加载之前保存的愿望
    const savedWish = localStorage.getItem('birthdayWish');
    if (savedWish) {
        wishStars.forEach(star => {
            if (star.getAttribute('data-wish') === savedWish) {
                star.classList.add('active');
                if (selectedWishElement) selectedWishElement.textContent = savedWish;
                if (wishResult) wishResult.classList.remove('hidden');
            }
        });
    }
}

// 7. 导航功能
function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
                
                // 添加按钮反馈
                this.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            }
        });
    });
    
    // 滚动时高亮当前区域
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.section');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navButtons.forEach(button => {
                    button.classList.remove('selected');
                    if (button.getAttribute('data-target') === sectionId) {
                        button.classList.add('selected');
                    }
                });
            }
        });
    });
}

// 8. 键盘快捷键
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // F键发射烟花
        if (e.key === 'f' || e.key === 'F') {
            e.preventDefault();
            createFireworks();
            showKeyHint('F键 - 发射烟花! 🎆');
        }
        
        // 空格键播放/暂停音乐
        if (e.key === ' ') {
            e.preventDefault();
            toggleMusic();
        }
        
        // 数字键1-5快速许愿
        if (e.key >= '1' && e.key <= '5') {
            const index = parseInt(e.key) - 1;
            const wishStars = document.querySelectorAll('.wish-star');
            if (wishStars[index]) {
                wishStars[index].click();
                showKeyHint(`快速许愿: ${wishStars[index].getAttribute('data-wish')}`);
            }
        }
        
        // D键快速解密
        if ((e.key === 'd' || e.key === 'D') && !hasDecrypted) {
            e.preventDefault();
            document.getElementById('decrypt-btn').click();
            showKeyHint('D键 - 快速解密祝福! 🔓');
        }
        
        // T键开始/跳过打字动画
        if (e.key === 't' || e.key === 'T') {
            e.preventDefault();
            if (!typingComplete) {
                const startBtn = document.getElementById('start-typing');
                const skipBtn = document.getElementById('skip-typing');
                if (isTyping && skipBtn) {
                    skipBtn.click();
                    showKeyHint('T键 - 跳过打字动画! ⏩');
                } else if (startBtn) {
                    startBtn.click();
                    showKeyHint('T键 - 开始打字动画! ✍️');
                }
            }
        }
    });
}

// ==================== 音乐控制函数 ====================
function playMusic() {
    const audio = document.getElementById('myMusic');
    if (!audio) return;
    
    audio.play().then(() => {
        console.log('音乐开始播放');
        isPlayingMusic = true;
        
        // 更新按钮状态
        const playBtn = document.querySelector('.play-btn');
        if (playBtn) {
            playBtn.innerHTML = '<i class="fas fa-volume-up"></i> 播放中...';
            playBtn.style.background = 'linear-gradient(135deg, #06d6a0 0%, #118ab2 100%)';
        }
        
        showMessage('🎵 生日音乐开始播放！', 'success');
    }).catch(error => {
        console.log('播放失败:', error);
        showMessage('❌ 点击播放后，请再点击页面任意位置激活音乐', 'error');
    });
}

function pauseMusic() {
    const audio = document.getElementById('myMusic');
    if (!audio) return;
    
    audio.pause();
    isPlayingMusic = false;
    
    // 更新按钮状态
    const playBtn = document.querySelector('.play-btn');
    if (playBtn) {
        playBtn.innerHTML = '<i class="fas fa-play"></i> 播放生日歌';
        playBtn.style.background = 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)';
    }
}

function toggleMusic() {
    const audio = document.getElementById('myMusic');
    if (!audio) return;
    
    if (audio.paused) {
        playMusic();
    } else {
        pauseMusic();
    }
}

function tryAutoPlayMusic() {
    const audio = document.getElementById('myMusic');
    if (!audio) return;
    
    audio.play().catch(e => {
        console.log('自动播放可能需要用户交互');
    });
}

// ==================== 打字动画功能 ====================

// 回忆文字内容
const memoryTexts = {
    memory1: `记得我们刚刚认识时一起玩游戏，高中晚上经常聊天，那些过往时光，回忆总是那么美好。一起打王者，赢了一起笑，输了一起哭；带我打和平，从不说我玩的不好，还分超体晶元（不知道叫不叫这个）给我，带我在和平拍视频，收获满满开心！！`,
    memory2: `每次我遇到困难，向你倾述，求助时，你会尽你所能，为我提供帮助，让我有勇气继续前行。高中政治合格考前为我讲题；细心耐心关心地为我分析高考假期我与zjl的经历情况，甚至当我再次提出我没想通后依然耐心讲给我听还有很多很多……谢谢姐姐！！`,
    memory3: `从高中到大学，你见证了我的成长，感谢姐姐你一直以来的陪伴，帮助。`
};

// 初始化打字动画
function initTypingAnimation() {
    const typingElements = {
        memory1: document.getElementById('memory1'),
        memory2: document.getElementById('memory2'),
        memory3: document.getElementById('memory3')
    };
    
    const startBtn = document.getElementById('start-typing');
    const skipBtn = document.getElementById('skip-typing');
    const repeatBtn = document.getElementById('repeat-typing');
    
    // 清除所有回忆文本
    Object.values(typingElements).forEach(element => {
        if (element) element.innerHTML = '';
    });
    
    // 开始打字动画
    function startTypingAnimation() {
        if (isTyping) return;
        
        isTyping = true;
        typingComplete = false;
        
        // 禁用开始按钮
        if (startBtn) startBtn.disabled = true;
        startBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 播放中...';
        
        // 为每个回忆卡片添加打字效果
        const memoryIds = ['memory1', 'memory2', 'memory3'];
        let currentIndex = 0;
        
        function typeNextMemory() {
            if (currentIndex >= memoryIds.length) {
                // 所有回忆都完成
                typingComplete = true;
                isTyping = false;
                
                // 恢复按钮状态
                if (startBtn) {
                    startBtn.disabled = false;
                    startBtn.innerHTML = '<i class="fas fa-check"></i> 播放完成';
                    startBtn.style.background = 'linear-gradient(135deg, #06d6a0 0%, #118ab2 100%)';
                }
                
                // 庆祝效果
                createMiniConfetti();
                playCelebrationSound();
                showMessage('✨ 所有美好回忆已完整呈现！', 'success');
                
                return;
            }
            
            const memoryId = memoryIds[currentIndex];
            const element = typingElements[memoryId];
            const text = memoryTexts[memoryId];
            
            if (element && text) {
                // 找到对应的记忆卡片
                const memoryCard = element.closest('.memory-card');
                if (memoryCard) {
                    memoryCard.classList.remove('typing-complete');
                }
                
                element.innerHTML = '';
                typeText(element, text, () => {
                    // 当前记忆完成
                    if (memoryCard) {
                        memoryCard.classList.add('typing-complete');
                    }
                    
                    // 播放完成音效
                    playTypingCompleteSound();
                    
                    // 移动到下一个记忆
                    currentIndex++;
                    setTimeout(typeNextMemory, 500); // 短暂停顿
                });
            } else {
                currentIndex++;
                setTimeout(typeNextMemory, 0);
            }
        }
        
        // 开始第一个记忆的打字
        setTimeout(typeNextMemory, 300);
    }
    
    // 跳过打字动画
    function skipTypingAnimation() {
        if (!isTyping && typingComplete) return;
        
        // 直接显示所有文本
        Object.keys(typingElements).forEach(memoryId => {
            const element = typingElements[memoryId];
            const text = memoryTexts[memoryId];
            
            if (element && text) {
                element.innerHTML = '';
                
                // 立即显示所有文字
                for (let i = 0; i < text.length; i++) {
                    const charSpan = document.createElement('span');
                    charSpan.className = 'typing-char';
                    charSpan.textContent = text[i];
                    charSpan.style.animationDelay = `${i * 0.01}s`; // 快速出现
                    element.appendChild(charSpan);
                }
                
                // 标记完成
                const memoryCard = element.closest('.memory-card');
                if (memoryCard) {
                    memoryCard.classList.add('typing-complete');
                }
            }
        });
        
        // 更新状态
        isTyping = false;
        typingComplete = true;
        
        // 恢复按钮状态
        if (startBtn) {
            startBtn.disabled = false;
            startBtn.innerHTML = '<i class="fas fa-check"></i> 播放完成';
            startBtn.style.background = 'linear-gradient(135deg, #06d6a0 0%, #118ab2 100%)';
        }
        
        // 庆祝效果
        createConfetti();
        playCelebrationSound();
    }
    
    // 重新播放打字动画
    function repeatTypingAnimation() {
        // 清除所有回忆文本
        Object.values(typingElements).forEach(element => {
            if (element) element.innerHTML = '';
        });
        
        // 清除完成状态
        document.querySelectorAll('.memory-card').forEach(card => {
            card.classList.remove('typing-complete');
        });
        
        // 重置按钮状态
        if (startBtn) {
            startBtn.disabled = false;
            startBtn.innerHTML = '<i class="fas fa-play"></i> 开始回忆动画';
            startBtn.style.background = 'linear-gradient(135deg, var(--secondary) 0%, var(--primary) 100%)';
        }
        
        // 重置状态
        isTyping = false;
        typingComplete = false;
        
        // 重新开始
        setTimeout(startTypingAnimation, 300);
    }
    
    // 绑定按钮事件
    if (startBtn) startBtn.addEventListener('click', startTypingAnimation);
    if (skipBtn) skipBtn.addEventListener('click', skipTypingAnimation);
    if (repeatBtn) repeatBtn.addEventListener('click', repeatTypingAnimation);
    
    // 当回忆部分进入视口时自动开始打字
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !typingComplete && !isTyping) {
                // 延迟1秒后开始打字
                setTimeout(startTypingAnimation, 1000);
            }
        });
    }, { threshold: 0.3 });
    
    const memoriesSection = document.querySelector('.memories');
    if (memoriesSection) observer.observe(memoriesSection);
}

// 打字机效果函数
function typeText(element, text, onComplete) {
    let index = 0;
    const typingSpeed = 30; // 毫秒/字符
    const maxSpeed = 10;    // 最快速度
    
    // 动态调整打字速度（开始快，中间正常，结尾慢）
    function getCurrentSpeed() {
        const progress = index / text.length;
        if (progress < 0.2) return maxSpeed; // 前20%快速
        if (progress > 0.8) return typingSpeed * 1.5; // 后20%慢速
        return typingSpeed; // 中间正常速度
    }
    
    function typeNextChar() {
        if (index < text.length) {
            // 获取当前字符
            const char = text[index];
            
            // 创建字符元素
            const charSpan = document.createElement('span');
            charSpan.className = 'typing-char';
            charSpan.textContent = char;
            
            // 添加字符
            element.appendChild(charSpan);
            
            // 播放打字音效
            playTypingSound();
            
            index++;
            
            // 计算下一个字符的打字延迟
            const currentSpeed = getCurrentSpeed();
            
            // 随机加入小延迟，模拟真实打字
            const randomDelay = Math.random() * 20;
            
            setTimeout(typeNextChar, currentSpeed + randomDelay);
        } else {
            // 打字完成
            if (onComplete) onComplete();
        }
    }
    
    // 开始打字
    setTimeout(typeNextChar, 100);
}

// 打字音效
function playTypingSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(500 + Math.random() * 200, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.05);
        
        gainNode.gain.setValueAtTime(0.02, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.05);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.05);
    } catch (e) {
        // 静默失败
    }
}

// 打字完成音效
function playTypingCompleteSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator1 = audioContext.createOscillator();
        const oscillator2 = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator1.connect(gainNode);
        oscillator2.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator1.frequency.setValueAtTime(659.25, audioContext.currentTime); // E5
        oscillator2.frequency.setValueAtTime(830.61, audioContext.currentTime); // G#5
        
        gainNode.gain.setValueAtTime(0.04, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);
        
        oscillator1.start(audioContext.currentTime);
        oscillator2.start(audioContext.currentTime);
        oscillator1.stop(audioContext.currentTime + 0.2);
        oscillator2.stop(audioContext.currentTime + 0.2);
    } catch (e) {
        // 静默失败
    }
}

// ==================== 解密相关函数 ====================

// 解密音效
function playDecryptSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(500, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        // 静默失败
    }
}

// 庆祝音效
function playCelebrationSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator1 = audioContext.createOscillator();
        const oscillator2 = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator1.connect(gainNode);
        oscillator2.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator1.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator2.frequency.setValueAtTime(659.25, audioContext.currentTime); // E5
        
        gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
        
        oscillator1.start(audioContext.currentTime);
        oscillator2.start(audioContext.currentTime);
        oscillator1.stop(audioContext.currentTime + 0.3);
        oscillator2.stop(audioContext.currentTime + 0.3);
    } catch (e) {
        // 静默失败
    }
}

// ==================== 特效函数 ====================

// 升级版烟花函数
function createFireworks() {
    console.log('发射超级烟花！🎆');
    
    const canvas = document.getElementById('effect-canvas');
    const ctx = canvas.getContext('2d');
    const fireworksContainer = document.getElementById('fireworks-container');
    
    if (!fireworksContainer) return;
    
    // 清空现有烟花
    fireworksContainer.innerHTML = '';
    
    // 根据等级决定烟花数量
    const fireworkCount = 5 + Math.floor(fireworkLevel / 2);
    
    // 创建多个不同类型的烟花
    for (let i = 0; i < fireworkCount; i++) {
        setTimeout(() => {
            createSingleFirework(i);
        }, i * 120);
    }
    
    // 在画布上也绘制烟花
    if (canvas && ctx) {
        drawCanvasFireworks(ctx, canvas);
    }
    
    // 播放爆炸音效
    playFireworkSound();
}

// 创建单个烟花
function createSingleFirework(index) {
    const fireworksContainer = document.getElementById('fireworks-container');
    if (!fireworksContainer) return;
    
    const colors = ['#ff6b8b', '#6b48ff', '#ffd166', '#06d6a0', '#ff9a76', '#a28bff', '#ff8e8e', '#4ecdc4'];
    const types = ['circle', 'heart', 'star', 'spiral'];
    const emojis = ['❤️', '⭐', '✨', '🎇', '🎆', '💥'];
    
    // 创建发射轨迹
    const trail = document.createElement('div');
    trail.className = 'firework-trail';
    const color = colors[index % colors.length];
    const left = 15 + Math.random() * 70;
    
    trail.style.cssText = `
        position: absolute;
        width: 6px;
        height: 6px;
        background: ${color};
        border-radius: 50%;
        left: ${left}%;
        top: 95%;
        z-index: 999;
        animation: launchUp 0.8s ease-out forwards;
        box-shadow: 0 0 15px ${color};
    `;
    
    fireworksContainer.appendChild(trail);
    
    // 爆炸效果
    setTimeout(() => {
        // 移除轨迹
        trail.remove();
        
        // 创建爆炸粒子
        const particleCount = 25 + Math.floor(fireworkLevel * 3);
        const explosionType = types[Math.floor(Math.random() * types.length)];
        const useEmoji = Math.random() > 0.5;
        
        for (let j = 0; j < particleCount; j++) {
            createExplosionParticle(j, left, explosionType, useEmoji);
        }
        
        // 添加爆炸闪光
        createExplosionFlash(left);
        
    }, 800);
}

// 创建爆炸粒子
function createExplosionParticle(particleIndex, leftPosition, type, useEmoji) {
    const fireworksContainer = document.getElementById('fireworks-container');
    if (!fireworksContainer) return;
    
    const colors = ['#ff6b8b', '#6b48ff', '#ffd166', '#06d6a0', '#ff9a76', '#a28bff', '#ff8e8e', '#4ecdc4'];
    const emojis = ['❤️', '⭐', '✨', '🎇', '🎆', '💥', '🎉', '🎊'];
    
    const particle = document.createElement('div');
    const color = colors[particleIndex % colors.length];
    const size = 3 + Math.random() * 10;
    const left = leftPosition + Math.random() * 10 - 5;
    const top = 25 + Math.random() * 40;
    
    // 设置粒子动画变量
    const dx = Math.random() * 100 - 50;
    const dy = Math.random() * 100 - 50;
    
    if (useEmoji && type === 'heart') {
        particle.innerHTML = emojis[particleIndex % emojis.length];
        particle.style.fontSize = `${size * 2}px`;
        particle.style.color = color;
    } else if (useEmoji && type === 'star') {
        particle.innerHTML = '⭐';
        particle.style.fontSize = `${size * 2}px`;
        particle.style.color = color;
    } else {
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = color;
        particle.style.borderRadius = type === 'circle' ? '50%' : '0';
    }
    
    particle.className = 'firework-particle';
    particle.style.cssText = `
        position: absolute;
        left: ${left}%;
        top: ${top}%;
        z-index: 999;
        pointer-events: none;
        --dx: ${dx};
        --dy: ${dy};
        animation: explodeParticle ${0.8 + Math.random() * 0.7}s ease-out forwards;
        box-shadow: 0 0 12px ${color};
    `;
    
    fireworksContainer.appendChild(particle);
    
    // 自动移除粒子
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, 2000);
}

// 创建爆炸闪光
function createExplosionFlash(leftPosition) {
    const fireworksContainer = document.getElementById('fireworks-container');
    if (!fireworksContainer) return;
    
    const flash = document.createElement('div');
    flash.className = 'explosion-flash';
    flash.style.cssText = `
        position: absolute;
        left: ${leftPosition - 2}%;
        top: 23%;
        width: 80px;
        height: 80px;
        background: radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%);
        border-radius: 50%;
        z-index: 998;
        pointer-events: none;
        animation: flashEffect 0.4s ease-out;
    `;
    
    fireworksContainer.appendChild(flash);
    
    setTimeout(() => flash.remove(), 500);
}

// 在画布上绘制烟花
function drawCanvasFireworks(ctx, canvas) {
    if (!ctx || !canvas) return;
    
    // 绘制多个爆炸点
    for (let i = 0; i < 3 + Math.floor(fireworkLevel / 4); i++) {
        setTimeout(() => {
            const x = 100 + Math.random() * (canvas.width - 200);
            const y = 100 + Math.random() * (canvas.height - 200);
            drawCanvasExplosion(x, y, ctx);
        }, i * 150);
    }
}

// 绘制画布爆炸效果
function drawCanvasExplosion(x, y, ctx) {
    if (!ctx) return;
    
    const particles = 30 + Math.floor(fireworkLevel * 2);
    const radius = 2;
    
    for (let i = 0; i < particles; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 3;
        const distance = speed * 25;
        
        const startX = x;
        const startY = y;
        const endX = startX + Math.cos(angle) * distance;
        const endY = startY + Math.sin(angle) * distance;
        
        // 绘制粒子轨迹
        drawParticleTrail(startX, startY, endX, endY, ctx);
    }
}

// 绘制粒子轨迹
function drawParticleTrail(startX, startY, endX, endY, ctx) {
    if (!ctx) return;
    
    const color = `hsl(${Math.random() * 360}, 100%, 60%)`;
    let currentX = startX;
    let currentY = startY;
    let progress = 0;
    const speed = 0.04;
    
    function animate() {
        progress += speed;
        currentX = startX + (endX - startX) * progress;
        currentY = startY + (endY - startY) * progress;
        
        // 清除旧的绘制
        ctx.clearRect(currentX - 3, currentY - 3, 6, 6);
        
        // 绘制粒子
        ctx.beginPath();
        ctx.arc(currentX, currentY, 2, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        
        // 绘制尾迹
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(currentX, currentY);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.stroke();
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // 最后清除
            setTimeout(() => {
                ctx.clearRect(currentX - 3, currentY - 3, 6, 6);
            }, 100);
        }
    }
    
    animate();
}

// 五彩纸屑特效
function createConfetti() {
    console.log('抛洒五彩纸屑！');
    
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 150 + fireworkLevel * 10,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff6b8b', '#6b48ff', '#ffd166', '#06d6a0', '#ff9a76', '#a28bff']
        });
        
        // 额外的小纸屑
        setTimeout(() => {
            confetti({
                particleCount: 100,
                angle: 60,
                spread: 80,
                origin: { x: 0 },
                colors: ['#ff6b8b', '#6b48ff']
            });
        }, 250);
        
        setTimeout(() => {
            confetti({
                particleCount: 100,
                angle: 120,
                spread: 80,
                origin: { x: 1 },
                colors: ['#ffd166', '#06d6a0']
            });
        }, 500);
    }
}

// 迷你纸屑效果（用于解密动画）
function createMiniConfetti() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 10,
            spread: 30,
            origin: { y: 0.8 },
            colors: ['#ff6b8b', '#6b48ff'],
            startVelocity: 25,
            scalar: 0.7
        });
    }
}

// 爱心特效
function createHearts() {
    console.log('发射爱心！💖');
    
    for (let i = 0; i < 15 + fireworkLevel * 2; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '💖';
            heart.style.cssText = `
                position: fixed;
                font-size: ${25 + Math.random() * 40}px;
                left: ${Math.random() * 100}%;
                top: 100%;
                z-index: 1000;
                pointer-events: none;
                animation: floatHeart ${2 + Math.random() * 3}s ease-in forwards;
                filter: drop-shadow(0 0 5px rgba(255, 107, 139, 0.5));
            `;
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, i * 80);
    }
    
    // 添加爱心浮动动画
    if (!document.querySelector('#heart-animation')) {
        const style = document.createElement('style');
        style.id = 'heart-animation';
        style.textContent = `
            @keyframes floatHeart {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// 点击画布特效
function createClickEffect(x, y) {
    const canvas = document.getElementById('effect-canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // 在点击位置创建涟漪效果
    ctx.fillStyle = 'rgba(255, 107, 139, 0.3)';
    ctx.beginPath();
    ctx.arc(x, y, 0, 0, Math.PI * 2);
    ctx.fill();
    
    let radius = 0;
    const maxRadius = 50;
    
    function animateRipple() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = `rgba(255, 107, 139, ${1 - radius / maxRadius})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.stroke();
        
        radius += 2;
        
        if (radius < maxRadius) {
            requestAnimationFrame(animateRipple);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    
    animateRipple();
}

// 轨迹特效
function createTrailEffect(x, y, ctx) {
    if (!ctx) return;
    
    // 绘制轨迹点
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 60%)`;
    ctx.fill();
    
    // 轨迹点逐渐消失
    setTimeout(() => {
        ctx.clearRect(x - 4, y - 4, 8, 8);
    }, 300);
}

// 播放烟花音效
function playFireworkSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800 + fireworkLevel * 50, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.5);
        
        gainNode.gain.setValueAtTime(0.08 + fireworkLevel * 0.01, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        console.log('音效播放失败，但不影响视觉效果');
    }
}

// ==================== 工具函数 ====================

// 显示消息
function showMessage(text, type) {
    const msg = document.createElement('div');
    msg.textContent = text;
    msg.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#06d6a0' : '#ff6b6b'};
        color: white;
        padding: 12px 24px;
        border-radius: 12px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        font-weight: bold;
    `;
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 3000);
}

// 显示键盘提示
function showKeyHint(text) {
    const hint = document.createElement('div');
    hint.textContent = text;
    hint.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0,0,0,0.85);
        color: white;
        padding: 15px 30px;
        border-radius: 15px;
        z-index: 9999;
        animation: fadeHint 2s ease;
        font-size: 1.2rem;
        font-weight: bold;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;
    document.body.appendChild(hint);
    setTimeout(() => hint.remove(), 2000);
}

// 页面滚动特效
function addPageEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

// 初始化页面特效
setTimeout(addPageEffects, 1000);