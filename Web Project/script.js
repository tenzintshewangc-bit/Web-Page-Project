/* =========================================
   VARIABLES
========================================= */

let cart = [];

let total = 0;



/* =========================================
   SEARCH ARTWORK 
========================================= */

const searchInput =
    document.getElementById("searchInput");

const artworkCards =
    document.querySelectorAll(".art-card");


searchInput.addEventListener("input", function () {

    const searchText =
        searchInput.value.toLowerCase();


    artworkCards.forEach(function (card) {

        const name =
            card.dataset.name.toLowerCase();


        if (name.includes(searchText)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});



/* =========================================
   CATEGORY FILTER
========================================= */

const categoryFilter =
    document.getElementById("categoryFilter");


categoryFilter.addEventListener("change", function () {

    const selected =
        categoryFilter.value;


    artworkCards.forEach(function (card) {

        const category =
            card.dataset.category;


        if (
            selected === "all" ||
            selected === category
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});



/* =========================================
   FILTER FROM COLLECTION BUTTON
========================================= */

function filterCategory(category) {

    categoryFilter.value = category;

    categoryFilter.dispatchEvent(
        new Event("change")
    );

    document.getElementById("shop")
        .scrollIntoView({
            behavior: "smooth"
        });

}



/* =========================================
   ADD TO CART
========================================= */

function addToCart(name, price) {

    cart.push({
        name: name,
        price: price
    });


    total += price;


    updateCartCount();

    showNotification();

}



/* =========================================
   UPDATE CART COUNT
========================================= */

function updateCartCount() {

    document.getElementById("cartCount")
        .textContent = cart.length;


    document.getElementById("cartNumber")
        .textContent = cart.length;

}



/* =========================================
   NOTIFICATION
========================================= */

function showNotification() {

    const notification =
        document.getElementById("notification");


    notification.classList.add("show");


    setTimeout(function () {

        notification.classList.remove("show");

    }, 2000);

}



/* =========================================
   VIEW ARTWORK
========================================= */

function viewArtwork(
    title,
    category,
    price,
    image
) {

    document.getElementById("modalTitle")
        .textContent = title;


    document.getElementById("modalCategory")
        .textContent = category;


    document.getElementById("modalPrice")
        .textContent = price;


    document.getElementById("modalImage")
        .src = image;


    document.getElementById("artModal")
        .style.display = "flex";


    /* Add artwork from modal */

    document.getElementById("modalCartButton")
        .onclick = function () {

            let numericPrice =
                parseInt(
                    price
                        .replace("Nu.", "")
                        .replace(",", "")
                );


            addToCart(title, numericPrice);

        };

}



/* =========================================
   CLOSE ARTWORK MODAL
========================================= */

function closeModal() {

    document.getElementById("artModal")
        .style.display = "none";

}



/* =========================================
   FAVORITE ARTWORK
========================================= */

function favoriteArtwork(button) {

    if (button.textContent.trim() === "♡") {

        button.textContent = "♥";

        button.classList.add("liked");

    } else {

        button.textContent = "♡";

        button.classList.remove("liked");

    }

}



/* =========================================
   OPEN CART
========================================= */

function openCart() {

    updateCart();

    document.getElementById("cartModal")
        .style.display = "flex";

}



/* =========================================
   CLOSE CART
========================================= */

function closeCart() {

    document.getElementById("cartModal")
        .style.display = "none";

}



/* =========================================
   UPDATE CART
========================================= */

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");


    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

    } else {

        cartItems.innerHTML = "";


        cart.forEach(function (item, index) {

            const itemElement =
                document.createElement("p");


            itemElement.innerHTML =
                "🎨 " +
                item.name +
                " — Nu. " +
                item.price.toLocaleString();


            cartItems.appendChild(itemElement);

        });

    }


    document.getElementById("cartTotal")
        .textContent =
        total.toLocaleString();

}



/* =========================================
   CHECKOUT
========================================= */

function checkout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty!"
        );

        return;

    }


    alert(
        "Thank you for supporting Bhutanese art! 🩵\n\n" +
        "Your total is Nu. " +
        total.toLocaleString()
    );

}



/* =========================================
   ABOUT BUTTON
========================================= */

function showAboutMessage() {

    alert(
        "DrukYul Art House celebrates Bhutanese heritage by connecting traditional art with modern creativity."
    );

}



/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
    document.getElementById("contactForm");


contactForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document.getElementById("name").value;


        alert(
            "Thank you, " +
            name +
            "! Your message has been received."
        );


        contactForm.reset();

    }
);



/* =========================================
   CLOSE MODALS WHEN CLICKING OUTSIDE
========================================= */

window.addEventListener(
    "click",
    function (event) {

        const artModal =
            document.getElementById("artModal");

        const cartModal =
            document.getElementById("cartModal");


        if (event.target === artModal) {

            closeModal();

        }


        if (event.target === cartModal) {

            closeCart();

        }

    }
);