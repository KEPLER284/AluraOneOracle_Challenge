//Letras encriptadas 
var letras = ['a', 'e', 'i', 'o', 'u'];
var letrasEncriptadas = ["ai", "enter", "imes", "ober", "ufat"];

function encontrar(elemento, lista) {
    var encontrado = false;
    for (let i = 0; i < lista.length; i++) {
        if (lista[i] == elemento) {
            encontrado = true;
            break;
        }
    }
    return (encontrado);
}

function encontrarLetra(caracter) {
    return (encontrar(caracter, letras));
}

function mostrarPosicion(elemento, lista) {
    return (lista.indexOf(elemento)); //Devuelve la posicion del elemento dentro de la lista
}

function mostrarPosicionLetra(caracter) {
    return (mostrarPosicion(caracter, letras));
}

function encriptar(caracter) {
    var letraEncriptada = "";

    if (encontrarLetra(caracter, letras) == true) {
        var posicion = mostrarPosicionLetra(caracter); //regresa la posicion para nuestro otro arreglo
        letraEncriptada = letrasEncriptadas[posicion];
        return (letraEncriptada);
    } else {
        return (caracter);
    }
}

function encriptarMensaje(texto) {
    var mensaje = "";
    for (let i = 0; i < texto.length; i++) {
        mensaje += encriptar(texto[i]);
    }
    return (mensaje);
}

function remplazar(texto, elemento, remplazo) {
    var posicion = texto.indexOf(elemento);
    var nuevotexto = "";
    if (posicion != -1) {
        nuevotexto = texto.slice(0, posicion) + remplazo + texto.slice((posicion + elemento.length), texto.length);
        return (remplazar(nuevotexto, elemento, remplazo));
    } else {
        return (texto);
    }
}

function decodificarMensaje(mensaje) {
    var contador = 0;
    var mensajeDecodificado = "";
    while (contador <= letrasEncriptadas.length) {
        mensajeDecodificado = remplazar(mensaje, letrasEncriptadas[contador], letras[contador]);
        mensaje = mensajeDecodificado;
        contador++;
    }
    return (mensajeDecodificado);
}

//seleccion de botones 
var botonEncriptar = document.querySelector("#encriptar");
var botonDesencriptar = document.querySelector("#desencriptar");
var botonCopiar = document.querySelector("#copiar");

//seleccionar el campo de texto 
var campoTexto = document.querySelector(".caja");

//seccion de resultado seleccion de elementos  
var resultado = document.querySelector(".caja-resultado")
var seccionMensaje = document.querySelector(".mensaje");
var imagen = document.querySelector(".resultado-imagen")

//ocultar el boton de copiado
esconder(resultado);
esconder(botonCopiar);

//esconder(seccionMensaje);
//esconder(imagen);

function esconder(elemento) {
    elemento.style.display = "none";
}

function mostrar(elemento) {
    elemento.style.display = "block";
}

function estaOculto(elemento) {
    if(elemento.style.display == "none"){
        return(true);
    }else{
        return(false);
    }
}

function estaVacio(mensaje) {
    if(mensaje.length > 0){
        return(true);
    }else{
        return(false);
    }
}

function obtenerMensajeEncriptado() {
    if (estaVacio(campoTexto.value)) {
        esconder(imagen);
        esconder(seccionMensaje);
        var mensaje = encriptarMensaje(campoTexto.value);
        mostrar(botonCopiar);
        resultado.value = mensaje;
        mostrar(resultado);
    }
}

function obtenerMensajeDecodificado() {
    if(estaVacio(campoTexto.value)){
        if(estaOculto(imagen) && estaOculto(seccionMensaje)){
            resultado.value = decodificarMensaje(campoTexto.value);
        }else {
            esconder(imagen);
            esconder(seccionMensaje);
            resultado.value = decodificarMensaje(campoTexto.value);
            mostrar(resultado);
            mostrar(botonCopiar);
        }
    }
}

function copiarTextoPortapapeles() {
    resultado.select(); //seleccionar el elemento que queremos copiar 
    document.execCommand("copy"); //copia el contenido en el portapapeles 
}

botonEncriptar.onclick = obtenerMensajeEncriptado;

botonDesencriptar.onclick = obtenerMensajeDecodificado;

botonCopiar.onclick = copiarTextoPortapapeles;
