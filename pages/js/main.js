document.addEventListener('DOMContentLoaded', function () {
    const ipBtn = document.querySelector('.ip-btn'); // 确保选择器正确
    console.log(ipBtn); // 输出 ipBtn 以检查是否为 null

    if (ipBtn) {
        ipBtn.addEventListener('click', async function () {
            try {
                // 你的异步代码
                const response = await fetch('your-api-endpoint');
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Error:', error);
            }
        });
    } else {
        console.error('ipBtn not found');
    }
}); 