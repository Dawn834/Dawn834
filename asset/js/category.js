document.querySelector('.show-all').addEventListener('click', function () {
    const container = document.querySelector('.carousel-container');
    const hiddenCards = document.querySelectorAll('.restaurant-card.hidden');
    const showAllBtn = this;
    if (showAllBtn.textContent.trim().toLowerCase() === 'show all') {
        // Hiển thị tất cả thẻ
        hiddenCards.forEach(card => {
            card.classList.remove('hidden');
        });
        showAllBtn.textContent = 'hide';

        // Cuộn xuống vị trí các thẻ mới hiện
        hiddenCards[0]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
        // Ẩn các thẻ (trừ 4 thẻ đầu tiên)
        const allCards = document.querySelectorAll('.restaurant-card');
        allCards.forEach((card, index) => {
            if (index >= 4) { // Giữ lại 4 thẻ đầu, ẩn các thẻ còn lại
                card.classList.add('hidden');
            }
        });
        showAllBtn.textContent = 'show all';

        // Cuộn lên đầu danh sách
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});