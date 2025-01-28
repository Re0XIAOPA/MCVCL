// 获取前两个公告和更新
const getTopAnnouncements = (count) => {
    return announcements.slice(0, count);
};

const getTopUpdates = (count) => {
    return updates.slice(0, count);
};

// 将公告和更新插入到主页
const insertContentToHomepage = () => {
    const announcementsContainer = document.querySelector('.news-card');
    const updatesContainer = document.querySelector('.update-timeline');

    // 获取前两个公告
    const topAnnouncements = getTopAnnouncements(2);
    topAnnouncements.forEach(announcement => {
        const announcementCard = document.createElement('div');
        announcementCard.classList.add('news-item');
        announcementCard.innerHTML = `
            <div class="news-date color-text">${announcement.date}</div>
            <h3 class="gradient-text">${announcement.title}</h3>
            <p class="color-text">${announcement.content}</p>
            <a href="pages/announcements.html" class="read-more">查看详情</a>
        `;
        announcementsContainer.appendChild(announcementCard);
    });

    // 获取前两个更新
    const topUpdates = getTopUpdates(2);
    topUpdates.forEach(update => {
        const updateItem = document.createElement('div');
        updateItem.classList.add('timeline-item');
        updateItem.innerHTML = `
            <div class="timeline-date color-text">${update.date}</div>
            <div class="timeline-content">
            <h3 class="gradient-text">${update.version}</h3>
                ${update.content.map(item => `
                    <div>
                        <ul>
                            ${item.details.map(detail => `<li>${detail}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
        `;
        updatesContainer.appendChild(updateItem);
    });
};

// 执行插入内容的函数
document.addEventListener('DOMContentLoaded', insertContentToHomepage);