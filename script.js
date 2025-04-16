const mainCourse = [
    {
        name: "Spaghetti Carbonara",
        description:
            "Spaghetti mit cremiger Sauce aus Ei, Pecorino, Pancetta und schwarzem Pfeffer",
        price: 11.5,
    },
    {
        name: "Lasagne alla Bolognese",
        description:
            "Geschichtete Pasta mit Rinderhack, Tomatensauce, Béchamel und Parmesan",
        price: 12.9,
    },
    {
        name: "Risotto ai Funghi",
        description:
            "Cremiges Risotto mit gemischten Pilzen, Knoblauch und frischen Kräutern",
        price: 13.2,
    },
    {
        name: "Gnocchi al Pesto",
        description:
            "Hausgemachte Kartoffelgnocchi mit frischem Basilikumpesto und gerösteten Pinienkernen",
        price: 11.8,
    },
    {
        name: "Saltimbocca alla Romana",
        description:
            "Kalbsschnitzel mit Salbei und Parmaschinken in Weißweinsauce, serviert mit Rosmarinkartoffeln",
        price: 15.4,
    },
];

function renderMainCourse() {
    const mainRef = document.getElementById("main-courses");

    for (mainIndex = 0; mainIndex < mainCourse.length; mainIndex++) {
        mainRef.innerHTML += returnMainDishes(mainIndex);
    }
}

function returnMainDishes(dishIndex) {
    return `    <div>
                    <div>
                        <h3>${mainCourse[dishIndex].name}</h3>
                        <p>${mainCourse[dishIndex].description}</p>
                        <b>${properPrice(dishIndex)}</b>
                    </div>
                    <div>+</div>
                </div>`;
}

function properPrice(priceIndex){
    const priceRef = mainCourse[priceIndex].price;
    const newPrice = priceRef.toFixed(2);
    newPrice.replace('.', ',');
    return newPrice + ' ' + '€';
}
