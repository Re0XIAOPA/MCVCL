// 初始化筛选功能
document.addEventListener('DOMContentLoaded', function () {
    // 公告筛选功能
    initAnnouncementFilter();
    // 更新动态筛选功能
    initUpdateFilter();
    // 时间轴筛选功能
    initTimeFilter();
});

// 公告筛选功能
function initAnnouncementFilter() {
    const filterButtons = document.querySelectorAll('.announcement-filter .filter-btn');
    const announcements = document.querySelectorAll('.announcement-card');

    if (!filterButtons.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 更新按钮状态
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // 获取筛选类型
            const filterType = button.textContent.trim();

            // 筛选公告
            announcements.forEach(card => {
                const tags = Array.from(card.querySelectorAll('.tag'))
                    .map(tag => tag.textContent.trim());

                if (filterType === '全部公告' || tags.includes(filterType)) {
                    showElement(card);
                } else {
                    hideElement(card);
                }
            });
        });
    });
}

// 更新动态筛选功能
function initUpdateFilter() {
    const filterButtons = document.querySelectorAll('.version-filter .filter-btn');
    const updates = document.querySelectorAll('.timeline-item');

    if (!filterButtons.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 更新按钮状态
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // 获取筛选类型
            const filterType = button.textContent.trim();

            // 筛选更新
            updates.forEach(item => {
                const updateTag = item.querySelector('.update-tag').textContent.trim();

                // 修改条件以确保"全部更新"能够显示所有内容
                if (filterType === '全部更新' || updateTag === filterType) {
                    showElement(item);
                } else {
                    hideElement(item);
                }
            });
        });
    });
}

// 时间轴筛选功能
function initTimeFilter() {
    // 获取所有内容的日期
    const announcements = document.querySelectorAll('.announcement-card');
    const updates = document.querySelectorAll('.timeline-item');
    const elements = announcements.length ? announcements : updates;

    // 收集所有不重复的日期
    const dates = new Set();
    elements.forEach(element => {
        const date = element.querySelector('.announcement-date, .date').textContent.trim();
        dates.add(date);
    });

    // 按日期降序排序
    const sortedDates = Array.from(dates).sort((a, b) => {
        return new Date(b) - new Date(a);
    });

    // 添加"全部时间"选项
    const allTimeItem = document.createElement('div');
    allTimeItem.className = 'time-item active';
    allTimeItem.innerHTML = `
        <div class="time-dot"></div>
        <span class="time-date">全部时间</span>
    `;

    // 添加时间项
    sortedDates.forEach(date => {
        const timeItem = document.createElement('div');
        timeItem.className = 'time-item';
        timeItem.innerHTML = `
            <div class="time-dot"></div>
            <span class="time-date">${date}</span>
        `;
    });

    // 为所有时间项添加点击事件
    const timeItems = document.querySelectorAll('.time-item');
    timeItems.forEach(item => {
        item.addEventListener('click', () => {
            // 更新激活状态
            timeItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const selectedDate = item.querySelector('.time-date').textContent.trim();

            // 筛选内容
            elements.forEach(element => {
                const elementDate = element.querySelector('.announcement-date, .date').textContent.trim();
                if (selectedDate === '全部时间' || elementDate === selectedDate) {
                    showElement(element);
                } else {
                    hideElement(element);
                }
            });
        });
    });
}

// 显示元素的函数
function showElement(element) {
    element.style.display = 'block'; // 显示元素
}

// 隐藏元素的函数
function hideElement(element) {
    element.style.display = 'none'; // 隐藏元素
}

// 为所有可筛选元素添加过渡效果
function initializeTransitions() {
    const elements = document.querySelectorAll('.announcement-card, .timeline-item');
    elements.forEach(element => {
        element.style.transition = 'all 0.3s ease';
    });
}

// 初始化过渡效果
initializeTransitions(); 