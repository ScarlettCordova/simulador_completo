let clientes = [];
//{ cedula: "314143413",
  //  nombre: "scar",
    //apellido: "cor",
    //correo: "dssdfs@",
    //ingresos: 54,
    //egresos: 36,
  //}
let creditos = [];

let tasaInteres = 15;
let clienteSeleccionado = null;
let cuotaCalculada = 0;
let montoCalculado = 0;
let plazoCalculado = 0;
let creditoAprobado = false;

function ocultarSecciones() {
  let seccion1 = recuperarElemento("clientes").classList.remove("activa");
  let seccion2 = recuperarElemento("parametros").classList.remove("activa");
  let seccion3 = recuperarElemento("credito").classList.remove("activa");
  let seccion4 = recuperarElemento("contacto").classList.remove("activa");
}

function mostrarSeccion(id) {
  ocultarSecciones();
  let seccion1 = document.getElementById(id).classList.add("activa");
}

function guardarTasa() {
  let cmpTasa = recuperarInt("tasaInteres");
  if (cmpTasa >= 10 && cmpTasa <= 20) {
    mostrarTexto(
      "mensajeTasa",
      "Tasa configurada correctamente: " + cmpTasa + " %",
    );
    tasaInteres = cmpTasa;
  } else {
    mostrarTexto("mensajeTasa", "Tasa debe estar entre 10% y 20%");
  }
}

function guardarCliente() {
  let cmpCedula = recuperarTexto("cedula");
  let cmpNombre = recuperarTexto("nombre");
  let cmpApellido = recuperarTexto("apellido");
  let cmpIngresos = recuperarFloat("ingresos");
  let cmpEgresos = recuperarFloat("egresos");
  let cmpCorreo = recuperarTexto("correo");

  if (clienteSeleccionado !== null) {
    clienteSeleccionado.nombre = cmpNombre;
    clienteSeleccionado.apellido = cmpApellido;
    clienteSeleccionado.ingresos = cmpIngresos;
    clienteSeleccionado.correo = cmpCorreo;
    clienteSeleccionado.egresos = cmpEgresos;

    clienteSeleccionado = null;
    console.log("Cliente actualizado");
    pintarCliente();
    limpiar();
    return;
  }

  let existente = buscarCliente(cmpCedula);

  if (existente !== null) {
    console.log("Cliente existente");
    return;
  }

  let cliente = {
    cedula: cmpCedula,
    nombre: cmpNombre,
    apellido: cmpApellido,
    correo: cmpCorreo,
    ingresos: cmpIngresos,
    egresos: cmpEgresos,
  };

  clientes.push(cliente);
  console.log("Cliente agregado");
  pintarCliente();
  limpiar();
}

function pintarCliente() {
  let tablaClientes = recuperarElemento("tablaClientes");
  let contenedor = "";

  for (let indice = 0; indice < clientes.length; indice++) {
    contenedor += `<tr>
                    <td>${clientes[indice].cedula}</td>
                    <td>${clientes[indice].nombre}</td>
                    <td>${clientes[indice].apellido}</td>
                    <td>${clientes[indice].correo}</td>
                    <td>${clientes[indice].ingresos}</td>
                    <td>${clientes[indice].egresos}</td>
                    <td>
                      <button onclick="seleccionarCliente('${clientes[indice].cedula}')">Actualizar</button>
                      <button onclick="eliminar('${clientes[indice]}')">Eliminar</button>
                    </td>
                  </tr>
                  `;
  }

  tablaClientes.innerHTML = contenedor;
}

function buscarCliente(cedula) {
  clienteSeleccionado = null;

  for (let indice = 0; indice < clientes.length; indice++) {
    let clienteActual = clientes[indice];

    if (clienteActual.cedula === cedula) {
      clienteSeleccionado = clienteActual;
      break;
    }
  }

  return clienteSeleccionado
}

function seleccionarCliente(cedulaSeleccionada) {
  clienteSeleccionado = buscarCliente(cedulaSeleccionada);

  if (clienteSeleccionado !== null) {
    mostrarTextoEnCaja("cedula", clienteSeleccionado.cedula);
    mostrarTextoEnCaja("nombre", clienteSeleccionado.nombre);
    mostrarTextoEnCaja("apellido", clienteSeleccionado.apellido);
    mostrarTextoEnCaja("correo", clienteSeleccionado.correo);
    mostrarTextoEnCaja("ingresos", clienteSeleccionado.ingresos);
    mostrarTextoEnCaja("egresos", clienteSeleccionado.egresos);
  }
}

function eliminar(indice) {
  clientes.splice(indice, 1);
  pintarCliente();
}

// function eliminarCliente(cedula) {
//   let confirmar = confirm("¿Seguro que deseas eliminar este cliente?");

//   if (!confirmar) {
//     return;
//   }

//   for (let indice = 0; indice < clientes.length; indice++) {
//     if (clientes[indice].cedula === cedula) {
//       clientes.splice(indice, 1);
//       break;
//     }
//   }

//   pintarCliente();
// }

