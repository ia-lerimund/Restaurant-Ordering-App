import { menuArray } from "/data.js";

const menu = document.getElementById("menu");
const order = document.getElementById("order");
const orderContent = document.getElementById("order-content");
const totalPrice = document.getElementById("total-price");
const completeOrderBtn = document.getElementById("complete-order");
const payBtn = document.getElementById("pay-button");
const cardDetailsForm = document.getElementById("form");
const formDetails = document.getElementById("form-details");
const finalMessage = document.getElementById("final-message");

let orderedItems = [];

completeOrderBtn.addEventListener("click", function () {
	cardDetailsForm.style.display = "flex";
});

payBtn.addEventListener("click", function (e) {
	e.preventDefault();
	const formData = new FormData(formDetails);
	const formName = formData.get("name");

	cardDetailsForm.innerHTML = `
      <div class="container">
        <p class="processed">Your data is being processed, please wait</p>
        <image class="loading-icon" src="/img/loading.svg" alt="loading-icon">
      </div>
    `;

	setTimeout(function () {
		orderContent.style.display = "none";
		cardDetailsForm.style.display = "none";
		finalMessage.style.display = "flex";
		finalMessage.innerHTML = `Thanks ${formName}! <br>Your order is on its way!`;
	}, 3000);

	orderedItems = [];
	formDetails.reset();
});

document.addEventListener("click", function (e) {
	if (e.target.dataset.add) {
		handleAddButton(e.target.dataset.add);
	} else if (e.target.dataset.index) {
		removeItem(e.target.dataset.index);
	}
});

function removeItem(index) {
	orderedItems.splice(index, 1);
	generateOrder();
	generateTotalPrice();
}

function handleAddButton(itemId) {
	let targetItem = menuArray.filter(function (item) {
		return item.id == itemId;
	})[0];
	orderedItems.push(targetItem);
	generateOrder();
	generateTotalPrice();
}

function generateOrder() {
	orderContent.style.display = "block";
	const orderHtml = orderedItems.map((item, index) => {
		return `
    <div class="item-value">
      <div class="item-info">
        <h3>${item.name}</h3>
        <p class="remove" data-index="${index}">remove</p>
      </div>
      <p class="item-price">$${item.price}</p>
    </div>
    `;
	});

	if (orderedItems.length === 0) {
		orderContent.style.display = "none";
	}
	order.innerHTML = orderHtml.join("");
}

function generateTotalPrice() {
	let totalPriceValue = 0;
	for (let el = 0; el < orderedItems.length; el++) {
		totalPriceValue += orderedItems[el].price;
		totalPrice.innerHTML = `$${totalPriceValue}`;
	}
}

function generateMenu() {
	for (let item of menuArray) {
		menu.innerHTML += `
  <div class="item">
    <div class="item-img-box">
      <img class="item-img" src="${item.image}" alt="${item.name}" />
    </div>
    <div class="item-info">
      <div class="item-desc">
        <h3>${item.name}</h3>
        <p class="ingredients">
          ${item.ingredients}
        </p>
        <p>$${item.price}</p>
      </div>
      <div class="add-button">
        <i data-add="${item.id}" class="fa-solid fa-plus" id="add-item"></i>
      </div>
    </div>
  </div>`;
	}
}

generateMenu();
