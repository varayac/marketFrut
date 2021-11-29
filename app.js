// Seleccionamos los elementos
const carrito = document.getElementById("carrito"); //El <ul> donde se inyectara el resultado final
const templateCarrito = document.getElementById("templateCarrito"); //El template donde se creara el <li>
const footer = document.getElementById("footer");
const templateFooter = document.getElementById("templateFooter");
const fragment = new DocumentFragment(); //Declaramos el Fragment

// ARRAY CARRITO
let carritoArray = [];

// DELEGACION DE EVENTOS
document.addEventListener("click", (e) => {
  if (e.target.matches(".card .btn-outline-primary")) {
    //Llama los datos de la function agregarCarrito()
    agregarCarrito(e);
  }
  if (e.target.matches("#carrito .list-group-item .btn-success")) {
    //Inicia la accion de Agregar.
    btnAgregar(e);
  }
  if (e.target.matches("#carrito .list-group-item .btn-danger")) {
    //Incia la accion de Quitar.
    btnQuitar(e);
  }
});

// FUNCTION QUE CONSTRUYE EL OBJETO producto Y LO AGREGA AL ARRAY carritoArray
const agregarCarrito = (e) => {
  const producto = {
    titulo: e.target.dataset.fruta,
    id: e.target.dataset.fruta,
    cantidad: 1,
    precio: parseInt(e.target.dataset.precio),
  };

  //Busca y compara el indice del Array con el indice del Objeto
  const indice = carritoArray.findIndex((item) => item.id === producto.id);

  //Si el indice no existe(-1) lo crea(0), de lo contrario lo modifica y pushea al Array.
  if (indice === -1) {
    carritoArray.push(producto);
  } else {
    carritoArray[indice].cantidad++;
  }

  //Inicia y traslada los datos a la function pintarCarrito()
  pintarCarrito();
};

// FUNCTION QUE PINTA LOS ELEMENTOS EN EL templateCarrito -> carrito (<ul>)
const pintarCarrito = () => {
  carrito.textContent = ""; // Inicializa los elementos vacios
  carritoArray.forEach((item) => {
    const clon = templateCarrito.content.cloneNode(true);
    clon.querySelector(".lead").textContent = item.titulo;
    clon.querySelector(".badge").textContent = item.cantidad;
    clon.querySelector("div .lead span").textContent =
      item.precio * item.cantidad;
    clon.querySelector(".btn-danger").dataset.id = item.id;
    clon.querySelector(".btn-success").dataset.id = item.id;

    fragment.append(clon);
  });

  carrito.append(fragment);
  //Inicia pintarFooter
  pintarFooter();
};

// FUNCTION btnAgregar
const btnAgregar = (e) => {
  carritoArray = carritoArray.map((item) => {
    if (item.id === e.target.dataset.id) {
      item.cantidad++;
    }
    return item;
  });
  //Inicia pintarCarrito
  pintarCarrito();
};

//FUNCTION btnQuitar
const btnQuitar = (e) => {
  //console.log("me restaste una ", e.target.dataset.id);
  carritoArray = carritoArray.filter((item) => {
    if (item.id === e.target.dataset.id) {
      if (item.cantidad > 0) {
        item.cantidad--;
        if (item.cantidad === 0) return;
        return item;
      }
    } else {
      return item;
    }
  });
  pintarCarrito();
  //console.log(carritoArray);
};

// FUNCTION QUE PINTA LOS ELEMENTOS EN EL templateFooter (<footer>)
const pintarFooter = () => {
  footer.textContent = "";

  const total = carritoArray.reduce(
    (acc, current) => acc + current.cantidad * current.precio,
    0
  );

  const clone = templateFooter.content.cloneNode(true);
  clone.querySelector("p span").textContent = total;
  fragment.append(clone);
  footer.append(fragment);
  //console.log(total);
};
