// Menu dropdown functionality
const menuButton = document.getElementById('menuButton');
const dropdownContent = document.getElementById('dropdownContent');
const menuDropdown = document.querySelector('.menu-dropdown');

// Toggle dropdown when button is clicked
menuButton.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleDropdown();
});

// Close dropdown when clicking outside
document.addEventListener('click', function (e) {
    if (!menuDropdown.contains(e.target)) {
        closeDropdown();
    }
});

// Close dropdown when pressing Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeDropdown();
    }
});

function toggleDropdown() {
    const isOpen = dropdownContent.classList.contains('show');
    if (isOpen) {
        closeDropdown();
    } else {
        openDropdown();
    }
}

function openDropdown() {
    dropdownContent.classList.add('show');
    menuDropdown.classList.add('active');
}

function closeDropdown() {
    dropdownContent.classList.remove('show');
    menuDropdown.classList.remove('active');
}

// Add smooth hover effects for dropdown items
const dropdownItems = document.querySelectorAll('.dropdown-item');
dropdownItems.forEach(item => {
    item.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('Clicked:', this.textContent.trim());
        closeDropdown();
    });
});