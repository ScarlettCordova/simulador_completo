
  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;

  
//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios

function ocultarSecciones(){
  let seccion1=document.getElementById("clientes");
  let listaClases1=seccion1.classList //obtiene la lista de las clases del elemento
  console.log (listaClases1);
  listaClases1.remove("activa");

  let seccion2=document.getElementById("parametros");
  let listaClases2=seccion2.classList //obtiene la lista de las clases del elemento
  console.log (listaClases2);
  listaClases2.remove("activa");
}

function mostrarSeccion(id){
  ocultarSecciones()
  let seccion1=document.getElementById(id);
  let listaClases1=seccion1.classList //obtiene la lista de las clases del elemento
  listaClases1.add("activa")
  console.log(listaClases1)
}

function guardarTasa(){
  let cmpTasa=recuperarInt("tasaInteres");
  if (cmpTasa>=10 && cmpTasa<=20){
    mostrarTexto("mensajeTasa","Tasa configurada correctamente: "+cmpTasa+" %")
    tasaInteres=cmpTasa;
  }else{
    mostrarTexto("mensajeTasa","Tasa debe estar entre 10% y 20%")

  }
}

function guardarCliente(){
  let cmpCedula=recuperaraTexto("cedula");
  let cmpNombre=recuperaraTexto("nombre");
  let cmpApellido=recuperaraTexto("apellido");
  let cmpIngresos=recuperarFloat("ingresos");
  let cmpEgresos=recuperarFloat("egresos");
  console.log(cmpCedula)
  console.log(cmpNombre)
  console.log(cmpApellido)
  console.log(cmpIngresos)
  console.log(cmpEgresos)
  let cliente={
    cedula:cmpCedula,
    nombre:cmpNombre,
    apellido: cmpApellido,
    ingresos: cmpIngresos,
    egresos: cmpEgresos
  }
    console.log(cliente)

    if(clienteSeleccionado!=null){
      if(clientes[clienteSeleccionado].cedula!=cliente.cedula){
        alert("NO SE PERMITE MODIFICAR LA CEDULA")
      }
      clientes[clienteSeleccionado].nombre=cliente.nombre
      clientes[clienteSeleccionado].apellido=cliente.apellido
      clientes[clienteSeleccionado].ingresos=cliente.ingresos
      clientes[clienteSeleccionado].egresos=cliente.egresos
    }else{
    clientes.push(cliente)// se guarda el objeto
    console.log(clientes)
    console.log(clientes.toString())
    }
    pintarCliente()
    limpiar()
}

function pintarCliente (){
  let tabla=document.getElementById("tablaClientes");
  let contenidoTabla="<tr>"
  for (let i=0;i<clientes.length;i++){
    let objCliente=clientes[i];
    contenidoTabla+="<td>"+objCliente.cedula+"</td>"
    contenidoTabla+="<td>"+objCliente.nombre+"</td>"
    contenidoTabla+="<td>"+objCliente.apellido+"</td>"
    contenidoTabla+="<td>"+objCliente.ingresos+"</td>"
    contenidoTabla+="<td>"+objCliente.egresos+"</td>"
    contenidoTabla+="<td>"+
            "<button onclick=seleccionarCliente("+objCliente.cedula+")>Actualizar</button>"+
            "<button>Eliminar</button>"+
          "</td></tr>"
  }

  tabla.innerHTML=contenidoTabla;
}

function buscarCliente(cedula){
  for (let i=0;i<clientes.length;i++){
    let objCliente=clientes[i];
    if(objCliente.cedula==cedula){
      return i
    }
  }
  return null
}

function seleccionarCliente(cedula){
  clienteSeleccionado=buscarCliente(cedula)
  if(clienteSeleccionado!=null){
    mostrarTextoEnCaja("cedula",clientes[clienteSeleccionado].cedula)
    mostrarTextoEnCaja("nombre",clientes[clienteSeleccionado].nombre)
    mostrarTextoEnCaja("apellido",clientes[clienteSeleccionado].apellido)
    mostrarTextoEnCaja("ingresos",clientes[clienteSeleccionado].ingresos)
    mostrarTextoEnCaja("egresos",clientes[clienteSeleccionado].egresos)
  }
}

function limpiar(){
   mostrarTextoEnCaja("cedula","")
    mostrarTextoEnCaja("nombre","")
    mostrarTextoEnCaja("apellido","")
    mostrarTextoEnCaja("ingresos","")
    mostrarTextoEnCaja("egresos","")
    clienteSeleccionado=null
}