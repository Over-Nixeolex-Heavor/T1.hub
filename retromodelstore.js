const titleEl = document.getElementById("app-title");
const contentEl = document.getElementById("app-content");
const balanceEl = document.getElementById("app-balance");

let balance = 120;
let cryptoBalance = 0;
const CRYPTO_RATE = 10; // 1 dollar = 10 fake-coins
let currentView = "store";

function showNotification(message) {
  let note = document.querySelector(".ios-note");
  if (!note) {
    note = document.createElement("div");
    note.className = "ios-note";
    document.body.appendChild(note);
  }

  note.textContent = message;
  note.classList.remove("ios-note--visible");

  // Force reflow so the animation can restart
  // eslint-disable-next-line no-unused-expressions
  note.offsetHeight;

  note.classList.add("ios-note--visible");

  clearTimeout(note._hideTimer);
  note._hideTimer = setTimeout(() => {
    note.classList.remove("ios-note--visible");
  }, 1800);
}

function renderBalance() {
  const cash = `$${balance}`;
  const crypto = `◎${cryptoBalance.toFixed(1)}`;
  balanceEl.textContent = `${cash} · ${crypto}`;
}

function getCryptoCost(priceValue) {
  return priceValue * CRYPTO_RATE;
}

const products = [
  {
    name: "red part",
    description: "A mysterious red block straight from the classic toolbox.",
    price: "$50",
    priceValue: 50,
    id: 379957068
  },
  {
    name: "evil builderman",
    description: "A sinister twist on a legendary creator, for daring collectors only.",
    price: "$100",
    priceValue: 100,
    id: 665740432
  }
];

function renderShop() {
  currentView = "store";
  titleEl.textContent = "Store";
  renderBalance();
  updateNavSegments();

  const list = document.createElement("div");
  list.className = "product-list";

  products.forEach((product) => {
    const item = document.createElement("div");
    item.className = "product-item";

    const nameRow = document.createElement("div");
    nameRow.className = "product-header";

    const name = document.createElement("div");
    name.className = "product-name";
    name.textContent = product.name;

    const price = document.createElement("div");
    price.className = "product-price";
    price.textContent = `${product.price} / ◎${getCryptoCost(product.priceValue)}`;

    nameRow.appendChild(name);
    nameRow.appendChild(price);

    const desc = document.createElement("div");
    desc.className = "product-description";
    desc.textContent = product.description;

    const actionRow = document.createElement("div");
    actionRow.className = "product-action-row";

    const button = document.createElement("button");
    button.className = "buy-button";
    button.type = "button";
    button.textContent = "Buy";
    button.addEventListener("click", () => {
      let paidWith = null;

      if (balance >= product.priceValue) {
        // Pay with cash first if possible
        balance -= product.priceValue;
        paidWith = "cash";
      } else {
        const cryptoCost = getCryptoCost(product.priceValue);
        if (cryptoBalance >= cryptoCost) {
          cryptoBalance -= cryptoCost;
          paidWith = "crypto";
        }
      }

      if (!paidWith) {
        alert("Not enough cash or fake-crypto.");
        return;
      }

      renderBalance();

      button.textContent = "Added";
      button.disabled = true;

      showNotification(`Bought Model: ${product.name} ID: ${product.id}`);
    });

    actionRow.appendChild(button);

    item.appendChild(nameRow);
    item.appendChild(desc);
    item.appendChild(actionRow);

    list.appendChild(item);
  });

  contentEl.innerHTML = "";
  contentEl.appendChild(list);
}

function renderCrypto() {
  currentView = "crypto";
  titleEl.textContent = "Fake Crypto";
  renderBalance();
  updateNavSegments();

  const container = document.createElement("div");
  container.className = "product-list";

  const item = document.createElement("div");
  item.className = "product-item";

  const header = document.createElement("div");
  header.className = "product-header";

  const name = document.createElement("div");
  name.className = "product-name";
  name.textContent = "TestCoin (◎)";

  const rate = document.createElement("div");
  rate.className = "product-price";
  rate.textContent = `1$ → ◎${CRYPTO_RATE}`;

  header.appendChild(name);
  header.appendChild(rate);

  const desc = document.createElement("div");
  desc.className = "product-description";
  desc.textContent =
    "Convert your shop balance into fake TestCoin and use it to buy models when cash runs out.";

  const actionRow = document.createElement("div");
  actionRow.className = "product-action-row";

  const makeConvertButton = (amount) => {
    const btn = document.createElement("button");
    btn.className = "buy-button";
    btn.type = "button";
    btn.textContent = `Convert $${amount}`;
    btn.addEventListener("click", () => {
      if (balance < amount) {
        alert("Not enough cash to convert.");
        return;
      }
      balance -= amount;
      cryptoBalance += amount * CRYPTO_RATE;
      renderBalance();
      showNotification(`Converted $${amount} → ◎${(amount * CRYPTO_RATE).toFixed(1)} TestCoin`);
    });
    return btn;
  };

  const btn10 = makeConvertButton(10);
  const btn25 = makeConvertButton(25);
  const btn50 = makeConvertButton(50);

  actionRow.appendChild(btn10);
  actionRow.appendChild(btn25);
  actionRow.appendChild(btn50);

  item.appendChild(header);
  item.appendChild(desc);
  item.appendChild(actionRow);

  container.appendChild(item);

  contentEl.innerHTML = "";
  contentEl.appendChild(container);
}

function updateNavSegments() {
  const segStore = document.getElementById("nav-seg-store");
  const segCrypto = document.getElementById("nav-seg-crypto");
  if (!segStore || !segCrypto) return;

  segStore.classList.toggle("nav-seg-btn--active", currentView === "store");
  segCrypto.classList.toggle("nav-seg-btn--active", currentView === "crypto");
}

function initNav() {
  const side = document.querySelector(".app-nav-side");
  if (!side) return;

  side.innerHTML = "";

  const seg = document.createElement("div");
  seg.className = "nav-segmented";

  const btnStore = document.createElement("button");
  btnStore.id = "nav-seg-store";
  btnStore.type = "button";
  btnStore.className = "nav-seg-btn";
  btnStore.textContent = "Store";
  btnStore.addEventListener("click", () => {
    if (currentView !== "store") renderShop();
  });

  const btnCrypto = document.createElement("button");
  btnCrypto.id = "nav-seg-crypto";
  btnCrypto.type = "button";
  btnCrypto.className = "nav-seg-btn";
  btnCrypto.textContent = "Crypto";
  btnCrypto.addEventListener("click", () => {
    if (currentView !== "crypto") renderCrypto();
  });

  seg.appendChild(btnStore);
  seg.appendChild(btnCrypto);
  side.appendChild(seg);
}

function initApp() {
  initNav();
  renderShop();
}

document.addEventListener("DOMContentLoaded", initApp);
