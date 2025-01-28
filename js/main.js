document.addEventListener('DOMContentLoaded', function () {
    // 复制服务器IP功能
    const ipBtn = document.querySelector('.ip-btn');
    const serverIP = 'nop.candycake.cloud:33959';

    ipBtn.addEventListener('click', async function () {
        try {
            await navigator.clipboard.writeText(serverIP);

            // 移除已存在的提示
            const existingTooltip = document.querySelector('.copy-tooltip');
            if (existingTooltip) {
                existingTooltip.remove();
            }

            // 创建新提示
            const tooltip = document.createElement('div');
            tooltip.className = 'copy-tooltip';
            tooltip.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <span>服务器IP已复制到剪贴板</span>
            `;
            document.body.appendChild(tooltip);

            // 显示提示
            requestAnimationFrame(() => {
                tooltip.classList.add('show');
            });

            // 移除提示
            setTimeout(() => {
                tooltip.classList.remove('show');
                setTimeout(() => tooltip.remove(), 300);
            }, 2000);
        } catch (err) {
            // 创建错误提示
            const tooltip = document.createElement('div');
            tooltip.className = 'copy-tooltip error';
            tooltip.innerHTML = `
                <i class="fas fa-exclamation-circle"></i>
                <span>复制失败，IP: ${serverIP}</span>
            `;
            document.body.appendChild(tooltip);

            requestAnimationFrame(() => {
                tooltip.classList.add('show');
            });

            setTimeout(() => {
                tooltip.classList.remove('show');
                setTimeout(() => tooltip.remove(), 300);
            }, 3000);
        }
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 二维码弹窗功能
    const qrTrigger = document.querySelector('.qr-trigger');
    const qrModal = document.querySelector('.qr-modal');
    const closeModal = document.querySelector('.close-modal');

    qrTrigger.addEventListener('click', () => {
        qrModal.classList.add('active');
    });

    closeModal.addEventListener('click', () => {
        qrModal.classList.remove('active');
    });

    qrModal.addEventListener('click', (e) => {
        if (e.target === qrModal) {
            qrModal.classList.remove('active');
        }
    });

    // 背景图片加载处理
    const hero = document.querySelector('.hero');
    const img = new Image();
    img.src = 'https://api.miaomc.cn/image/get';
    img.onload = function () {
        hero.classList.add('loaded');
    };

    // 图片轮播功能
    function initializeSlider() {
        const sliderWrapper = document.querySelector('.slider-wrapper');
        const images = document.querySelectorAll('.slider-image');
        const prevBtn = document.querySelector('.slider-btn.prev');
        const nextBtn = document.querySelector('.slider-btn.next');
        let currentIndex = 0;

        // 更新轮播图位置
        function updateSlider() {
            sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        // 自动切换
        function autoSlide() {
            currentIndex = (currentIndex + 1) % images.length;
            updateSlider();
        }

        let autoSlideInterval = setInterval(autoSlide, 3000);

        // 切换按钮事件
        prevBtn.addEventListener('click', () => {
            clearInterval(autoSlideInterval);
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateSlider();
            autoSlideInterval = setInterval(autoSlide, 3000);
        });

        nextBtn.addEventListener('click', () => {
            clearInterval(autoSlideInterval);
            currentIndex = (currentIndex + 1) % images.length;
            updateSlider();
            autoSlideInterval = setInterval(autoSlide, 3000);
        });

        // 动态加载图片
        function loadImages() {
            images.forEach((img, index) => {
                img.src = `https://api.miaomc.cn/image/get?seed=${index}`;
            });
        }

        // 当滚动到可见区域时加载图片
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadImages();
                    observer.disconnect();
                }
            });
        });

        observer.observe(document.querySelector('.highlight-image'));
    }

    // 初始化轮播图
    initializeSlider();

    // 导航栏响应式交互
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // 切换图标
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        // 点击导航链接后自动收起菜单
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            });
        });

        // 点击页面其他区域时收起菜单
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar')) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    }
}); 