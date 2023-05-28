// Fake data
const PRODUCTS_DATA = [
  {
    image: "assets/images/products/air-force-1-white.png",
    name: "Nike Air Force 1",
    price: "109.99€",
  },
  {
    image: "assets/images/products/adidas-stan-smith-white.png",
    name: "Adidas Stan Smith",
    price: "99.99€",
  },
  {
    image: "assets/images/products/puma-rs-x.png",
    name: "Puma RS-X",
    price: "114.99€",
  },
];

const ORDER_STATUS = {
  PENDING: "En attente",
  DELIVERED: "Livrée",
};

const ORDERS_DATA = [
  {
    product: {
      image: "assets/images/products/air-force-1-white.png",
      name: "Nike Air Force 1",
      price: "109.99€",
    },
    date: "28 mai 2023",
    client: "Matt Powell",
    status: ORDER_STATUS.PENDING,
  },
  {
    product: {
      image: "assets/images/products/puma-rs-x.png",
      name: "Puma RS-X",
      price: "114.99€",
    },
    date: "28 mai 2023",
    client: "Tom Darby",
    status: ORDER_STATUS.DELIVERED,
  },
  {
    product: {
      image: "assets/images/products/air-force-1-white.png",
      name: "Nike Air Force 1",
      price: "109.99€",
    },
    date: "28 mai 2023",
    client: "John Parker",
    status: ORDER_STATUS.DELIVERED,
  },
  {
    product: {
      image: "assets/images/products/adidas-stan-smith-white.png",
      name: "Adidas Stan Smith",
      price: "99.99€",
    },
    date: "28 mai 2023",
    client: "Marie Smith",
    status: ORDER_STATUS.DELIVERED,
  },
];

const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const WEEKS = ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6", "Sem 7"];
const MONTHS = [
  "Jan",
  "Fév",
  "Mar",
  "Avr",
  "Mai",
  "Jun",
  "Jul",
  "Aoû",
  "Sep",
  "Oct",
  "Nov",
  "Déc",
];
const YEARS = ["2018", "2019", "2020", "2021", "2022", "2023"];

const FILTERS = {
  DAY: "day",
  WEEK: "week",
  MONTH: "month",
  YEAR: "year",
};

const INCOMES_PER_PERIOD = {
  [FILTERS.DAY]: {
    labels: DAYS,
    values: generateRandomValues(DAYS.length, 1000, 4000),
  },
  [FILTERS.WEEK]: {
    labels: WEEKS,
    values: generateRandomValues(WEEKS.length, 7000, 42000),
  },
  [FILTERS.MONTH]: {
    labels: MONTHS,
    values: generateRandomValues(MONTHS.length, 30000, 180000),
  },
  [FILTERS.YEAR]: {
    labels: YEARS,
    values: generateRandomValues(YEARS.length, 100000, 600000),
  },
};

const CATEGORIES_DATA = [
  { label: "Sport", value: 5 },
  { label: "Sneakers", value: 8 },
  { label: "Mocassins", value: 3 },
  { label: "Autres", value: 2 },
];

// Setting up Chart.js
const CHARTJS_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
};

const incomesCtx = document.getElementById("incomes").getContext("2d");

const gradient = incomesCtx.createLinearGradient(0, 0, 0, 300);
gradient.addColorStop(0, "rgba(252, 82, 150, 1)");
gradient.addColorStop(1, "rgba(246, 112, 98, 0)");

const COLORS = {
  blue: {
    default: "#349be5",
  },
  green: {
    default: "#2ecc71",
  },
  red: {
    default: "#e74c3c",
  },
  orange: {
    default: "#f39c12",
  },
  purple: {
    default: "#9b5de5",
  },
  pink: {
    gradient,
    default: "#fc5296",
  },
};

// # Init charts
// ## Line chart - Incomes
const incomesChart = new Chart(incomesCtx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Revenus",
        data: [],
        fill: true,
        backgroundColor: COLORS.pink.gradient,
        pointBackgroundColor: COLORS.pink.default,
        borderColor: COLORS.pink.default,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 9,
      },
    ],
  },
  options: {
    ...CHARTJS_OPTIONS,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
  },
});

const topCategoriesCtx = document
  .getElementById("top-categories")
  .getContext("2d");

