//console.log(autos);
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
const min = max - 10; // Año Minimo

// Generar un Objeto con la Busqueda 
const datosBusqueda = {
    marca: '',
    minimo: '',
    maximo: '',
    year: '',
    puertas: '',
    color: '',
    transmision: ''
}

//console.log(max, min);

//Eventos
document.addEventListener('DOMContentLoaded', () => {
    mostraruAtos(autos); // Mustra los Automoviles al Cargar la Pagína

    // Llena El Select
    llenarSelect();

});
// addEventListener para los Select de Busqueda
marca.addEventListener('change', e =>{
    // console.log(e.target.value);
    datosBusqueda.marca = e.target.value;
    // console.log(datosBusqueda);
    filtrarAuto();

});

minimo.addEventListener('change', e =>{
    // console.log(e.target.value);
    datosBusqueda.minimo = e.target.value;
    // console.log(datosBusqueda);
    filtrarAuto();
});

maximo.addEventListener('change', e =>{
    // console.log(e.target.value);
    datosBusqueda.maximo = e.target.value;
    // console.log(datosBusqueda);
    filtrarAuto();
});

year.addEventListener('change', e =>{
    // console.log(e.target.value);
    datosBusqueda.year = parseInt(e.target.value);
    // console.log(datosBusqueda);
    filtrarAuto();

});

puertas.addEventListener('change', e =>{
    // console.log(e.target.value);
    datosBusqueda.puertas = Number(e.target.value);
    // console.log(datosBusqueda);
    filtrarAuto();

});

color.addEventListener('change', e =>{
    // console.log(e.target.value);
    datosBusqueda.color = e.target.value;
    // console.log(datosBusqueda);
    filtrarAuto();

});

transmision.addEventListener('change', e =>{
    // console.log(e.target.value);
    datosBusqueda.transmision = e.target.value;
     //console.log(datosBusqueda);
     filtrarAuto();

});
// END addEventListener para los Select de Busqueda


// Functiones
function mostraruAtos(autos) {
    limpiarHTML(); // Elimina el HTML Previo
    autos.forEach(auto => {
        const {marca, modelo, year, precio, puertas, color, transmision, } = auto;
        const autoHTML = document.createElement('P');
        autoHTML.textContent = `
        ${marca} ${modelo} - 
        ${year} - ${puertas} Puertas - 
        Transmisión: ${transmision} - Precio: ${precio} - Color: ${color}

        `;

        // Insertar en el HTML
        resultado.appendChild(autoHTML);
    });
}

// Limpiar HTML
function limpiarHTML(){
    while (resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function llenarSelect(){
    //console.log('llenarSelector');
    for (let i = max; i > min; i--) { // Recorre el Arreglo de adelante hacia atras
        //console.log(i);
        const opcion = document.createElement('OPTION'); // Crea un elemento option en el Select
        opcion.value = i; // Value el el Año que e va Recorrido
        opcion.textContent = i; // text content el el Texto
        year.appendChild(opcion); // Agrega las opciones de Año al Select
    }
}

//Funcion que filtra en Base a la Busqueda
function filtrarAuto(){
    //console.log("Filtrando...");
    // console.log(autos);
    const resultado = autos.filter(filtrarMarca).filter(filterYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarColor).filter(filtrarTransmision); ; // funcion de Alto Nivel
    
    if(resultado.length){
    //console.log(resultado);
    mostraruAtos(resultado);
    }else{
        noResultado();
    }
}

// Función en caso de que No se Encuentren Resultados
function noResultado(){
    limpiarHTML();
    const noResultado = document.createElement('DIV');
    noResultado.classList.add('alerta', 'error');
    noResultado.innerHTML = 'No se Encuentraron Resultados... :( <br> Intenta con Otra Busqueda.';
    resultado.appendChild(noResultado);
}

// Filtra el automovil Dependiendo de la Marca
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
        return auto.marca === marca;
    }
    return auto;
}
// Filtra el automovil Dependiendo del Año
function filterYear(auto){
    const {year} = datosBusqueda;
    // console.log(typeof year);
    // console.log(typeof auto.year);
    if(year){
        return auto.year === year;
    }
    return auto;
}
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
// Filtra el Automovil Dependiendo del Color
function filtrarColor(auto){
    const {color} = datosBusqueda;
    if(color){
        return auto.color === color; 
    }
    return auto;
}
// Filtra el Automovil Dependiendo de la Transmision
function filtrarTransmision(auto){
    const {transmision} = datosBusqueda;
    if(transmision){
        return auto.transmision === transmision; 
    }
    return auto;
}