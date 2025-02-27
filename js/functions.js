const botonEncriptar = document.getElementById("boton-encriptar");
const botonDesencriptar = document.getElementById("boton-desencriptar");
const leyenda = document.getElementById("leyenda");
const NODOcontainerImgTexto = document.getElementById("container-ImgTexto");
const NODOareaResultante = document.getElementById("area-resultante");
const cajaTextoResultante = document.getElementById('caja-texto-resultante');
const imagenEncriptacion = document.getElementById("imagen-encriptacion");
const cajaMensajeNoEncontrado = document.getElementById("leyenda-caja-texto-resultante");
const cajaBotonCopiar = document.getElementById("container-boton-copiar");
const botonCopiar = document.getElementById("boton-copiar");

function hayTextoVacio(text){
	let regexTextoVacio = /^(\s){1,}$/g;

	if ((regexTextoVacio.test(text)) || (text === ""))
		return true;
	else
		return false;
}

function comprobarRestriccionTexto(mensaje){
	let hayError = false;
	let regexMayusculas = /[A-ZÁ-Ý]/;
	let regexAcentos = /[À-ÖØ-öø-ÿ]/;
	let regexCharEspeciales = /[`¡!@#$%^&*()_+\-=\[\]{};'¨:"\\|,.<>\/¿?~]/;
	let regexMultiplesEspacios = /\s{2,}/;

	if (regexAcentos.test(mensaje.texto)){
		hayError = true;
		mensaje.warnings += "No ingrese acentos\n";
	}
	if (regexMayusculas.test(mensaje.texto)){
		hayError = true;
		mensaje.warnings += "No ingrese letras mayúsculas\n";
	}
	if (regexCharEspeciales.test(mensaje.texto)){
		hayError = true;
		mensaje.warnings += "No ingrese carácteres especiales\n";
	}
	if (regexMultiplesEspacios.test(mensaje.texto)){
		hayError = true;
		mensaje.warnings += "Ingrese solo un espacio entre palablas\n";
	}

	if (hayError)
		mensaje.esValido = false;
	return mensaje;
}

function encriptar(mensaje){
	// Los ordenes de las vocales se invierten para que no se encripte una cadena
	// anterior que ya contenga una vocal

	mensaje.texto = mensaje.texto.replace(/e/mg, "enter");
	mensaje.texto = mensaje.texto.replace(/i/mg, "imes");
	mensaje.texto = mensaje.texto.replace(/a/mg, "ai");
	mensaje.texto = mensaje.texto.replace(/o/mg, "ober");
	mensaje.texto = mensaje.texto.replace(/u/mg, "ufat");
	return mensaje;
}
function desencriptar(mensaje){

	mensaje.texto = mensaje.texto.replace(/enter/mg, "e");
	mensaje.texto = mensaje.texto.replace(/imes/mg, "i");
	mensaje.texto = mensaje.texto.replace(/ai/mg, "a");
	mensaje.texto = mensaje.texto.replace(/ober/mg, "o");
	mensaje.texto = mensaje.texto.replace(/ufat/mg, "u");
	return mensaje;
}

function funcionEncriptacion(event){

	const mensaje = {
		texto: document.getElementById('caja-de-texto').value,
		esValido: true,
		warnings: ""
	};
	cajaTextoResultante.value = "";
	// let regexTexto = /^([a-zñ0-9]|\s?)([a-zñ0-9]\s?){1,}$/g

	if (!hayTextoVacio(mensaje.texto)) {
		comprobarRestriccionTexto(mensaje);
		if (mensaje.esValido){
			if (event.target.name == 'botonEncriptar'){
				encriptar(mensaje);
				imagenEncriptacion.style.display = "none";
				cajaMensajeNoEncontrado.style.display = "none";
				cajaTextoResultante.style.display = "block";
			}
			else
				desencriptar(mensaje);
			document.getElementById('caja-texto-resultante').value = mensaje.texto;
			cajaBotonCopiar.style.display = "flex";
			leyenda.textContent = "Sólo letras minúsculas y sin acentos, ni números o carácteres especiales";
			document.getElementById("leyenda-caja-de-texto").classList.remove("caja-error");
		}
		else {
			console.warn(mensaje.warnings);
			document.getElementById("leyenda-caja-de-texto").classList.add("caja-error");
			leyenda.textContent = mensaje.warnings;
			document.getElementById('caja-de-texto').focus();
		}
	} else {
		console.warn("Ningún mensaje fue encontrado / El texto está vacío");
		leyenda.textContent = "Sólo letras minúsculas y sin acentos, ni números o carácteres especiales";
		document.getElementById("leyenda-caja-de-texto").classList.remove("caja-error");
		// Restaurar muñeco
		imagenEncriptacion.style.display = "block";
		cajaMensajeNoEncontrado.style.display = "block";
		cajaTextoResultante.style.display = "none";
		cajaBotonCopiar.style.display = "none";
		document.getElementById('caja-de-texto').focus();
	}
}

function funcionCopiar(e){
	e.preventDefault();

	cajaTextoResultante.select();
  	document.execCommand('copy');
  	console.log("Texto copiado!");
}

// Funciones en botones
botonEncriptar.onclick = funcionEncriptacion;
botonDesencriptar.onclick = funcionEncriptacion;
botonCopiar.onclick = funcionCopiar;