// ## Doughnut chart - Categories
const topCategoriesChart = new Chart(topCategoriesCtx, {
  type: "doughnut",
  data: {
    labels: [],
    datasets: [
      {
        label: "Top Categories",
        data: [],
        backgroundColor: [
          COLORS.purple.default,
          COLORS.red.default,
          COLORS.orange.default,
          COLORS.green.default,
        ],
        borderWidth: 1,
      },
    ],
  },
  options: CHARTJS_OPTIONS,
});

let currentTheme = "light";
// Notification interval
const NOTIFICATION_DELAY = 10000;
let notificationInterval;

// # DOM elements
// ## Variable elements
let currentLink = document.querySelector(".sidebar__links li a.active");
let currentPeriodFilter = document.querySelector(".period__filter span.active");

// # Static elements
const themeToggleElt = document.querySelector(".settings__theme");
const languageElt = document.querySelector(".settings__language");
const profileElt = document.querySelector(".settings__profile");
const navLinks = document.querySelectorAll(".sidebar__links li a");
const filtersPeriods = document.querySelectorAll(".period__filter span");
const sidebarElt = document.querySelector(".sidebar");
const sidebarOpenElt = document.querySelector(".sidebar__open__button");
const sidebarCloseElt = document.querySelector(".sidebar__close__button");
const notificationElt = document.querySelector(".notification-popup");
const notificationCloseElt = document.querySelector(
  ".notification-popup .close"
);

// # Listeners
// ## Toggable elements
languageElt.addEventListener("click", () => toggleEltActive(languageElt));
profileElt.addEventListener("click", () => toggleEltActive(profileElt));
sidebarOpenElt.addEventListener("click", () => {
  sidebarElt.classList.add("active");
});
sidebarCloseElt.addEventListener("click", () => {
  sidebarElt.classList.remove("active");
});
notificationCloseElt.addEventListener("click", () => {
  notificationElt.classList.remove("active");
  if (!window.__SHOW_NOTIFICATION) return;
  setNotificationTimeout();
});
themeToggleElt.addEventListener("click", () => {
  currentTheme = currentTheme === "light" ? "dark" : "light";
  document.body.setAttribute("data-theme", currentTheme);
  themeToggleElt.classList.toggle("active");
});

// ## Clickable/selectable elements
navLinks.forEach((link) => {
  link.addEventListener("click", handleLinkChange);
});
filtersPeriods.forEach((period) => {
  period.addEventListener("click", handlePeriodChange);
});

// Handler functions
function toggleEltActive(elt) {
  if (elt == null) return;
  elt.classList.toggle("active");
}

function handleLinkChange() {
  if (currentLink === this) return;

  currentLink.classList.remove("active");
  this.classList.add("active");
  currentLink = this;
}

function handlePeriodChange() {
  if (currentPeriodFilter === this) return;

  currentPeriodFilter.classList.remove("active");
  this.classList.add("active");
  currentPeriodFilter = this;

  const filter = this.dataset.filter;
  const data = getIncomesByPeriod(filter);
  updateChart(incomesChart, data.labels, data.values);
}

// Get data functions
function getIncomesByPeriod(filter) {
  return INCOMES_PER_PERIOD[filter];
}

function getTopCategories() {
  return CATEGORIES_DATA;
}

function getOrders() {
  return ORDERS_DATA;
}

function getProducts() {
  return PRODUCTS_DATA;
}

// Utils
function updateChart(chart, labels, values) {
  chart.data.labels = labels;
  chart.data.datasets[0].data = values;
  chart.update();
}

function generateRandomValues(length, min, max) {
  return Array.from({ length }, () =>
    Math.floor(Math.random() * (max - min + 1) + min)
  );
}

function setNotificationTimeout() {
  if (notificationInterval != null) clearInterval(notificationInterval);

  notificationInterval = setInterval(() => {
    if (!window.__SHOW_NOTIFICATION) {
      if (notificationElt.classList.contains("active"))
        notificationElt.classList.remove("active");

      clearInterval(notificationInterval);
      notificationInterval = null;

      console.info("Timeout cleared.");
      return;
    }

    toggleEltActive(notificationElt);
  }, NOTIFICATION_DELAY);
}

