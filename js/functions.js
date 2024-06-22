const botonEncriptar = document.getElementById("boton-encriptar");
const botonDesencriptar = document.getElementById("boton-desencriptar");
const cajaTextoResultante = document.getElementById('caja-texto-resultante');
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
		mensaje.warnings += `No ingrese acentos\n`;
	}
	if (regexMayusculas.test(mensaje.texto)){
		hayError = true;
		mensaje.warnings += `No ingrese letras mayúsculas\n`;
	}
	if (regexCharEspeciales.test(mensaje.texto)){
		hayError = true;
		mensaje.warnings += `No ingrese carácteres especiales\n`;
	}
	if (regexMultiplesEspacios.test(mensaje.texto)){
		hayError = true;
		mensaje.warnings += `Ingrese solo un espacio entre palablas\n`;
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
			if (event.target.name == 'botonEncriptar')
				encriptar(mensaje);
				else
					desencriptar(mensaje);
			document.getElementById('caja-texto-resultante').value = mensaje.texto;
			botonCopiar.classList.remove('ocultar');
		}
		else {
			console.log(mensaje.warnings);
			document.getElementById('caja-de-texto').focus();
		}
	} else {
		mensaje.warnings = "No hay texto / Texto vacio";
		console.log(mensaje.warnings);
		document.getElementById('caja-de-texto').focus();
	}
}

function funcionCopiar(e){
	e.preventDefault();

	cajaTextoResultante.select();
  	document.execCommand('copy');
  	console.log("Texto copiado!");
}

botonEncriptar.onclick = funcionEncriptacion;
botonDesencriptar.onclick = funcionEncriptacion;
botonCopiar.onclick = funcionCopiar;