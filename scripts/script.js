function init(){
    renderMainCourse();
    showSubtotalSum();
    showTotalSum();
    renderResponsiveButton();
}

function properPrice(priceIndex) {
    const priceRef = mainCourse[priceIndex].price;
    const newPrice = priceRef.toFixed(2).replace(".", ",");
    return newPrice + " " + "€";
}

function addToBasket(clickInd) {
    const indexCheck = orderBasket.findIndex((order) => order.id === mainCourse[clickInd].id);
    if (indexCheck !== -1) {
        increaseAmount(indexCheck);
    } else {
        orderBasket.push(mainCourse[clickInd]);
        const newIndex = orderBasket.length - 1;
        addAmountToBasket(newIndex);
        renderOrderBasket();
        renderRWDOrderBasket();
    }
    const newIndex = orderBasket.length - 1;
    totalPricePerItem(newIndex);
    showSubtotalSum();
    dishCounter();
}

function addAmountToBasket(amountInd) {
    orderBasket[amountInd].amount = 1;
}

function increaseAmount(incInd) {
    orderBasket[incInd].amount++;
    const amountDesktopRef = document.getElementById(`desktop-item-amount-${incInd}`);
    if (amountDesktopRef) {
        amountDesktopRef.innerHTML = orderBasket[incInd].amount + "x";
    }
    const amountMobileRef = document.getElementById(`mobile-item-amount-${incInd}`);
    if (amountMobileRef) {
        amountMobileRef.innerHTML = orderBasket[incInd].amount + "x";
    }
    totalPricePerItem(incInd);
    showSubtotalSum();
    dishCounter();
}

function decreaseAmount(decInd) {
    if (orderBasket[decInd].amount === 1) {
        deleteItem(decInd);
    } else {
        orderBasket[decInd].amount -= 1;
        decreaseDesktopAmount(decInd);
        decreaseMobileAmount(decInd);
        totalPricePerItem(decInd);
        showSubtotalSum();
        dishCounter();
    }
}

function decreaseDesktopAmount(ddaInd){
    const desktopAmountRef = document.getElementById(`desktop-item-amount-${ddaInd}`);
        if (desktopAmountRef) {
            desktopAmountRef.innerHTML = orderBasket[ddaInd].amount + "x";
        }
}

function decreaseMobileAmount(dmaInd){
    const mobileAmountRef = document.getElementById(`mobile-item-amount-${dmaInd}`);
        if (mobileAmountRef) {
            mobileAmountRef.innerHTML = orderBasket[dmaInd].amount + "x";
        }
}

function totalPricePerItem(totalPriceInd) {
    const desktopIdRef = document.getElementById(`desktop-items-price-${totalPriceInd}`);
    const mobileIdRef = document.getElementById(`mobile-items-price-${totalPriceInd}`);
    const priceRef = orderBasket[totalPriceInd].price;
    const newPrice = priceRef * orderBasket[totalPriceInd].amount;
    const finalPrice = newPrice.toFixed(2).replace(".", ",");
    if (desktopIdRef) {
        desktopIdRef.innerHTML = finalPrice + " " + "€";
    }
    if (mobileIdRef) {
        mobileIdRef.innerHTML = finalPrice + " " + "€";
    }
}

function deleteItem(arrInd) {
    orderBasket.splice(arrInd, 1);
    renderOrderBasket();
    renderRWDOrderBasket();
    dishCounter();
}

function subtotalSum() {
    let subtotal = 0;
    for (let subSum = 0; subSum < orderBasket.length; subSum++) {
        subtotal += orderBasket[subSum].price * orderBasket[subSum].amount;
    }
    return subtotal;
}

function showSubtotalSum() {
    const subtotalRef = document.getElementById("subtotal-sum");
    const subtotalRWDRef = document.getElementById("rwd-subtotal-sum");
    const subtotal = subtotalSum();
    const finalSubtotal = subtotal.toFixed(2).replace(".", ",") + " €";
    subtotalRef.innerHTML = finalSubtotal;
    subtotalRWDRef.innerHTML = finalSubtotal;
    showTotalSum();
}

function showTotalSum() {
    const totalRef = document.getElementById("total-sum");
    const totalRWDRef = document.getElementById("rwd-total-sum");
    const subtotal = subtotalSum();
    const deliveryCost = 3.99;
    const total = subtotal + deliveryCost;
    const finalTotal = total.toFixed(2).replace(".", ",") + " €";
    totalRef.innerHTML = finalTotal;
    totalRWDRef.innerHTML = finalTotal;
}

function resetOrder() {
    if (orderBasket.length > 0){
        orderBasket = [];
        const orderRef = document.getElementById("order-basket");
        orderRef.innerHTML = "";

        resetOrderText()
        showSubtotalSum();
        orderDesktopConfirmation();
        orderMobileConfirmation();
        renderOrderBasket();
        renderRWDOrderBasket();
        dishCounter();
    }
}

function resetOrderText(){
    const btnRef = document.getElementById("order-btn");
    btnRef.innerHTML = "Das hat geklappt!";
}

function orderDesktopConfirmation() {
    const confirmRef = document.getElementById("order-confirm");
    const btnRef = document.getElementById("order-btn");

    confirmRef.classList.remove("d-none");
    confirmRef.innerHTML = "Deine Testbestellung war erfolgreich. Thanks for the money, honey 💸!";

    setTimeout(() => { // asynchrone Funktion, läuft separat neben anderen Funktionen
        confirmRef.classList.add("d-none");
        btnRef.innerHTML = "Jetzt bestellen!";
    }, 4000); //Verzögerung für 4k Milisekunden -> 4 Sekunden
}

function orderMobileConfirmation() {
    const confirmRef = document.getElementById("order-confirm-mobile");
    const btnRef = document.getElementById("rwd-order-btn");

    confirmRef.classList.remove("d-none");
    confirmRef.innerHTML = "Deine Testbestellung war erfolgreich. Thanks for the money, honey 💸!";

    setTimeout(() => { // asynchrone Funktion, läuft separat neben anderen Funktionen
        confirmRef.classList.add("d-none");
        btnRef.innerHTML = "Jetzt bestellen!";
    }, 4000); //Verzögerung für 4k Milisekunden -> 4 Sekunden
}

function showBasketOverlay() {
    const basketRef = document.getElementById("rwd-basket-overlay");
    basketRef.classList.remove("d-none");
    basketRef.classList.add("d-flex");
    basketRef.style.zIndex = 1000;
}

function closeBasketOverlay() {
    const basketRef = document.getElementById("rwd-basket-overlay");
    basketRef.classList.remove("d-flex");
    basketRef.classList.add("d-none");
    basketRef.style.zIndex = -1;
}

function dishCounter() {
    const countRef = document.getElementById("mobile-counter-for-dishes");
    if (!countRef) {
        return;
    }
    let totalDishAmount = 0;
    for (let i = 0; i < orderBasket.length; i++) {
        totalDishAmount += orderBasket[i].amount;
    }
    if (totalDishAmount > 0) {
        countRef.innerText = totalDishAmount;
        countRef.style.display = "inline-block";
    } else {
        countRef.style.display = "none";
    }
}