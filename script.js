const inputValores = document.getElementById("cant");
const boton = document.querySelector(".btn-calcular");
const error = document.querySelector(".error");
/*  */
var templeteTbody = document.getElementById("templete-table").content;
const fragment = document.createDocumentFragment();
const tbody = document.getElementById("tbody-items");
/* funcion q redondea los datos */
function convertir(x) {
  return Number.parseFloat(x).toFixed(2);
}
/* funcion q pinta los datos agarrados del input */
function pintarTabla(vector) {
  tbody.innerHTML = "";

  vector.forEach((dato) => {
    templeteTbody.querySelector(".cantidad").textContent = convertir(dato);
    templeteTbody.querySelector(".iva").textContent = convertir(dato * 0.87);
    templeteTbody.querySelector(".fiscal").textContent = convertir(dato * 0.13);

    const clone = templeteTbody.cloneNode(true);
    fragment.appendChild(clone);
  });
  tbody.appendChild(fragment);
}
/* funcion q pintara el table footer */
const templeteTfooter = document.getElementById("templeteTfooter").content;
const tfooter = document.getElementById("tfooter");

function pintaFooter(vector) {
  tfooter.innerHTML = "";
  let cantidad = 0,
    iva = 0,
    fiscal = 0;
  vector.forEach((dato) => {
    cantidad = cantidad + Number(convertir(dato));
    iva = iva + Number(convertir(dato * 0.87));
    fiscal = fiscal + Number(convertir(dato * 0.13));
  });
  let n1 = cantidad.toFixed(2);
  let n2 = iva.toFixed(2);
  let n3 = fiscal.toFixed(2);
  templeteTfooter.querySelector(".total-cantidad span").textContent = n1;
  templeteTfooter.querySelector(".total-iva span").textContent = n2;
  templeteTfooter.querySelector(".total-fiscal span").textContent = n3;
  const clone = templeteTfooter.cloneNode(true);
  fragment.appendChild(clone);
  tfooter.appendChild(fragment);
}

/* funcion q valida los datos  */
function validandoDatos(valores) {
  if (valores !== "") {
    if (/[a-z\-\!\,\+\*\/\?\'\(\)\"\@\{\[\]\´\^]/gi.test(valores)) {
      tbody.innerHTML = "";
      tfooter.innerHTML = "";
      error.classList.add("error-activo");
      setTimeout(() => {
        error.classList.remove("error-activo");
      }, 5000);
    } else {
      const vector = valores.split(":");
      pintarTabla(vector);
      pintaFooter(vector);
    }
  }
}

boton.addEventListener("click", (event) => {
  event.preventDefault();
  validandoDatos(inputValores.value);
});
