function renderMainCourse() {
    const mainRef = document.getElementById("main-courses");

    for (mainIndex = 0; mainIndex < mainCourse.length; mainIndex++) {
        mainRef.innerHTML += returnMainDishes(mainIndex);
    }
    renderOrderBasket();
    renderRWDOrderBasket();
}

function renderOrderBasket() {
    const orderRef = document.getElementById("order-basket");
    orderRef.innerHTML = "";
    if (orderBasket.length == 0) {
        orderRef.innerHTML = returnEmptyBasketMessage();
    } else {
        for (orderInd = 0; orderInd < orderBasket.length; orderInd++) {
            orderRef.innerHTML += returnOrderItem(orderInd, "desktop");
        }
        for (priceInd = 0; priceInd < orderBasket.length; priceInd++) {
            totalPricePerItem(priceInd);
        }
    }
    showSubtotalSum();
}

function renderRWDOrderBasket() {
    const orderRef = document.getElementById("rwd-order-content");
    orderRef.innerHTML = "";
    if (orderBasket.length == 0) {
        orderRef.innerHTML = returnEmptyBasketMessage();
    } else {
        for (orderInd = 0; orderInd < orderBasket.length; orderInd++) {
            orderRef.innerHTML += returnOrderItem(orderInd, "mobile");
        }
        for (priceInd = 0; priceInd < orderBasket.length; priceInd++) {
            totalPricePerItem(priceInd);
        }
    }
    showSubtotalSum();
}

function renderResponsiveButton() {
    const btnRef = document.getElementById("hidden-basket-button");
    btnRef.innerHTML = returnResponsiveButton();
}