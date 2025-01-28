document.addEventListener('DOMContentLoaded', function () {
    const announcementsContainer = document.querySelector('.announcements-content');
    announcements.forEach(announcement => {
        const announcementCard = document.createElement('div');
        announcementCard.classList.add('announcement-card');
        announcementCard.innerHTML = `
            <div class="announcement-header">
                <h2 class="announcement-title">
                    <i class="fas fa-tools"></i>
                    ${announcement.title}
                </h2>
                <span class="announcement-date">${announcement.date}</span>
            </div>
            <div class="announcement-content">
                <p>${announcement.footer}</p>
                <span>亲爱的玩家们：</span>
                <p>${announcement.content}</p>
                <ul>
                    ${announcement.details.map(detail => `<li>${detail}</li>`).join('')}
                </ul>
                <p>${announcement.footer}</p>
                <span>祝大家玩的愉快！</span>
            </div>
            <div class="announcement-tags">
                ${announcement.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        `;
        announcementsContainer.appendChild(announcementCard);
    });

});