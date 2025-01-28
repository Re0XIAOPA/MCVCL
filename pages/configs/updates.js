document.addEventListener('DOMContentLoaded', function () {
    const updatesContainer = document.querySelector('.updates-timeline');
    updates.forEach((update, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.classList.add('timeline-item');

        // 检查是否为最新更新
        if (index === 0) { // 假设第一个是最新更新
            timelineItem.classList.add('latest'); // 添加最新更新的类
        }

        timelineItem.innerHTML = `
            <div class="timeline-date">
                <span class="date">${update.date}</span>
                <span class="version">${update.version}</span>
            </div>
            <div class="timeline-content">
                <div class="update-header">
                    <h2>${update.title}</h2>
                    <span class="update-tag ${index === 0 ? 'latest' : ''}">${update.tag}</span>
                </div>
                <div class="update-details">
                    ${update.content.map(item => `
                        <div>
                            <h3>${item.description}</h3>
                            <ul>
                                ${item.details.map(detail => `<li>${detail}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        updatesContainer.appendChild(timelineItem);
    });
});