//console.log(autos); // Trae el Arreglo del archivo db.js
// Variables
const marca = document.querySelector('#marca');
const modelo = document.querySelector('#modelo');
const year = document.querySelector('#year');
const precio = document.querySelector('#precio');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');

const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear(); // Año Maximo Funcion para tomar el Año Actual
const min = max - 10; // Año Minimo (Año Actual Menos 10)
// END Variables

// Generar un Objeto con la Busqueda 
const datosBusqueda = { // Va llenado el Objeto con Forme se va Seleccionando
    marca: '',
    minimo: '',
    maximo: '',
    year: '',
    puertas: '',
    color: '',
    transmision: ''
}
// END Generar un Objeto con la Busqueda 

//console.log(max, min);

//Eventos
// addEventListener para Mostrar los autos cuando el Archivo HTML este Cargado
document.addEventListener('DOMContentLoaded', () => {
    mostraruAtos(autos); // Mustra los Automoviles al Cargar la Pagína
    // Función que Llena El Select de Año
    llenarSelect();
});
// addEventListener para los Select de Busqueda
// Agrega la Seleccion al Arreglo en el Elemento de Marca
marca.addEventListener('change', e =>{
    // console.log(e.target.value);
    datosBusqueda.marca = e.target.value;
    // console.log(datosBusqueda);
    filtrarAuto();

});
// Agrega la Seleccion al Arreglo en el Elemento de Minimo
minimo.addEventListener('change', e =>{
    // console.log(e.target.value);
    datosBusqueda.minimo = e.target.value;
    // console.log(datosBusqueda);
    filtrarAuto();
});
// Agrega la Seleccion al Arreglo en el Elemento de Maximo
maximo.addEventListener('change', e =>{
    // console.log(e.target.value);
    datosBusqueda.maximo = e.target.value;
    // console.log(datosBusqueda);
    filtrarAuto();
});
// Agrega la Seleccion al Arreglo en el Elemento de Year
year.addEventListener('change', e =>{
    // console.log(e.target.value);
    datosBusqueda.year = parseInt(e.target.value); // parseInt convierte a tipo de Dato a Entero
    // console.log(datosBusqueda);
    filtrarAuto();

});
// Agrega la Seleccion al Arreglo en el Elemento de Puertas
puertas.addEventListener('change', e =>{
    // console.log(e.target.value);
    datosBusqueda.puertas = Number(e.target.value); // Convierte el Tipo de Dato a Numero
    // console.log(datosBusqueda);
    filtrarAuto();

});
// Agrega la Seleccion al Arreglo en el Elemento de Color
color.addEventListener('change', e =>{
    // console.log(e.target.value);
    datosBusqueda.color = e.target.value;
    // console.log(datosBusqueda);
    filtrarAuto();

});
// Agrega la Seleccion al Arreglo en el Elemento de Transmision
transmision.addEventListener('change', e =>{
    // console.log(e.target.value);
    datosBusqueda.transmision = e.target.value;
     //console.log(datosBusqueda);
     filtrarAuto();

});
// END addEventListener para los Select de Busqueda


// Functiones
// Función que recorre el Arreglo y muestra los autos del Arrglo
function mostraruAtos(autos) {
    limpiarHTML(); // Elimina el HTML para Cuando este se haya Filtrado
    autos.forEach(auto => {
        const {marca, modelo, year, precio, puertas, color, transmision, } = auto;
        const autoHTML = document.createElement('P'); // Crear un Parrafo para cada auto
        autoHTML.textContent = `
        ${marca} ${modelo} - 
        ${year} - ${puertas} Puertas - 
        Transmisión: ${transmision} - Precio: ${precio} - Color: ${color}
        `;

        // Insertar en el HTML
        resultado.appendChild(autoHTML); // Agregar el HTML por cada Iteración
    });
}

