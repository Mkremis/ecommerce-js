import { Error404 } from "./components/Error404.js";
import { About } from "./components/AboutPage.js";
import { ContactForm } from "./components/ContactForm.js";

const urlPageTitle = "Nataly";
const urlRoutes = {
  404: {
    route: () => {
      window.location.pathname = "/404";
      return Error404();
    },
    title: `404 | ${urlPageTitle}`,
    description: "Page not found",
  },

  "/search": {
    route: () =>
      `https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=${
        sessionStorage.getItem("offset") || 0
      }&limit=48${sessionStorage.getItem("filter") || ""}&country=US&sort=${
        localStorage.getItem("sort") || "recommended"
      }&q=${localStorage.getItem(
        "search"
      )}&currency=USD&sizeSchema=US&lang=en-US`,

    title: `Home | ${urlPageTitle}`,
    description: "This is the homepage",
  },
  "/women": {
    route: () =>
      `https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=${
        sessionStorage.getItem("offset") || 0
      }&categoryId=${localStorage.getItem("category")}&limit=48${
        sessionStorage.getItem("filter") || ""
      }&country=US&sort=${
        localStorage.getItem("sort") || "recommended"
      }&currency=USD&sizeSchema=US&lang=en-US`,

    title: `Shop Women’s Clothes | Latest Trends & Online Fashion | ${urlPageTitle}`,
    description:
      "Discover women’s fashion online. The latest clothing, shoes, accessories & beauty. Shop today with free delivery & returns (Ts&Cs apply)!",
  },
  "/men": {
    route: () =>
      `https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=${
        sessionStorage.getItem("offset") || 0
      }&categoryId=${localStorage.getItem("category")}&limit=48${
        sessionStorage.getItem("filter") || ""
      }&country=US&sort=${
        localStorage.getItem("sort") || "recommended"
      }&currency=USD&sizeSchema=US&lang=en-US`,

    title: `Shop Men's Clothes | Latest Trends & Online Fashion | ${urlPageTitle}`,
    description:
      "Discover men's clothing and accessories online. Shop for men's fashion t-shirts, jeans, shoes & more. Free delivery and returns (Ts&Cs apply).",
  },
  "/sneakers": {
    route: () =>
      `https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=${
        sessionStorage.getItem("offset") || 0
      }&categoryId=${localStorage.getItem("category")}&limit=48${
        sessionStorage.getItem("filter") || ""
      }&country=US&sort=${
        localStorage.getItem("sort") || "recommended"
      }&currency=USD&sizeSchema=US&lang=en-US`,

    title: ` Men's Sneakers | Designer, Casual & Leather Sneakers | ${urlPageTitle}`,
    description:
      "Discover the latest men's sneakers. From white staples to designer leather standouts, our fashion-forward sneaker collection has you covered.",
  },
  "/checkout": {
    route: () =>
      `https://asos2.p.rapidapi.com/products/v3/detail?id=${localStorage.getItem(
        "category"
      )}&lang=en-US&store=US&sizeSchema=US&currency=USD`,

    title: `Product review | ${urlPageTitle}`,
    description: "Review the product details and order!.",
  },
  "/category": {
    route: () =>
      `https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=${
        sessionStorage.getItem("offset") || 0
      }&categoryId=${localStorage.getItem("category")}&limit=48${
        sessionStorage.getItem("filter") || ""
      }&country=US&sort=${
        localStorage.getItem("sort") || "recommended"
      }&currency=USD&sizeSchema=US&lang=en-US`,

    title: `Product review | ${urlPageTitle}`,
    description: "Review the product details and order!.",
  },
  "/about": {
    route: () => About(),
    title: `About | ${urlPageTitle}`,
    description: "This is the about us page",
  },
  "/contact": {
    route: () => ContactForm(),
    title: `Contact | ${urlPageTitle}`,
    description: "This is the contact us page",
  },
};
export default urlRoutes;
