// 初始化主页公告和更新的显示功能
document.addEventListener('DOMContentLoaded', function () {
    initHomeAnnouncements();
    initHomeUpdates();
});

// 初始化主页公告
function initHomeAnnouncements() {
    const announcements = document.querySelectorAll('.news-item');
    const maxDisplay = 2; // 最多显示的公告数量

    announcements.forEach((announcement, index) => {
        if (index >= maxDisplay) {
            announcement.style.display = 'none'; // 隐藏多余的公告
        } else {
            announcement.style.display = 'block'; // 显示公告
        }
    });
}

// 初始化主页更新
function initHomeUpdates() {
    const updates = document.querySelectorAll('.timeline-item');
    const maxDisplay = 2; // 最多显示的更新数量

    updates.forEach((update, index) => {
        if (index >= maxDisplay) {
            update.style.display = 'none'; // 隐藏多余的更新
        } else {
            update.style.display = 'block'; // 显示更新
        }
    });
} 