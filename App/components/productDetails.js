// export function productDetails(product) {
//   // console.log(product);
//   return `
//   <article class="details">
//       <section class="details__product">
//         <h1 class="details__company">${product.brand.name}</h1>
//         <h2 class="details__title">${product.name}</h2>
//         <div class="details__description">
//           ${product.brand.description || product.description || ""}
//           </div>
//         <details>
//           <summary><span>Product Information</span></summary>
//             <article>
//              <a href="${product.sizeGuide || ""}" target="_blank">${
//     product.sizeGuide ? "Size Guide" : ""
//   }</a>
//              <p>Gender: <span>${product.gender}</span></p>
//              <p>Colour: <span>${product.media.images[0].colour}</span></p>
//              <div>${product.description}</div>
//              <div>${product.info.aboutMe}</div>
//           </article>
//         </details>

//       </section>
//       <section class="details__order">
//         <div class="details__prices">
//           <div class="details__now">
//             <p class="price_now">${product.price.current.text}</p>
//             <p class="details__discount">
//               -${parseInt(
//                 ((product.price.previous.value - product.price.current.value) /
//                   product.price.previous.value) *
//                   100
//               )}%
//             </p>
//           </div>
//           <p class="details__before">${product.price.previous.text}</p>
//         </div>
//         <div class="details__product-quantity">
//           <div class="input">
//             <button  class="input__minus">-</button>
//             <input class="input__number" type="text" value="0" />
//             <button class="input__plus">+</button>
//           </div>
//           <button class="details__button">
//              <img src="/eCommerce-SPA/images/icon-cart-white.svg" alt="cart" />Add to cart
//           </button>
//         </div>
//       </section>
//     </article>
//     `;
// }
