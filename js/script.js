//SECCIÓN DE REGISTRO E INICIO DE SESIÓN//

// Array para almacenar usuarios registrados
let usuarios = [];

// Función para registrarse
function registrarse() {
  let username = prompt("Regístrese:\nIngrese su nombre de usuario: ");
  
  // Verificar si el nombre de usuario ya existe
  let usuarioRegistrado = usuarios.find(user => user.username === username);
  if (usuarioRegistrado) {
    alert("El nombre de usuario ya existe. Intente con otro o inicie sesión.");
    return false;
  }
  
  let password = prompt("Ingrese su contraseña: ");
  usuarios.push({ username, password });
    alert("Registro exitoso. Ahora puede iniciar sesión.");
    return true;
}

// Función para iniciar sesión
function iniciarSesion() {
  let username = prompt("Inicie sesión:\nIngrese su nombre de usuario:");
  let password = prompt("Ingrese su contraseña:");
  
  let usuario = usuarios.find(user => user.username === username && user.password === password);
  if (usuario) {
    alert("Inicio de sesión exitoso.\nBienvenido " + username + "!");
    return true;
  } else {
    alert("Credenciales incorrectas.\nPor favor, intente nuevamente.");
    return false;
  }
}

// Función para mostrar el menú de Registro/Iniciar Sesión
function mostrarMenuInicio() {
  let opcion = prompt("Seleccione una opción:\n1. Registrarse\n2. Iniciar sesión");
  switch(opcion) {
    case "1":
      if (registrarse()) {
        // Luego de registrarse, se solicita el inicio de sesión
        return iniciarSesion();
      } else {
        // Si falla el registro, vuelve a mostrar el menú
        return mostrarMenuInicio();
      }
    case "2":
      return iniciarSesion();
      default:
      alert("Opción no válida. Intente nuevamente.");
      return mostrarMenuInicio();
  }
}

//SECCIÓN DE SIMULADOR DE PRECIOS//

// Array de productos disponibles
const productos = [
  { nombre: "Set de 6 platos a elección",
    precio: 40000,
    colores: ["blanco", "arena", "flores lilas", "hojas arena"]
  },
  { nombre: "Set de 3 cuencos a elección",
    precio: 30000,
    colores: ["blanco", "arena", "flores lilas", "hojas arena"]
  },
  { nombre: "Jarra a elección",
    precio: 15000,
    colores: ["blanco", "arena", "flores lilas", "hojas arena"]
  },
  { nombre: "Set 6 tazas sin oreja a elección",
    precio: 20000,
    colores: ["blanco", "arena", "flores lilas", "hojas arena"]
  },
  { nombre: "Set sushi blanco", precio: 25000},
  { nombre: "Tazón 700 ml a elección",
    precio: 12000,
    colores: ["blanco", "arena", "flores lilas", "hojas arena"]
  }
];
let carrito = [];

// Función para mostrar los productos disponibles
function mostrarProductos() {
  let mensaje = "Productos disponibles:\n";
  productos.forEach((producto, index) => {
    mensaje += `${index + 1}. ${producto.nombre} - $${producto.precio}`;
    
    // Verificar si el producto tiene opciones de colores y agregarlas al mensaje
    if (producto.colores) {
      mensaje += `\n   Colores disponibles: ${producto.colores.join(", ")}`;
    }
    
    mensaje += "\n"; // Agregar un salto de línea después de cada producto
  });
  alert(mensaje);
}

// Función para agregar un producto al carrito
function agregarAlCarrito() {
  let seleccion = prompt("Ingrese el número del producto que desea agregar al carrito:");
  let indice = parseInt(seleccion) - 1;
  
  if (indice >= 0 && indice < productos.length) {
    let productoSeleccionado = productos[indice]; // Aquí seleccionamos el producto

    // Verificar si el producto tiene opciones de colores
    if (productoSeleccionado.colores) {
      let colorElegido = prompt(`El producto seleccionado tiene colores disponibles: ${productoSeleccionado.colores.join(", ")}.\nIngrese el color que desea:`);
      
      // Verificar que el color elegido sea válido
      if (productoSeleccionado.colores.includes(colorElegido)) {
        // Agregar el producto al carrito con el color seleccionado
        carrito.push({ 
          nombre: productoSeleccionado.nombre, 
          precio: productoSeleccionado.precio, 
          color: colorElegido 
        });
        alert(`${productoSeleccionado.nombre} en color ${colorElegido} ha sido agregado al carrito.`);
      } else {
        alert("Color inválido. Por favor, intente nuevamente.");
      }
    } else {
      // Si el producto no tiene colores, se agrega al carrito directamente
      carrito.push(productoSeleccionado);
      alert(`${productoSeleccionado.nombre} ha sido agregado al carrito.`);
    }
  } else {
    alert("Selección inválida. Ingrese un número válido.");
  }
}


// Función para calcular y mostrar el precio total del carrito
function calcularPrecioTotal() {
  let total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
  alert(`El precio total de los productos en el carrito es: $${total}`);
}

function iniciarSimulador() {
  // El usuario debe primero pasar por el proceso de registro/inicio de sesión
  if (mostrarMenuInicio()) {
    // Una vez autenticado, continuar con el simulador de precios
    mostrarProductos();
    let continuar = confirm("¿Desea agregar un producto al carrito?");
    while (continuar) {
      agregarAlCarrito();
      continuar = confirm("¿Desea agregar otro producto al carrito?");
    }
    calcularPrecioTotal();
  } else {
    alert("No se pudo iniciar sesión. Terminando la aplicación.");
  }
}

iniciarSimulador();
