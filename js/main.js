
$(document).ready(function () {

    $('.login').click(function () {
        window.location.href = 'html/login.html';
    })
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
    const validUser = users.find(u => u.email === currentUser.email);

    if (validUser) {
        $('.login').text("Profile");
    }
    else {
        $('.login').text('Login');
    }
})

//fetch products from API
$(document).ready(function () {
    let productsPerPage = 5;
    let currentPage = 1;
    let products = [];

    $.ajax({
        url: "https://fakestoreapi.com/products",
        method: "GET",
        success: function (Data) {
            products = Data
            showProducts();
        }
    });

    let startOfPrevBtn;
    let startOfNextBtn;
    // Show products of current page
    function showProducts() {
        $(".card-content").empty();

        let start = (currentPage - 1) * productsPerPage;
        let end = start + productsPerPage;
        let paginatedProducts = products.slice(start, end);

        paginatedProducts.forEach(product => {
            $(".card-content").append(`
                    <div class="card-pro text-left m-2">
                         <img class="card-img-top h-50" src="${product.image}" alt="">
                         <div class="card-body">
                              <h6 class="card-title"> <span>90% off </span> Limited time deal</h6>
                               <p class="card-text pt-3 fs-3">$${product.price}</p>
                               <p class="card-text fs-6">${product.title} </p>
                         </div>
                    </div>
                `);
        });

        startOfPrevBtn = 1;
        startOfNextBtn = Math.ceil(products.length / productsPerPage);
        $(".prev-btn").prop("disabled", currentPage === startOfPrevBtn);
        $(".next-btn").prop("disabled", currentPage === startOfNextBtn);
    }

    function changePage(newPage, direction) {
        let productsContainer = $(".card-content");

        //add animation 
        productsContainer.addClass(direction === "next" ? "moveright" : "moveleft");

        setTimeout(() => {
            currentPage = newPage;
            showProducts();
            productsContainer.removeClass("moveright moveleft");
        });
    }

    $(".prev-btn").on("click", function () {
        if (currentPage > startOfPrevBtn) {
            changePage(currentPage - 1, "prev");
        }
    });

    $(".next-btn").on("click", function () {
        if (currentPage < startOfNextBtn) {
            changePage(currentPage + 1, "next");
        }
    });
})


