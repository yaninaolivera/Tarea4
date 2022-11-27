// 10. Crear una funcion que te permita ingresar en un prompt la informacion de un usuario de la siguiente manera:
// "Ingrese la informacion del usuario (nombre, apellido, edad, profesion)"
// El usuario digitara: Andres, Perez, 28, ingeniero.
// La informacion debe ser guardada como objeto dentro del array users asignadole un id unico a cada registro.

let users = []

function agregar() {
    let informacion = prompt("Ingrese la informacion del usuario (nombre, apellido, edad, profesion)")
    informacion = informacion.split(", ")
    let codigo = users.length + 1 
    users.push({id: codigo, nombre: informacion[0], apellido: informacion[1], edad: informacion[2], profesion: informacion[3]})
    console.log(users)
}

agregar()
