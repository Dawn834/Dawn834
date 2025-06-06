
function openTab(tabId) {
    // Ẩn tất cả nội dung tab
    const tabContents = document.querySelectorAll('.content-area');
    tabContents.forEach(tab => tab.classList.remove('active'));

    // Bỏ active tất cả các nút tab
    const tabButtons = document.querySelectorAll('.nav-link');
    tabButtons.forEach(btn => btn.classList.remove('active'));

    // Hiển thị tab được chọn và thêm class active
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Navigation functionality
document.querySelectorAll('.nav-link').forEach(link => { //document.querySelectorAll('.nav-link'): Sẽ select toàn bộ thẻ có class nav-link, tạo thành 1 nodelist, sau đó dùng forEach(link => {...}) để duyệt qua từng link trong nodelist 
    link.addEventListener('click', function (e) {  //add sự kiện click với hàm callback
        e.preventDefault(); //ngăn cho e (sự kiện) chạy defalt của thẻ a: ko chuyển trang khi click
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active')); // tương tự như đầu, select toàn bộ thẻ có class nav-link, sau đó remove trạng thái active.
        this.classList.add('active'); //thêm class active vào link mình vừa click
    });
});

document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        if (confirm('Bạn có chắc muốn xoá sản phẩm')) { // tạo hàm if. mở hộp confirm, nếu ấn OK thì chạy hàm callback dưới. No thì huỷ
            this.closest('tr').remove(); // chọn hàng có nút delete-btn mà click gần nhất, remove hàng đó
        }
    });
});

// Checkbox functionality
const selectAllCheckbox = document.querySelector('thead input[type="checkbox"]'); // tạo biến selectAllCheckbox = thẻ thead đầu tiên có thuộc tính type=checkbox
const rowCheckboxes = document.querySelectorAll('tbody input[type="checkbox"]'); // tương tự

selectAllCheckbox.addEventListener('change', function () { //thêm sự kiện change vào selectAllCheckbox, hàm callback
    rowCheckboxes.forEach(checkbox => { // duyệt checkbox từ nodelist được tạo từ rowCheckboxes
        checkbox.checked = this.checked // checkbox sẽ gán trạng thái checked nếu như this (selectAllCheckbox) đã có trạng thái checked, nếu this bỏ checked thì các checkbox khác đều bỏ
    });
});

// Xoá all


// Biến lưu trữ sản phẩm đang chỉnh sửa
let currentEditingProduct = null;
let newImageFile = null;

// Gán sự kiện cho tất cả nút chỉnh sửa
document.querySelectorAll('.edit-product-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const productId = this.getAttribute('data-id'); // tạo biến productId = giá trị data-id khi click vào btn có class edit-product-btn
        const productRow = document.getElementById(`product-${productId}`); //tạo biến productRow = giá trị product có productId

        // Lấy thông tin sản phẩm từ hàng trong bảng
        currentEditingProduct = { // tạo 1 obj có id, name, category, price, image
            id: productId,
            name: productRow.querySelector('.product-name').textContent, //name = giá trị của thẻ đầu tiên trong hàng có class product-name, in ra text
            category: productRow.querySelector('.category-badge').textContent, // tương tự
            price: productRow.querySelector('.price').textContent.replace(/\D/g, ''), // in ra giá, replace(/\D/g, ''):
            //Loại bỏ tất cả ký tự không phải số(ví dụ: dấu,, $, đ) từ chuỗi giá.
            // \D: Biểu thức chính quy(regex) khớp với ký tự không phải số.
            image: productRow.querySelector('.product-image img').src
        };

        // Điền thông tin vào form chỉnh sửa
        document.getElementById('editProductId').value = currentEditingProduct.id; //truy cập vào thẻ có id editProductId, thay đổi giá trị id của thẻ = giá trị id của obj vừa tạo
        document.getElementById('editProductName').value = currentEditingProduct.name;
        document.getElementById('editProductCategory').value = currentEditingProduct.category;
        document.getElementById('editProductPrice').value = currentEditingProduct.price;
        document.getElementById('imagePreview').src = currentEditingProduct.image;
        newImageFile = null;

        // Hiển thị popup
        document.getElementById('editProductModal').style.display = 'block';
    });
});
//Đóng popup
let popup = document.getElementById("editProductModal");
let closeBtn = document.querySelector(".close");
// Hàm đóng popup chỉnh sửa
closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});
// Đóng popup khi click bên ngoài
popup.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.style.display = 'none';
    }
});


//Popup add new product
document.addEventListener('DOMContentLoaded', function () {
    // Lấy các phần tử DOM
    const openPopupBtn = document.getElementById('openPopupBtn');
    const popup = document.getElementById('Popup-add-product');

    // Mở popup khi click vào nút
    openPopupBtn.addEventListener('click', function () {
        popup.style.display = 'flex';
    });
})


function closePopup() {
    document.querySelector('.popup-overlay').style.display = 'none';
}

// Close popup when clicking outside
document.querySelector('.popup-overlay').addEventListener('click', function (e) {
    if (e.target === this) {
        closePopup();
    }
});

// Handle discount checkbox
document.getElementById('scheduleDiscount').addEventListener('change', function () {
    const discountFields = document.getElementById('discountFields');
    if (this.checked) {
        discountFields.style.display = 'grid';
    } else {
        discountFields.style.display = 'none';
    }
});