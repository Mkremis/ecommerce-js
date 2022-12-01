import { CartManager } from "./components/ShoppingCart.js";
import { UserData } from "./test/FakeUser.js";
export const User = (function () {
  // Creamos el Constructor:
  const Constructor = function (options) {
    this.cart = options.cart;
    this.user = options.user;
    this.logged = options.logged;
  };
  // Agregamos los metodos al prototipo del constructor del componenete:
  // function to add the modal panel with the basic user information and buttons for edit the full user info and log out
  Constructor.prototype.userPanel = function () {
    let $template = `
    <article class="user-panel --invisible">
    <div class="user-info">
    <h3 class="user-fullname">${this.user.fullName.title} ${this.user.fullName.first} ${this.user.fullName.last}</h3>
    <p class="user-username">${this.user.login.username}</p>
    <p class="user-username">${this.user.email}</p>
    </div>
    <div class="user-buttons">
    <button class="user-mangment">Manage your account</button>
    <button class="user-logout">Log out</button>
    </div>
    `;
    document.querySelector(".main-container").innerHTML += $template;
  };

  // function to render the form for edit the full user information
  Constructor.prototype.userAccount = function () {
    document.querySelector(".hero-container").style.display = "none";
    const $template = document.createElement("article"),
      $form = document.createElement("form");
    $template.classList.add("user-account");
    $form.classList.add("user-account__form");
    // as the user info is a nested object, to render each prop we set as first object in the obj array the user info object and then if in the loop a type of object prop is found this object is pushed to the obj array so the index of the loop increses
    let obj = [this.getUser()],
      brackets = []; //array of parents with his childs in order to render the fieldsets in the form
    for (let index = 0; index < obj.length; index++) {
      const keys = Object.keys(obj[index]),
        currentObj = obj[index];
      keys.forEach((key) => {
        if (typeof currentObj[key] !== "object") {
          // if the object props are just strings, we render them into the form as input types with the labels
          let $label = document.createElement("label");
          $label.id = key;
          $label.for = currentObj[key];
          $label.textContent = key;
          let $input = document.createElement("input");
          $input.type = "text";
          $input.name = key;
          $input.value = currentObj[key];
          $form.append($label, $input);
        } else {
          let $legend = document.createElement("legend");
          $legend.textContent = key;
          $legend.id = key;
          let groups = Object.keys(currentObj[key]);
          brackets.push({ [key]: groups }); //the parent and his childs are pushed to the brackets array in order to render the fieldsets
          $form.appendChild($legend);
          obj.push(currentObj[key]); //push to the obj array the prop type object in order to render this props
        }
      });
    }
    brackets.forEach((bracket) => {
      //each group of parent with his childs are rendered in fieldsets groups at the form
      let parent = Object.keys(bracket)[0],
        childs = bracket[parent];
      let $fieldset = document.createElement("fieldset"),
        $parent = $form.querySelector(`#${parent}`);
      $form.appendChild($fieldset);
      childs.forEach((child) => {
        let $child = $form.querySelector(`#${child}`),
          $values = $form.querySelector(`[name="${child}"]`);
        $fieldset.insertAdjacentElement("afterbegin", $parent);
        $fieldset.insertAdjacentElement("beforeend", $child);
        if ($values) $child.append($values);
      });
    });
    let $submit = document.createElement("button"),
      $title = document.createElement("h1"),
      $output = document.createElement("output");
    $output.classList.add("form-output", "--invisible");
    $output.textContent = "The user information was successfully updated";
    $title.textContent = "Manage your account";
    $form.insertAdjacentElement("afterbegin", $title);
    $submit.type = "submit";
    $submit.name = "submit_button";
    $submit.id = "btn";
    $submit.classList.add("user-account__form-submit");
    $submit.textContent = "Save the changes";
    $form.insertAdjacentElement("beforeend", $submit);
    $form.insertAdjacentElement("beforeend", $output);
    $template.appendChild($form);
    const $container = document.getElementById("content");
    $container.className = "";
    $container.classList.add("user-info");
    $container.innerHTML = null;
    $container.appendChild($template);
  };
  // function to get an inmutable copy of the object with the full user information
  Constructor.prototype.getUser = function () {
    return JSON.parse(JSON.stringify(this.user)); //structuredClone(this.data);
  };
  // funtction to get the shopping cart
  Constructor.prototype.getCart = function () {
    if (this.logged) {
      //if a user logged the cart is saved on the session storage as the cart object of the User object
      let cartInfo = JSON.parse(sessionStorage.getItem("CART"));
      if (!cartInfo) {
        //if not cart object in the session storage because the user just logged there are 2 possibilities:
        //1) if the user add items to the cart previously to login this items are taken from the user object and included to the session
        //2) we create the first cart object that contains an object with the items added to the cart and the username owner of this cart
        cartInfo = this.cart
          ? { ...this.cart, user: this.user.login.username }
          : { items: {}, user: this.user.login.username };
        let newItemJsn = JSON.stringify(cartInfo);
        sessionStorage.setItem("CART", newItemJsn); //the first cart object is saved into the session storage
        return cartInfo;
      } else if (cartInfo.user === this.user.login.username) {
        // if already exists an CART object in the session storage and the owner of this cart is the user that is logged we return this CART
        return cartInfo;
      }
    } else {
      //if no user logged we just save the cart info in the USER object, not in the session storage
      return JSON.parse(JSON.stringify(this.cart)); //structuredClone(this.data);
    }
  };

  // function to add new products (newItem) to the cart
  Constructor.prototype.setCart = function (newItem) {
    // we get the first key of the object that contain the product info from the new item added to the cart
    let newProduct = Object.keys(newItem)[0],
      userCartItems; //variable to initialize or expand the already user cart info
    // check if aleady exists an cart object in the User info, if is the first item adedd to the cart the cart prop in the User is null
    if (this.cart) {
      // if already exists an cart object in the user object we get an inmutable copy of this and we look into each key of this cart object in any new item is already in the user cart object
      userCartItems = JSON.parse(JSON.stringify(this.cart.items));
      for (let key in userCartItems) {
        if (key === newProduct) {
          // if already there is the same product into the user cart object we expand or update this data with the new item data (as quantity)
          userCartItems[key] = { ...userCartItems[key], ...newItem[key] };
        } else {
          // if there is not the same product in the user cart object, the new item is just added into the userCartItems and expanded with the other items into the user cart object (if they exists or not)
          userCartItems = { ...newItem, ...userCartItems };
        }
      }
    } else {
      // if the cart is null because is the first time that an item is added to the shopping cart, we just add the new item to the user cart object
      userCartItems = { ...newItem };
    }
    // finally we expand or initialize the user cart object
    this.cart = { ...this.cart, ["items"]: userCartItems };
    // if an user is already logged we also save the cart into the session storage with the username info owner of this cart nested into the cart object
    if (this.logged) {
      let cartInfo = { ...this.cart, user: this.user.login.username };
      let newItemJsn = JSON.stringify(cartInfo);
      sessionStorage.setItem("CART", newItemJsn);
    }
    // we invoke to the function that render the modal cart panel
    console.log(this.cart);
    CartManager();
  };
  // function to update any user information in user prop of the User object
  Constructor.prototype.updateUser = function (target) {
    let $inputs = target.querySelectorAll("input");
    // we get an array (nodeList) with all the input elements in the form and each element are reduced in order to create an object for each one that contains the key getted from the input name property and the value from input value property.
    const UpdatedObj = Array.from($inputs).reduce(
      (acum, prev) => ({ ...acum, [prev.name]: prev.value }),
      {}
    );
    // we invoke the function to update the user information into the User object.
    objectUpdate(UpdatedObj, this.user);
    // function to update the user object with the User information, receiving 2 arguments: 1) UpdatedObj: the object that contains the updated user info getted from the form. 2) userData: the object with the current user information that will be edited with the new updated information. We cant simply expand the user object with an spread operator because the updated object has not the same structure as the target user object.
    function objectUpdate(UpdatedObj, userData) {
      // as the user object has nested object, first we set an array that includes the whole user object to go over each prop and edit it as necesary
      const ObjToUpdate = [userData];
      // the array will grow with more elements as in the loop are found keys with type of object in the nested strucure of the user object, so for each element added to the array the index of the "for" loop will be increased a accordingly.
      for (let index = 0; index < ObjToUpdate.length; index++) {
        const targetObj = ObjToUpdate[index];
        for (let key in targetObj) {
          if (typeof targetObj[key] === "object") {
            ObjToUpdate.push(targetObj[key]);
          } else if (targetObj[key] !== UpdatedObj[key]) {
            targetObj[key] = UpdatedObj[key];
          }
        }
      }
    }
    setTimeout(() => {
      document.getElementById("btn").classList.remove("progress");
    }, 500);
    setTimeout(() => {
      document.querySelector(".form-output").classList.toggle("--invisible");
    }, 3000);
    document.querySelector(".form-output").classList.toggle("--invisible");
  };
  Constructor.prototype.getLog = function () {
    return this.logged;
  };

  // ANOTHER WAY TO UPDATE THE USER OBJECT:
  // Constructor.prototype.updateUser = function (target) {
  //   let $fieldsets = target.querySelectorAll("fieldset"),
  //     obj = {};
  //   $fieldsets.forEach((fieldset) => {
  //     let $legend = fieldset.querySelector("legend");
  //     let $inputs = fieldset.querySelectorAll("input");

  //     let nwObj = Array.from($inputs).reduce(
  //         (acum, prev) => ({ ...acum, [prev.name]: prev.value }),
  //         {}
  //       ),
  //       objCons = { [$legend.id]: { ...nwObj } };
  //     Object.assign(obj, objCons);
  //   });
  //   let $fInputs = document.querySelectorAll(".user-account__form>input");
  //   $fInputs.forEach(($input) => {
  //     let key = $input.name,
  //       value = $input.value,
  //       newObj = { [key]: value };
  //     Object.assign(obj, newObj);
  //   });
  //   this.user = obj;
  //   console.log(this.user);
  // };
  return Constructor;
})();