function limpiar() {
  recuperarElemento("cedula").value = "";
  recuperarElemento("nombre").value = "";
  recuperarElemento("apellido").value = "";
  recuperarElemento("correo").value = "";
  recuperarElemento("ingresos").value = "";
  recuperarElemento("egresos").value = "";
}

function buscarClienteCredito() {
  let cmpCedula = recuperarTexto("buscarCedulaCredito");
  let cliente = buscarCliente(cmpCedula);

  let resultadoCliente = recuperarElemento("datosClienteCredito");
  let contenedor = "";

  clienteSeleccionado = null;

  if (cliente !== null) {
    clienteSeleccionado = cliente;

    contenedor = `
                  <h3>Datos del Cliente</h3>
                  <p><strong>Cédula:</strong>${cliente.cedula}</p>
                  <p><strong>Nombre:</strong>${cliente.nombre}</p>
                  <p><strong>Apellido:</strong>${cliente.apellido}</p>
                  <p><strong>Ingresos:</strong>${cliente.ingresos}</p>
                  <p><strong>Egresos:</strong>${cliente.egresos}</p>
                   `;
  } else {
    contenedor = `
                 <h3> El cliente no Existe </h3>
                 `;
  }

  resultadoCliente.innerHTML = contenedor;
}

function formatearDinero(valor) {
  return new Intl.NumberFormat("es-EC", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valor);
}

function calcularCredito() {
  let montoCredito = recuperarFloat("montoCredito");
  let plazoCredito = recuperarInt("plazoCredito");
  let solicitarCredito = recuperarElemento("btnSolicitarCredito");
  let resultadoCredito = recuperarElemento("resultadoCredito");
  let contenedor = "";

  resultadoCredito.classList.remove("aprobado");
  resultadoCredito.classList.remove("rechazado");

  if (clienteSeleccionado === null) {
    contenedor = `
      <h3>No es posible calcular</h3>
      <p>Por favor busca y selecciona un cliente existente.</p>
    `;

    resultadoCredito.innerHTML = contenedor;
    return;
  }

  if (isNaN(montoCredito) || montoCredito <= 0) {
    contenedor = `
      <h3>Monto inválido</h3>
      <p>Ingresa un monto de crédito válido.</p>
    `;

    resultadoCredito.innerHTML = contenedor;
    return;
  }

  if (isNaN(plazoCredito) || plazoCredito <= 0) {
    contenedor = `
      <h3>Plazo inválido</h3>
      <p>Ingresa un plazo válido en años.</p>
    `;

    resultadoCredito.innerHTML = contenedor;
    return;
  }

  let montoDisponible = calcularDisponible(
    clienteSeleccionado.ingresos,
    clienteSeleccionado.egresos,
  );

  let capacidadPago = calcularCapacidadPago(montoDisponible);
  let interes = calcularInteresSimple(montoCredito, tasaInteres, plazoCredito);
  let totalPago = calcularTotalPagar(montoCredito, interes);
  let cuotaMensual = calcularCuotaMensual(totalPago, plazoCredito);
  let estadoCredito = aprobarCredito(capacidadPago, cuotaMensual);

  let mensaje = "";

  resultadoCredito.classList.add(!estadoCredito ? "rechazado" : "aprobado");
  mensaje = estadoCredito ? "Aprobado" : "Rechazado";

  solicitarCredito.disabled=!estadoCredito

  //if (estadoCredito) {
    //solicitarCredito.disabled = false;
  //}

  cuotaCalculada = cuotaMensual;
  montoCalculado = montoCredito;
  plazoCalculado = plazoCredito;
  creditoAprobado = estadoCredito;

  contenedor = `
    <h3>Resultados Crédito</h3>

    <p><strong>Capacidad de pago:</strong> $ ${formatearDinero(capacidadPago)}</p>
    <p><strong>Total a pagar:</strong> $ ${formatearDinero(totalPago)}</p>
    <p><strong>Cuota mensual:</strong> $ ${formatearDinero(cuotaMensual)}</p>

    <br>

    <p><strong>Resultado:</strong> ${mensaje}</p>
  `;

  resultadoCredito.innerHTML = contenedor;
}

function solicitarCredito() {}

function calcularDisponible(ingresos, egresos) {
  let resultado = ingresos - egresos;
  if (resultado < 0) {
    return 0;
  }
  return resultado;
}

function calcularCapacidadPago(montoDisponible) {
  let capacidad = montoDisponible * 0.5;
  return capacidad;
}

function calcularInteresSimple(monto, tasa, plazoAnios) {
  let interes = plazoAnios * monto * (tasa / 100);
  return interes;
}

function calcularTotalPagar(monto, interes) {
  let total = monto + interes + 100;
  return total;
}

function calcularCuotaMensual(total, plazoAnios) {
  let meses = plazoAnios * 12;
  let cuota = total / meses;
  return cuota;
}

function aprobarCredito(capacidadPago, cuotaMensual) {
  if (capacidadPago > cuotaMensual) {
    return true;
  } else {
    return false;
  }
}