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

function returnOrderItem(itemInd, itemPrefix) {
    return `<div class="order-item">
                <h3>${orderBasket[itemInd].name}</h3>
                    <div class="order-details">
                        <div class="amount-btn button" onclick="decreaseAmount(${itemInd})">-</div>
                        <div id="${itemPrefix}-item-amount-${itemInd}">${orderBasket[itemInd].amount}x</div>
                        <div class="amount-btn button" onclick="increaseAmount(${itemInd})">+</div>
                        <div id="${itemPrefix}-items-price-${itemInd}"></div>
                        <img src="./assets/icons/trash-icon.png" alt="Löschen" onclick="deleteItem(${itemInd})" class="button">
                    </div>
            </div>`;
}

function returnEmptyBasketMessage() {
    return `<div class="empty-basket">
                                Dein Warenkorb ist noch leer 🛒<br>
                                Füge jetzt ein leckeres Gericht hinzu!
                            </div>`;
}

function returnResponsiveButton() {
    return `<div id="show-basket" onclick="showBasketOverlay()" class="button">
                <div class="mobile-basket">
                    <img src="./assets/icons/basket-solid-24.png" alt="">
                    <span class="dish-counter" id="mobile-counter-for-dishes"></span>
                </div>
                <span>Warenkorb anzeigen</span>
                <b id="hidden-button-sum"></b>
            </div>`;
}