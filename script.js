// MOBILE MENU TOGGLE

const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

hamburger.addEventListener("click", (e) => {
    e.preventDefault();
    mobileMenu.classList.toggle("mobile-menu-active");
});

// NAVIGATION CLICK SCROLL + CLOSE MOBILE MENU
const navLinks = document.querySelectorAll(".navlist a, .mobile-menu a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("mobile-menu-active");
    });
});


// SWIPER REVIEW SLIDER
var swiper = new Swiper(".mySwiper", {
    loop: true,
    navigation: {
        nextEl: "#next",
        prevEl: "#prev",
    },
});


// CART SYSTEM

const cartIcon = document.querySelector(".cart-icon");
const cartValue = document.querySelector(".cart-value");
const addToCartButtons = document.querySelectorAll(".order-card .btn");

let cart = [];

// Create Cart Box Dynamically
const cartTab = document.createElement("div");
cartTab.classList.add("cart-tab");
cartTab.style.position = "fixed";
cartTab.style.top = "50%";
cartTab.style.right = "-400px";
cartTab.style.transform = "translateY(-50%)";
cartTab.style.zIndex = "1000";
cartTab.style.transition = "0.4s";

cartTab.innerHTML = `
<h3>Your Cart</h3>
<div class="cart-list"></div>
<div class="total">
    <h4>Total</h4>
    <h4 class="cart-total">₹0</h4>
</div>
<div class="btn-container">
    <a href="#" class="btn close-btn">Close</a>
    <a href="#" class="btn checkout-btn">Checkout</a>
</div>
`;

document.body.appendChild(cartTab);

const cartList = cartTab.querySelector(".cart-list");
const cartTotal = cartTab.querySelector(".cart-total");
const closeBtn = cartTab.querySelector(".close-btn");

// Open Cart
cartIcon.addEventListener("click", (e) => {
    e.preventDefault();
    cartTab.style.right = "20px";
});

// Close Cart
closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    cartTab.style.right = "-400px";
});


// ADD TO CART FUNCTION

addToCartButtons.forEach((button, index) => {
    button.addEventListener("click", (e) => {
        e.preventDefault();

        const card = button.closest(".order-card");
        const name = card.querySelector(".food-name").innerText;
        const price = parseInt(card.querySelector(".price").innerText.replace("₹", ""));
        const image = card.querySelector("img").src;

        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.qty += 1;
        } else {
            cart.push({
                name,
                price,
                image,
                qty: 1
            });
        }

        updateCart();
    });
});


// UPDATE CART UI

function updateCart() {
    cartList.innerHTML = "";
    let total = 0;
    let totalQty = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;
        totalQty += item.qty;

        const div = document.createElement("div");
        div.classList.add("item");

        div.innerHTML = `
            <div class="item-image">
                <img src="${item.image}">
            </div>
            <div class="item-info">
                <h4>${item.name}</h4>
                <div class="qty-box">
                    <button class="qty-btn minus" data-index="${index}">-</button>
                    <span class="qty-value">${item.qty}</span>
                    <button class="qty-btn plus" data-index="${index}">+</button>
                </div>
            </div>
            <div class="item-total">
                ₹${item.price * item.qty}
            </div>
        `;

        cartList.appendChild(div);
    });

    cartTotal.innerText = "₹" + total;
    cartValue.innerText = totalQty;

    addQtyFunction();
}


// INCREASE / DECREASE QTY

function addQtyFunction() {
    const plusBtns = document.querySelectorAll(".plus");
    const minusBtns = document.querySelectorAll(".minus");

    plusBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const index = btn.dataset.index;
            cart[index].qty += 1;
            updateCart();
        });
    });

    minusBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const index = btn.dataset.index;
            cart[index].qty -= 1;

            if (cart[index].qty <= 0) {
                cart.splice(index, 1);
            }

            updateCart();
        });
    });
}


// CHECKOUT BUTTON

const checkoutBtn = cartTab.querySelector(".checkout-btn");

checkoutBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert("Order placed successfully! 🎉");
        cart = [];
        updateCart();
        cartTab.style.right = "-400px";
    }
});