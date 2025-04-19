const mainCourse = [
    {
        name: "Spaghetti Carbonara",
        description:
            "Spaghetti mit cremiger Sauce aus Ei, Pecorino, Pancetta und schwarzem Pfeffer",
        price: 11.5,
        id: 1,
    },
    {
        name: "Lasagne alla Bolognese",
        description:
            "Geschichtete Pasta mit Rinderhack, Tomatensauce, Béchamel und Parmesan",
        price: 12.9,
        id: 2,
    },
    {
        name: "Risotto ai Funghi",
        description:
            "Cremiges Risotto mit gemischten Pilzen, Knoblauch und frischen Kräutern",
        price: 13.2,
        id: 3,
    },
    {
        name: "Gnocchi al Pesto",
        description:
            "Hausgemachte Kartoffelgnocchi mit frischem Basilikumpesto und gerösteten Pinienkernen",
        price: 11.8,
        id: 4,
    },
    {
        name: "Saltimbocca alla Romana",
        description:
            "Kalbsschnitzel mit Salbei und Parmaschinken in Weißweinsauce, serviert mit Rosmarinkartoffeln",
        price: 15.4,
        id: 5,
    },
];

let orderBasket = [];

function renderMainCourse() {
    const mainRef = document.getElementById("main-courses");

    for (mainIndex = 0; mainIndex < mainCourse.length; mainIndex++) {
        mainRef.innerHTML += returnMainDishes(mainIndex);
    }
}

function returnMainDishes(dishIndex) {
    return `    <div class="dish-cart" onclick="addToBasket(${dishIndex})">
                    <div class="dish-info">
                        <h3>${mainCourse[dishIndex].name}</h3>
                        <p>${mainCourse[dishIndex].description}</p>
                        <b>${properPrice(dishIndex)}</b>
                    </div>
                    <div class="add-button">+</div>
                </div>`;
}

function properPrice(priceIndex) {
    const priceRef = mainCourse[priceIndex].price;
    const newPrice = priceRef.toFixed(2).replace(".", ",");
    return newPrice + " " + "€";
}

function addToBasket(clickInd) {
    const indexCheck = orderBasket.findIndex(
        (order) => order.id === mainCourse[clickInd].id
    );

    if (indexCheck !== -1) {
        increaseAmount(indexCheck);
    } else {
        orderBasket.push(mainCourse[clickInd]);
        
        const newIndex = orderBasket.length - 1;
        addAmountToBasket(newIndex);
        renderOrderBasket();
    }
    const newIndex = orderBasket.length - 1;
    totalPricePerItem(newIndex);
    showSubtotalSum();
}

function renderOrderBasket() {
    const orderRef = document.getElementById("order-basket");
    orderRef.innerHTML = "";

    for (orderInd = 0; orderInd < orderBasket.length; orderInd++) {
        orderRef.innerHTML += returnOrderItem(orderInd);
    }
    for (priceInd = 0; priceInd < orderBasket.length; priceInd++) {
        totalPricePerItem(priceInd);
    }
    showSubtotalSum();
}

function returnOrderItem(itemInd) {
    return `<div class="order-item">
                <h3>${orderBasket[itemInd].name}</h3>
                    <div class="order-details">
                        <div class="amount-btn" onclick="decreaseAmount(${itemInd})">-</div>
                        <div id="item-amount-${itemInd}">${orderBasket[itemInd].amount}x</div>
                        <div class="amount-btn" onclick="increaseAmount(${itemInd})">+</div>
                        <div id="items-price-${itemInd}"></div>
                        <img src="./assets/icons/trash-icon.png" alt="Löschen" onclick="deleteItem(${itemInd})">
                    </div>
            </div>`;
}

function addAmountToBasket(amountInd) {
    orderBasket[amountInd].amount = 1;
}

function increaseAmount(incInd) {
    orderBasket[incInd].amount++;

    const itemAmountRef = document.getElementById(`item-amount-${incInd}`);
    itemAmountRef.innerHTML = orderBasket[incInd].amount + "x";
}

function decreaseAmount(decInd) {
    if(orderBasket[decInd].amount === 1){
        deleteItem(decInd);
    }else{
        orderBasket[decInd].amount -= 1;

        const itemAmountRef = document.getElementById(`item-amount-${decInd}`);
        itemAmountRef.innerHTML = orderBasket[decInd].amount + "x";

        totalPricePerItem(decInd);
        showSubtotalSum();
    }
}

function totalPricePerItem(totalPriceInd) {
    const idRef = document.getElementById(`items-price-${totalPriceInd}`);
    const priceRef = orderBasket[totalPriceInd].price;
    const newPrice = priceRef * orderBasket[totalPriceInd].amount;
    const finalPrice = newPrice.toFixed(2).replace(".", ",");
    idRef.innerHTML = finalPrice + " " + "€";
}

function deleteItem(arrInd) {
    orderBasket.splice(arrInd, 1);
    renderOrderBasket();
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
    const subtotal = subtotalSum();
    const finalSubtotal = subtotal.toFixed(2).replace(".", ",") + " €";
    subtotalRef.innerHTML = finalSubtotal;
    showTotalSum();
}

function showTotalSum() {
    const totalRef = document.getElementById("total-sum");
    const subtotal = subtotalSum();
    const deliveryCost = 3.99;
    const total = subtotal + deliveryCost;
    const finalTotal = total.toFixed(2).replace(".", ",") + " €";
    totalRef.innerHTML = finalTotal;
}

function resetOrder(){
    orderBasket = [];

    const orderRef = document.getElementById("order-basket");
    orderRef.innerHTML = "";

    showSubtotalSum();

    const btnRef = document.getElementById('order-btn');
    btnRef.innerHTML = "Thanks for the money, honey! 💸";
}