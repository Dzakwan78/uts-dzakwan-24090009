document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const errorMessage = document.getElementById("error-message");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim(); // Ini adalah NIM mahasiswa

    // 1. Validasi: Email dan Password tidak boleh kosong [cite: 38]
    if (email === "" || password === "") {
      errorMessage.textContent = "Email dan Password (NIM) tidak boleh kosong.";
      errorMessage.style.display = "block"; // Tampilkan pesan error [cite: 39]
      return; // Hentikan proses
    }

    // Simulasikan data login yang benar (GANTI DENGAN NIM ANDA)
    const validEmail = "venarindraekadzakwan@gmail.com";
    const validPassword = "24090009";

    // 2. Simulasi Autentikasi
    if (email === validEmail && password === validPassword) {
      // Login Berhasil [cite: 40]
      alert("Login berhasil! Selamat datang."); // Tampilkan pesan "Login berhasil" [cite: 40]

      // Redirect ke dashboard.html [cite: 41, 43]
      window.location.href = "dashboard.html";
    } else {
      // Login Gagal
      errorMessage.textContent =
        "Email atau Password (NIM) salah. Silakan coba lagi.";
      errorMessage.style.display = "block"; // Tampilkan pesan error [cite: 39]
    }
  });
});

const summary = {
  totalProducts: 120,
  totalSales: 85,
  totalRevenue: 12500000,
};

// Fungsi untuk memformat angka menjadi format mata uang Rupiah
function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
}

// Memuat data ke DOM dan menambahkan Event Listener
if (document.getElementById("total-products")) {
  // 1. Memasukkan data ke dalam Card Summary
  document.getElementById("total-products").textContent = summary.totalProducts;
  document.getElementById("total-sales").textContent = summary.totalSales;
  document.getElementById("total-revenue").textContent = formatRupiah(
    summary.totalRevenue
  );

  // 2. Event Listener untuk tombol "Lihat Data Produk"
  const viewProductsBtn = document.getElementById("view-products-btn");

  viewProductsBtn.addEventListener("click", function () {
    window.location.href = "products.html";
  });
}

// --- Definisikan ID HTML ---
const productList = document.getElementById("product-data-list");
const dataProductTable = document.getElementById("data-product-table");

// --- Kunci Local Storage ---
const STORAGE_KEY = "PRODUCT_DATA";

// --- Fungsi untuk Mendapatkan Data dari Local Storage ---
function getProducts() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// --- Fungsi untuk Menyimpan Data ke Local Storage ---
function saveProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

// --- FUNGSI UTAMA: Render Data ke Tabel ---
function renderProducts() {
  const products = getProducts();
  productList.innerHTML = ""; // Kosongkan tabel

  if (products.length === 0) {
    // Tampilkan pesan jika data kosong
    const emptyRow = `<tr><td colspan="5" style="text-align: center; color: #6c757d; padding: 20px;">Belum ada data produk.</td></tr>`;
    productList.innerHTML = emptyRow;
    return;
  }

  products.forEach((product, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${index + 1}</td>
            <td>${product.name}</td>
            <td>${product.price.toLocaleString("id-ID")}</td>
            <td>${product.stock}</td>
            <td>
                <button class="edit-btn" data-id="${product.id}">✏️</button>
                <button class="delete-btn" data-id="${product.id}">🗑️</button>
            </td>
        `;
    productList.appendChild(row);
  });

  // Tambahkan event listeners untuk tombol Edit dan Hapus
  addEventListeners();
}

// --- FUNGSI: Menambahkan Event Listener ke Tombol ---
function addEventListeners() {
  // Event untuk HAPUS
  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const id = event.target.dataset.id;
      deleteProduct(id);
    });
  });

  // Event untuk EDIT
  document.querySelectorAll(".edit-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const id = event.target.dataset.id;
      editProduct(id);
    });
  });
}

// ------------------------------------------
// --- FUNGSI MANIPULASI DATA (CRUD) ---
// ------------------------------------------

// 1. Tambah/Buat (Create)
function addProduct(name, price, stock) {
  const products = getProducts();
  const newProduct = {
    // ID unik (menggunakan timestamp sederhana)
    id: Date.now().toString(),
    name: name,
    price: parseInt(price),
    stock: parseInt(stock),
  };
  products.push(newProduct);
  saveProducts(products);
  renderProducts();
  alert(`Produk "${name}" berhasil ditambahkan!`);
}

// 2. Hapus (Delete)
function deleteProduct(id) {
  if (!confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
    return;
  }

  let products = getProducts();
  products = products.filter((product) => product.id !== id);
  saveProducts(products);
  renderProducts();
  alert("Produk berhasil dihapus.");
}

// 3. Edit (Update)
function editProduct(id) {
  let products = getProducts();
  const productToEdit = products.find((product) => product.id === id);

  if (!productToEdit) return;

  // Gunakan prompt untuk input sederhana (Anda bisa menggunakan modal/form HTML yang lebih baik)
  const newName = prompt("Edit Nama Produk:", productToEdit.name);
  if (newName === null) return; // Batal

  const newPrice = prompt("Edit Harga:", productToEdit.price);
  if (newPrice === null) return;

  const newStock = prompt("Edit Stok:", productToEdit.stock);
  if (newStock === null) return;

  // Perbarui objek produk
  productToEdit.name = newName;
  productToEdit.price = parseInt(newPrice);
  productToEdit.stock = parseInt(newStock);

  saveProducts(products);
  renderProducts();
  alert(`Produk "${newName}" berhasil diperbarui.`);
}

// --- Inisialisasi Data Awal (Opsional) ---
function initializeData() {
  if (getProducts().length === 0) {
    const initialData = [
      { id: "101", name: "Kopi Gayo", price: 25000, stock: 50 },
      { id: "102", name: "Teh Hitam", price: 18000, stock: 30 },
      { id: "103", name: "Coklat Aceh", price: 30000, stock: 20 },
    ];
    saveProducts(initialData);
  }
}

// --- RUN: Panggil fungsi saat halaman selesai dimuat ---
document.addEventListener("DOMContentLoaded", () => {
  initializeData();
  renderProducts();

  // Contoh cara menambahkan produk baru (Anda bisa memanggil fungsi ini dari tombol 'Tambah Data')
  // addProduct('Produk Baru', 50000, 10);
});
