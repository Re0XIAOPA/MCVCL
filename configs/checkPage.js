// 获取当前页面的 URL
const currentPage = window.location.pathname;

// 定义一个函数来检查页面是否存在
async function checkPage() {
    // 这里可以添加一个数组，包含所有有效的页面路径
    const validPages = [
        '/index.html',
        '/pages/wiki.html',
        '/pages/updates.html',
        '/pages/issue/java-issues.html',
        '/pages/download.html',
        // 添加其他有效页面路径
    ];

    // 检查当前页面是否在有效页面列表中
    if (!validPages.includes(currentPage) && currentPage !== '/404.html') {
        // 如果当前页面不存在，跳转到 404 页面
        window.location.href = '/404.html';
    } else {
        // 检查有效链接
        const links = document.querySelectorAll('a'); // 获取所有链接
        for (const link of links) {
            try {
                const response = await fetch(link.href, { method: 'HEAD' });
                if (!response.ok) {
                    link.href = '/404.html'; // 将无效链接指向 404 页面
                }
            } catch (error) {
                link.href = '/404.html'; // 如果请求失败，指向 404 页面
            }
        }
    }
}

// 调用函数检查页面
checkPage(); 