// Populate DOM
function populateProducts(products) {
  const parentElt = document.querySelector(
    ".best-products .card__container .products"
  );

  const createProductElement = (product) => {
    const productElt = document.createElement("div");
    productElt.classList.add("product");

    const imageElt = document.createElement("img");
    imageElt.src = product.image;
    imageElt.alt = product.name;
    imageElt.classList.add("product__image");
    productElt.appendChild(imageElt);

    const productInfoElt = document.createElement("div");
    productInfoElt.classList.add("product__info");

    const nameElt = document.createElement("span");
    nameElt.classList.add("product__info__name");
    nameElt.textContent = product.name;
    productInfoElt.appendChild(nameElt);

    const priceElt = document.createElement("span");
    priceElt.classList.add("product__info__price");
    priceElt.textContent = product.price;
    productInfoElt.appendChild(priceElt);

    productElt.appendChild(productInfoElt);

    return productElt;
  };

  parentElt.innerHTML = "";

  products.forEach((product) => {
    const productElt = createProductElement(product);
    parentElt.appendChild(productElt);
  });
}

function populateOrders(orders) {
  const parentElt = document.querySelector(
    ".orders .card__container .orders__table tbody"
  );

  const createOrderElement = (order) => {
    const orderRowElt = document.createElement("tr");

    const productColumnElt = document.createElement("td");

    const productElt = document.createElement("div");
    productElt.classList.add("product");

    const productImageElt = document.createElement("img");
    productImageElt.src = order.product.image;
    productImageElt.alt = order.product.name;
    productImageElt.classList.add("product__image");
    productElt.appendChild(productImageElt);

    const productInfoElt = document.createElement("div");
    productInfoElt.classList.add("product__info");

    const productNameElt = document.createElement("span");
    productNameElt.classList.add("product__info__name");
    productNameElt.textContent = order.product.name;
    productInfoElt.appendChild(productNameElt);

    const productPriceElt = document.createElement("span");
    productPriceElt.classList.add("product__info__price");
    productPriceElt.textContent = order.product.price;
    productInfoElt.appendChild(productPriceElt);

    productElt.appendChild(productInfoElt);

    productColumnElt.appendChild(productElt);

    orderRowElt.appendChild(productColumnElt);

    const dateElt = document.createElement("td");
    dateElt.textContent = order.date;
    orderRowElt.appendChild(dateElt);

    const clientElt = document.createElement("td");
    clientElt.textContent = order.client;
    orderRowElt.appendChild(clientElt);

    const STATUS_CLASSES = {
      [ORDER_STATUS.PENDING]: "order__status--pending",
      [ORDER_STATUS.DELIVERED]: "order__status--received",
    };

    const statusColumnElt = document.createElement("td");

    const statusElt = document.createElement("span");
    statusElt.classList.add("order__status");
    statusElt.classList.add(STATUS_CLASSES[order.status]);
    statusElt.textContent = order.status;
    statusColumnElt.appendChild(statusElt);

    orderRowElt.appendChild(statusColumnElt);

    return orderRowElt;
  };

  parentElt.innerHTML = "";

  orders.forEach((order) => {
    const orderRowElt = createOrderElement(order);
    parentElt.appendChild(orderRowElt);
  });
}

// Init
(() => {
  const PRODUCTS_DELAY = 1500;
  const ORDERS_DELAY = 2700;

  const currentFilter = currentPeriodFilter.dataset.filter;
  const incomes = getIncomesByPeriod(currentFilter);

  updateChart(incomesChart, incomes.labels, incomes.values);

  const categories = getTopCategories();

  updateChart(
    topCategoriesChart,
    categories.map((category) => category.label),
    categories.map((category) => category.value)
  );

  const fetchedProducts = getProducts();
  setTimeout(() => {
    populateProducts(fetchedProducts);
  }, PRODUCTS_DELAY);

  const fetchedOrders = getOrders();
  setTimeout(() => {
    populateOrders(fetchedOrders);
  }, ORDERS_DELAY);

  console.info(
    "Set the variable `window.__SHOW_NOTIFICATION` to `false` to disable notification popup."
  );
  console.info("> window.__SHOW_NOTIFICATION = false;");

  window.__SHOW_NOTIFICATION = true;

  setNotificationTimeout();
})();
