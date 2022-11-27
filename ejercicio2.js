// 11. Utilizando el objeto Date, añadir la propiedad created_date de manera interna en donde se registre el
// momento en que ese registro fue creado.

let users = []

function agregar() {
    let fecha = new Date()
    let informacion = prompt("Ingrese la informacion del usuario (nombre, apellido, edad, profesion)")
    informacion = informacion.split(", ")
    let codigo = users.length + 1
    users.push({id: codigo, nombre: informacion[0], apellido: informacion[1], edad: informacion[2], profesion: informacion[3], created_at: fecha})
    console.log(users)
}
agregar()
