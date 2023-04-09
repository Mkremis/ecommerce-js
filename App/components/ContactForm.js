export function ContactForm() {
  document.getElementById("nav-bar__aside").style.display = "none";
  const $form = document.createElement("form"),
    $styles = document.getElementById("dynamic-styles");
  $styles.innerHTML = `
.contact-form{
 --form-ok-color: #4caf50;
 --form-error-color: #f44336;
 margin-left: auto;
 margin-right: auto;
 width: 80%;
}

.contact-form >*{
 padding: 0.5rem;
 margin: 1rem auto;
 display: block;
 width: 100%;
 font-size: 1rem;
 font-family: sans-serif;
}

.contact-form textarea{
 resize: none;
}

.contact-form legend,
.contact-form-response{
 font-size: 1.5rem;
 font-weight: bold;
 text-align: center;
}

.contact-form input[type = "submit"]{
 width: 50%;
 font-weight: bold;
 cursor: pointer;
}

.contact-form *::placeholder{
 color: black;
}

.contact-form [required]:valid{
 border: thin solid var(--form-ok-color);
}

.contact-form [required]:invalid{
 border: thin solid var(--form-error-color);
}

.contact-form-error{
 margin-top: -1rem;
 font-size: 80%;
 background-color: var(--form-error-color);
 color: #fff;
 transition: all 800ms ease;
}

.contact-form-error.is-active{
 display: block;
 animation: show-message 1s 1 normal 0s ease-out both;
}

.none{
display: none;
}

@keyframes show-message{
 0%{
  visiblity: hidden;
  opacity: 0;
    }
 100%{
  visibility: visible;
  opacity: 1;
    }
}`;
  $form.classList.add("contact-form");
  $form.id = "contact-form";
  $form.action = "https://formsubmit.co/martinkremis@hotmail.com";
  $form.method = "POST";
  let $legend = document.createElement("legend");
  $legend.textContent = "Envianos tus comentarios";
  $form.appendChild($legend);

  const fields = [
    {
      name: "name",
      type: "text",
      placeholder: "Escribe tu nombre",
      title: "Nombre solo acepta letras y espacios en blanco",
      pattern: "^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\\s]+$",
    },
    {
      name: "email",
      type: "email",
      placeholder: "Escribe tu correo electronico",
      title: "email no valido",
      pattern:
        "^[a-z0-9]+(\\.[_a-z0-9]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,15})$",
    },
    {
      name: "subject",
      type: "text",
      placeholder: "Asunto a tratar",
      title: "el asunto no puede estar vacio",
      pattern: "^(w+S+)$",
    },
  ];

  fields.forEach((field) => {
    const $input = document.createElement("input");
    $input.type = field.type;
    $input.name = field.name;
    $input.placeholder = field.placeholder;
    $input.title = field.title;
    if (field.name !== "subject") $input.pattern = field.pattern;
    $input.required = true;
    $input.classList.add("txtInput");
    $form.appendChild($input);
  });

  /////////////////textarea////////////////////////
  const $txtarea = document.createElement("textarea");
  $txtarea.name = "comments";
  $txtarea.placeholder = "Escribe tus comentarios";
  $txtarea.title = "maximo permitido 256 caracteres";
  $txtarea.setAttribute("data-pattern", "^.{1,255}$");
  $txtarea.cols = "50";
  $txtarea.rows = "5";
  $txtarea.required = true;
  $txtarea.classList.add("txtInput");
  $form.appendChild($txtarea);
  /////////////////submit////////////////////////
  const $submit = document.createElement("input");
  $submit.type = "submit";
  $submit.value = "Enviar";
  $form.appendChild($submit);
  /////////////////loader////////////////////////
  let $div = document.createElement("div");
  $div.classList.add("contact-form-loader", "none");

  const loader = document.createElement("img");
  loader.src = "/ecommerce-js/images/loader.svg";
  loader.alt = "cargando";
  $div.appendChild(loader);
  $form.appendChild($div);
  /////////////////confirm////////////////////////
  $div = document.createElement("div");
  $div.classList.add("contact-form-response", "none");
  const $p = document.createElement("p");
  $p.textContent = "Los datos han sido enviados";
  $div.appendChild($p);
  $form.appendChild($div);

  function validationsForm() {
    const $form = document.querySelector(".contact-form"),
      $inputs = document.querySelectorAll(".contact-form [required]");
    $inputs.forEach((input) => {
      const $span = document.createElement("span");
      $span.id = input.name;
      $span.classList.add("contact-form-error", "none");
      $span.textContent = input.title;
      input.insertAdjacentElement("afterend", $span);
    });
    document.addEventListener("keyup", (e) => {
      if (e.target.matches(".contact-form [required]")) {
        let pattern = e.target.pattern || e.target.dataset.pattern;
        if (pattern && e.target !== "") {
          let regex = new RegExp(pattern);
          return !regex.exec(e.target.value)
            ? document.getElementById(e.target.name).classList.add("is-active")
            : document
                .getElementById(e.target.name)
                .classList.remove("is-active");
        }
        if (!pattern) {
          return e.target.value === ""
            ? document.getElementById(e.target.name).classList.add("is-active")
            : document
                .getElementById(e.target.name)
                .classList.remove("is-active");
        }
      }
    });

    document.addEventListener("submit", (e) => {
      if (e.target.matches(".contact-form")) {
        e.preventDefault();
        const $loader = document.querySelector(".contact-form-loader"),
          $response = document.querySelector(".contact-form-response");
        $loader.classList.remove("none");
        fetch("https://formsubmit.co/ajax/martinkremis@gmail.com", {
          method: "POST",
          body: new FormData(e.target),
        })
          .then((res) => (res.ok ? res.json() : Promise.reject(res)))
          .then((jsn) => {
            $loader.classList.add("none");
            $response.classList.remove("none");
            $response.innerHTML = `<p>${jsn.message}</p>`;
            $form.reset();
          })
          .catch((err) => {
            $loader.classList.add("none");
            let message =
              err.statusText ||
              "Ocurrio un error al enviar el mensaje, vuelve a intentarlo";
            $response.classList.remove("none");
            $response.innerHTML = `<p>${err.status} : ${message}</p>`;
            setTimeout(() => {
              $response.classList.add("none");
            }, 3000);
          });
      }
    });
  }

  setTimeout(() => {
    validationsForm();
  }, 100);
  document.getElementById("content").innerHTML = null;
  document.getElementById("content").appendChild($form);
}