// Limpiar HTML Previo
function limpiarHTML(){
    while (resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}
// END Limpiar HTML Previo

//Función que Llena El Select de Año
function llenarSelect(){
    //console.log('llenarSelector');
    for (let i = max; i > min; i--) { // Recorre el Arreglo de Adelante Hacia Atras del 2023 al 2013
        //console.log(i);
        const opcion = document.createElement('OPTION'); // Crea un elemento option en el Select con los Años Recorridos
        opcion.value = i; // Value el el Año que va Recorrido
        opcion.textContent = i; // text content el Texto
        year.appendChild(opcion); // Agrega las opciones de Año al Select
    }
}
// END Función que Llena El Select de Año

// Funcion que Filtra en Base ala Selección de Busqueda
function filtrarAuto(){
    //console.log("Filtrando...");
    // console.log(autos);
    const resultado = autos.filter(filtrarMarca).filter(filterYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarColor).filter(filtrarTransmision); ; // funcion de Alto Nivel
    // filter Soporta el Encadenamiento para ir "Guardando" los Filtros Seleccionados
    if(resultado.length){ // Si el Resultado Contiene algo
    //console.log(resultado);
    mostraruAtos(resultado); // Funcion que Muestra en el HTML con los Filtros Seleccionados
    }else{
        noResultado(); // Función en caso de No Tener Resultados
    }
}
// END Funcion que Filtra en Base ala Selección de Busqueda

// Función en caso de que No se Encuentren Resultados
function noResultado(){
    limpiarHTML(); // Elimina el HTML para Cuando este se haya Filtrado
    const noResultado = document.createElement('DIV');
    noResultado.classList.add('alerta', 'error');
    noResultado.innerHTML = 'No se Encuentraron Resultados... :( <br> Intenta con Otra Busqueda.'; // InnerHTML Soporta Etiquetas como en este caso <br>
    resultado.appendChild(noResultado);
}
// END Función en caso de que No se Encuentren Resultados


// Filtra el automovil Dependiendo de la Marca Seleccionada
function filtrarMarca(auto){
    //console.log(auto);
    /*
    if(datosBusqueda.marca){
        return auto.marca === datosBusqueda.marca;
    } 
    return auto;
    */
    const {marca} = datosBusqueda;
    if(marca){
        return auto.marca === marca; // Auto Seleccionado Identico a la Marca Existente
    }
    return auto;
}
// END Filtra el automovil Dependiendo de la Marca Seleccionada

// Filtra el automovil Dependiendo del Año Seleccionado
function filterYear(auto){
    const {year} = datosBusqueda;
    // console.log(typeof year);
    // console.log(typeof auto.year);
    if(year){
        return auto.year === year;
    }
    return auto;
}
// END Filtra el automovil Dependiendo del Año Seleccionado

// Filtra el automovil Dependiendo del Precio Minimo
function filtrarMinimo(auto){
    const {minimo} = datosBusqueda;
    // console.log(typeof minimo);
    // console.log(typeof auto.minimo);
    if(minimo){
        return auto.precio >= minimo;
    }
    return auto;
}
// END Filtra el automovil Dependiendo del Precio Minimo

// Filtra el automovil Dependiendo del Precio Maximo
function filtrarMaximo(auto){
    const {maximo} = datosBusqueda;
    // console.log(typeof maximo);
    // console.log(typeof auto.maximo);
    if(maximo){
        return auto.precio <= maximo;
    }
    return auto;
}
// END Filtra el automovil Dependiendo del Precio Maximo

// Filtra el automovil Dependiendo del Numero de Puertas
function filtrarPuertas(auto){
    const {puertas} = datosBusqueda;
    // console.log(typeof puertas);
    // console.log(typeof auto.puertas);
    if(puertas){
        return auto.puertas === puertas; 
    }
    return auto;
}
// END Filtra el automovil Dependiendo del Numero de Puertas

// Filtra el Automovil Dependiendo del Color
function filtrarColor(auto){
    const {color} = datosBusqueda;
    if(color){
        return auto.color === color; 
    }
    return auto;
}
// END Filtra el Automovil Dependiendo del Color

// Filtra el Automovil Dependiendo de la Transmision
function filtrarTransmision(auto){
    const {transmision} = datosBusqueda;
    if(transmision){
        return auto.transmision === transmision; 
    }
    return auto;
}
// END Filtra el Automovil Dependiendo de la Transmision
