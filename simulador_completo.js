let clientes = [];
let creditos = [];
let listaContactos=[
  {nombre:"Lionel",numero:"9089070090"},
  {nombre:"Ana",numero:"333333"},
  {nombre:"Jorge",numero:"77777777"}]

let tasaInteres = 15;
let clienteSeleccionado = null;
let cuotaCalculada = 0;
let montoCalculado = 0;
let plazoCalculado = 0;
let creditoAprobado = false;
let montoMaximo=5000;

function ocultarSecciones() {
  let seccion1 = recuperarElemento("clientes").classList.remove("activa");
  let seccion2 = recuperarElemento("parametros").classList.remove("activa");
  let seccion3 = recuperarElemento("credito").classList.remove("activa");
  let seccion4 = recuperarElemento("listaCreditos").classList.remove("activa");
  let seccion5 = recuperarElemento("contactos").classList.remove("activa");
}

function mostrarSeccion(id) {
  ocultarSecciones();
  let seccion1 = document.getElementById(id).classList.add("activa");

  if(id=="contactos"){
    pintarContactos(listaContactos)
  }
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

function guardarMontoMaximo(){
  let valor=recuperarFloat("montoMaximo");
  if (valor>5000){
    mostrarTexto("mensajeMonto", "Ingresa un monto válido" )
  }
}

function guardarCliente() {
  let cmpCedula = recuperarTexto("cedula");
  let cmpNombre = recuperarTexto("nombre");
  let cmpApellido = recuperarTexto("apellido");
  let cmpIngresos = recuperarFloat("ingresos");
  let cmpEgresos = recuperarFloat("egresos");
  let cmpCorreo = recuperarTexto("correo");
  let cmpNumero= recuperarTexto("numero")

  if (clienteSeleccionado !== null) {
    clienteSeleccionado.nombre = cmpNombre;
    clienteSeleccionado.apellido = cmpApellido;
    clienteSeleccionado.ingresos = cmpIngresos;
    clienteSeleccionado.correo = cmpCorreo;
    clienteSeleccionado.egresos = cmpEgresos;
    clienteSeleccionado.numero=cmpNumero;


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
    numero: cmpNumero
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
                    <td>${clientes[indice].numero}</td>
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
  let clienteEncontrado = null;

  for (let indice = 0; indice < clientes.length; indice++) {
    let clienteActual = clientes[indice];

    if (clienteActual.cedula === cedula) {
      clienteEncontrado = clienteActual;
      break;
    }
  }

  return clienteEncontrado;
}

function seleccionarCliente(cedula) {
  clienteSeleccionado = buscarCliente(cedula);

  if (clienteSeleccionado !== null) {
    mostrarTextoEnCaja("cedula", clienteSeleccionado.cedula);
    mostrarTextoEnCaja("nombre", clienteSeleccionado.nombre);
    mostrarTextoEnCaja("apellido", clienteSeleccionado.apellido);
    mostrarTextoEnCaja("correo", clienteSeleccionado.correo);
    mostrarTextoEnCaja("numero", clienteSeleccionado.numero)
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
  recuperarElemento("numero").value = "";
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

  resultadoCredito.classList.add(estadoCredito ? "aprobado" : "rechazado");
  mensaje = estadoCredito ? "Aprobado" : "Rechazado";
  solicitarCredito.disabled = !estadoCredito;

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

function solicitarCredito() {
  let cliente = clienteSeleccionado;
  let credito = {
    cedula: cliente.cedula,
    nombre: cliente.nombre,
    apellido: cliente.apellido,
    correo: cliente.correo,
    monto: montoCalculado,
    tasa: tasaInteres,
    plazo: plazoCalculado,
    cuota: cuotaCalculada,
  };

  creditos.push(credito);
}

function buscarCreditos(cedula) {
  let creditosEncontrados = [];

  for (let indice = 0; indice < creditos.length; indice++) {
    let creditoActual = creditos[indice];

    if (creditoActual.cedula === cedula) {
      creditosEncontrados.push(creditoActual);
    }
  }

  return creditosEncontrados;
}

function pintarCreditos(creditos) {
  let tablaCreditos = recuperarElemento("tablaCreditos");
  let contenedor = "";

  if (creditos.length === 0) {
    tablaCreditos.innerHTML = `
      <tr>
        <td colspan="8">No existen créditos registrados.</td>
      </tr>
    `;
    return;
  }

  for (let indice = 0; indice < creditos.length; indice++) {
    let creditoActual = creditos[indice];
    contenedor += `
      <tr>
        <td>${creditoActual.cedula}</td>
        <td>${creditoActual.nombre}</td>
        <td>${creditoActual.apellido}</td>
        <td>${creditoActual.correo}</td>
        <td>$ ${formatearDinero(creditoActual.monto)}</td>
        <td>${creditoActual.tasa}%</td>
        <td>${creditoActual.plazo} años</td>
        <td>$ ${formatearDinero(creditoActual.cuota)}</td>
      </tr>
    `;
  }

  tablaCreditos.innerHTML = contenedor;
}

function buscarCreditosCliente() {
  let cmpCedula = recuperarTexto("buscarCedulaListado").trim();

  if (cmpCedula === "") {
    pintarCreditos([]);
    return;
  }

  let creditosCliente = buscarCreditos(cmpCedula);

  pintarCreditos(creditosCliente);
}

function pintarContactos(listaContactos){
  let tabla=recuperarElemento("tablaContactos");
  let contenedor = "";
  for(let i=0;i<listaContactos.length;i++){
    let contacto=listaContactos[i];
    contenedor+=`
      <tr>
        <td>${contacto.nombre}</td>
        <td>${contacto.numero}</td>
      </tr>
    `
  }
  tabla.innerHTML=contenedor
}

function buscarContactos(filtro){
  let cmpFiltro=recuperarTexto("buscarContactos")
  let filtroContactos=[]
  if(filtro=="nombre"){
    for(let i=0; i<listaContactos.length;i++){
      let contacto=listaContactos[i]
      if(contacto.nombre==cmpFiltro){
        filtroContactos.push(contacto)
      }
    }
    pintarContactos(filtroContactos)
  }
  
  if(filtro=="numero"){
    for(let i=0; i<listaContactos.length;i++){
      let contacto=listaContactos[i]
      if(contacto.numero==cmpFiltro){
        filtroContactos.push(contacto)
      }
    }
    pintarContactos(filtroContactos)
  }
}

function ordenarContactos(){
  let contactosOrdenados=[]

  contactosOrdenados=listaContactos.slice().sort(  //compara mediante(a,b) cual es menor y cual es mayor
    (a,b)=>a.nombre.localeCompare(b.nombre)
  )
  pintarContactos(contactosOrdenados)
}

//push agrega al final
//unshift agrega al inicio