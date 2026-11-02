/* =========================================
   DATA PRODUK
   ========================================= */

const products = {

    sunny: [

        {
            name: "Side Stripe Sporty Pants",
            price: "Rp 249.000",
            image: "reference/celana.jpg",
            description:
                "Celana panjang dengan desain casual stripe yang cocok digunakan untuk aktivitas olah raga."
        },

        {
            name: "Track Jacket",
            price: "Rp 455.000",
            image: "reference/baju.jpg",
            description:
                "Jacket classic style dengan bahan ringan dan nyaman."
        },

        {
            name: "Padel Shirt",
            price: "Rp 299.000",
            image: "reference/baju(1).jpg",
            description:
                "T-Shirt dengan tampilan santai dan modern, cocok dipadukan dengan celana pendek atau jeans."
        }

    ],


    europe: [

        {
            name: "Paris Classic",
            price: "Rp 399.000",
            image: "reference/1.jpg",
            description:
                "Gaya klasik yang terinspirasi dari street fashion Eropa."
        },

        {
            name: "Violet",
            price: "Rp 599.000",
            image: "reference/3.jpg",
            description:
                "Outerwear dengan siluet klasik yang cocok digunakan untuk tampilan formal maupun casual."
        },

        {
            name: "Milan Dress",
            price: "Rp 429.000",
            image: "reference/5.jpg",
            description:
                "Gaun ala Gothic yang simpel namun memberikan tampilan yang elegan."
        }

    ],


    sport: [

        {
            name: "adidas cross Padel racket ",
            price: "Rp 899.000",
            image: "reference/alat olga.jpg",
            description:
                "Raket Padel dengan desain minimalis, perfoma maksimal. Dirancang dengan estetika bersih dan garis yang presisi. Cocok untuk anda yang menyukai gaya clean."
        },

        {
            name: "golf swing",
            price: "Rp 449.000",
            image: "reference/alat olga(1).jpg",
            description:
                "Stik Golf hadir dengan finishing matte yang halus dan detail. Memancarkan kesan berkelas dan profesional di atas padang rumput."
        },

        {
            name: "Training Set",
            price: "Rp 499.000",
            image: "reference/alat olga.jpg",
            description:
                "Set pakaian training yang nyaman untuk gym, workout, dan kegiatan olahraga lainnya."
        }

    ]

};


/* =========================================
   MENYIMPAN PRODUK YANG SEDANG DILIHAT
   ========================================= */

let currentIndex = {

    sunny: 0,

    europe: 0,

    sport: 0

};


/* =========================================
   MENAMPILKAN PRODUK
   ========================================= */

function displayProduct(category) {

    const product = products[category][currentIndex[category]];

    const image =
        document.getElementById(category + "-image");

    const name =
        document.getElementById(category + "-name");

    const price =
        document.getElementById(category + "-price");

    const description =
        document.getElementById(category + "-description");

    const number =
        document.getElementById(category + "-number");


    image.src = product.image;

    name.textContent = product.name;

    price.textContent = product.price;

    description.textContent = product.description;


    number.textContent =
        `${String(currentIndex[category] + 1).padStart(2, "0")} / ${String(products[category].length).padStart(2, "0")}`;
}


/* =========================================
   NEXT / BACK
   ========================================= */

function changeProduct(category, direction) {

    currentIndex[category] += direction;


    // Jika sudah sampai produk terakhir
    if (currentIndex[category] >= products[category].length) {

        currentIndex[category] = 0;

    }


    // Jika menekan back pada produk pertama
    if (currentIndex[category] < 0) {

        currentIndex[category] =
            products[category].length - 1;

    }


    displayProduct(category);

}


/* =========================================
   LOAD PRODUK PERTAMA
   ========================================= */

displayProduct("sunny");

displayProduct("europe");

displayProduct("sport");



/* =========================================
   SISTEM KERANJANG DAN CHECKOUT
   ========================================= */

// Menyimpan barang yang dipilih pembeli
let cart = [];  

// Mengubah angka menjadi format Rupiah
function formatRupiah(price) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(price);
}

// Mengambil harga dari data produk, misalnya "Rp 249.000" -> 249000
function getPriceNumber(price) {
    return Number(price.replace(/[^\d]/g, ""));
}

// Menambahkan produk ke keranjang
function addToCart(category) {
    const product = products[category][currentIndex[category]];

    // Cek apakah produk sudah ada di keranjang
    const existingProduct = cart.find(
        item => item.name === product.name
    );

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: product.name.trim(),
            price: getPriceNumber(product.price),
            quantity: 1,
            category: category
        });
    }

    renderCart();

    alert(product.name.trim() + " berhasil ditambahkan ke keranjang!");
}

// Menampilkan isi keranjang dan total harga
function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItems || !cartTotal) {
        console.error("Elemen cart-items atau cart-total tidak ditemukan di HTML.");
        return;
    }

    cartItems.replaceChildren();

    let total = 0;

    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        const row = document.createElement("div");
        const info = document.createElement("p");
        const removeButton = document.createElement("button");
        removeButton.className = "remove-btn";

        info.textContent =
            `${item.name} × ${item.quantity} — ${formatRupiah(subtotal)}`;

        removeButton.textContent = "Hapus";
        removeButton.type = "button";

        removeButton.addEventListener("click", () => {
            cart.splice(index, 1);
            renderCart();
        });

        row.append(info, removeButton);
        cartItems.appendChild(row);
    });

    cartTotal.textContent = formatRupiah(total);
}

// Mengumpulkan data pesanan saat checkout
function checkoutCart() {
    if (cart.length === 0) {
        alert("Keranjang kamu masih kosong!");
        return;
    }

    const order = {
        items: cart.map(item => ({ ...item })),
        total: cart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        )
    };

    console.log("DATA PESANAN:", order);

    // Contoh: tampilkan ringkasan pesanan
    const summary = order.items.map(item =>
        `${item.name} x${item.quantity} = ${
            formatRupiah(item.price * item.quantity)
        }`
    ).join("\n");

    alert(
        "RINGKASAN PESANAN\n\n" +
        summary +
        "\n\nTOTAL: " + formatRupiah(order.total)
    );
}


//coba nyimpen di localstorage html5(fitur bawaan)
localStorage.setItem('KatalogProduk', JSON.stringify(products));
const Datakatalog = JSON.parse(localStorage.getItem('KatalogProduk'));
const produkpertama = Datakatalog.sunny[0];