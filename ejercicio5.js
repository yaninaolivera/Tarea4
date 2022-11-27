
//14. Elaborar un programa que permita al admin a traves de prompts y alerts lo siguiente:
// CREATE
// El admin debe poder crear un nuevo registro de usuario utilizando la funcion 10.
 
// READ
// El admin debe poder visualizar en pantalla los registros que estan siendo creados.
 
// UPDATE
// El admin, al presionar un boton: "Modificar registro" en la parte inferior de la lista de registros, debe
// ver un prompt que le pida que ingrese el id del registro que desea modificar, en caso no ingrese ninguno,
// debe volver a la pagina inicial. Si elige modificar alguno, debe aparecer nuevamente el prompt del ejercicio 10
// OJO: Cuando el admin modifique el registro, no se debe modificar la fecha de creacion, en su lugar debe aparecer
// un nuevo campo de fecha de modificacion.
 
// DELETE
// El admin, al presionar un boton: "Borrar registro" en la parte inferior de la lista de registros, debe ver
// un prompt que le pida ingresar el id del registro que desea borrar. Al dar click, debe aparecer un prompt
// que le pregunte: "Esta usted seguro? Si/No" y al escribir Si, deberia borrarlo. En cualquier otro caso
// deberia volver a la pagina inicial sin que se haya borrado ningun registro.
 
// OPCIONAL1: Añadir a la tabla la funcionalidad de ordenar los registros al hacer click en los encabezados
// (como en el caso de Pokemon). Sin embargo, al momento de hacer click nuevamente en el encabezado, los datos
// deben ordenarse de manera inversa. Ejemplo: Si al hacer click se ordenan de menor a mayor, al volver a hacer
// click deben ordenarse de mayor a menor.
 
// OPCIONAL2: Crear un selector que permita filtrar los datos por fecha.

const root = document.getElementById("root")

let input = document.createElement("input")
input.type = "date"
input.setAttribute("id", "fecha")
input.addEventListener("change", () => filtrar())
root.append(input)

let table = document.createElement("table")
table.setAttribute("border", "1")

let tr = document.createElement("tr")

let th = document.createElement("th")
th.textContent = "Id"
th.style.cursor = "pointer"
th.addEventListener("click", () => ordenar("id"))
tr.append(th)

th = document.createElement("th")
th.textContent = "Nombre"
th.style.cursor = "pointer"
th.addEventListener("click", () => ordenar("nombre"))
tr.append(th)

th = document.createElement("th")
th.textContent = "Apellido"
th.style.cursor = "pointer"
th.addEventListener("click", () => ordenar("apellido"))
tr.append(th)

th = document.createElement("th")
th.textContent = "Edad"
th.style.cursor = "pointer"
th.addEventListener("click", () => ordenar("edad"))
tr.append(th)

th = document.createElement("th")
th.textContent = "Profesion"
th.style.cursor = "pointer"
th.addEventListener("click", () => ordenar("profesion"))
tr.append(th)

th = document.createElement("th")
th.textContent = "Created_at"
th.style.cursor = "pointer"
th.addEventListener("click", () => ordenar("created_at"))
tr.append(th)

th = document.createElement("th")
th.textContent = "Update_at"
th.style.cursor = "pointer"
th.addEventListener("click", () => ordenar("update_at"))
tr.append(th)

table.append(tr)
root.append(table)

let tbody = document.createElement("tbody")
table.append(tbody)

let create_button = document.createElement("button")
create_button.textContent = "Crear Usuario"
create_button.addEventListener("click", () => agregar())
root.append(create_button)

let update_button = document.createElement("button")
update_button.textContent = "Modificar Usuario"
update_button.addEventListener("click", () => modificar())
root.append(update_button)

let delete_button = document.createElement("button")
delete_button.textContent = "Eliminar Usuario"
delete_button.addEventListener("click", () => eliminar())
root.append(delete_button)

let users = []
let reverse = true

function listar() {
    tbody.innerHTML = ""
    for(index in users){
        tr = document.createElement("tr")
        let td = document.createElement("td")
        td.textContent = users[index]["id"]
        tr.append(td)
        td = document.createElement("td")
        td.textContent = users[index]["nombre"]
        tr.append(td)
        td = document.createElement("td")
        td.textContent = users[index]["apellido"]
        tr.append(td)
        td = document.createElement("td")
        td.textContent = users[index]["edad"]
        tr.append(td)
        td = document.createElement("td")
        td.textContent = users[index]["profesion"]
        tr.append(td)
        td = document.createElement("td")
        td.textContent = users[index]["created_at"]
        tr.append(td)
        td = document.createElement("td")
        td.textContent = users[index]["update_at"]
        tr.append(td)
        tbody.append(tr)
    }
}

function agregar() {
    let fecha = new Date()
    let informacion = prompt("Ingrese la informacion del usuario (nombre, apellido, edad, profesion)")
    informacion = informacion.split(", ")
    let codigo = users.length + 1
    
    if (isNaN(informacion[2]) === false) {
        users.push(
            { id: codigo, nombre: informacion[0], apellido: informacion[1], edad: informacion[2], profesion: informacion[3], created_at: fecha, update_at: "" }
        )
        listar()
    }else{
        alert(`Ingresar una edad correcta`)
    }
}

function modificar() {
    let modificar_id = +prompt("Ingrese el id del registro que desea modificar")
    let posicion = users.map(e => e.id).indexOf(modificar_id)
    if (posicion === -1) {
        alert(`No existe ese registro`)
    }else{
        let informacion = prompt("Ingrese la informacion del usuario (nombre, apellido, edad, profesion)")
        informacion = informacion.split(", ")

        if (isNaN(informacion[2]) === false) {
            users[posicion]["nombre"] = informacion[0]
            users[posicion]["apellido"] = informacion[1]
            users[posicion]["edad"] = informacion[2]
            users[posicion]["profesion"] = informacion[3]
            users[posicion]["update_at"] = new Date()
            listar()
        }else{
            alert(`Ingresar una edad correcta`)
        }
    }
}

function eliminar() {
    let borrar_id = +prompt("Ingrese el id del registro que desea borrar")
    let confirmar = confirm("Esta usted seguro? Si/No");
    if (confirmar === true) {
        let posicion = users.map(e => e.id).indexOf(borrar_id)
        if (posicion === -1) {
            alert(`No existe ese registro`)
        }else{
            users.splice(posicion, 1);
            alert(`Registro eliminado`)
            listar()
        }
    }else{
        alert(`Operación cancelada`)
    }
}

function ordenar(parametro) {
    if (users.length > 0) {
        let strings = ["nombre", "apellido", "profesion"]
        if (strings.includes(parametro)) {
            if (reverse === true) {
                users.sort((a, b) => String(b[parametro]).localeCompare(String(a[parametro])))
            } else {
                users.sort((a, b) => String(a[parametro]).localeCompare(String(b[parametro])))
            }
        }else{
            if (reverse === true) {
                users.sort((a, b) => b[parametro] - a[parametro])
            } else {
                users.sort((a, b) => a[parametro] - b[parametro])
            }
        }
        reverse = !reverse
        listar()
    }
}

function filtrar() {
    let resultados = users;
    if (document.getElementById("fecha").value !== "") {
        users = users.filter(e => (e.created_at.getFullYear() + "-" + (e.created_at.getMonth() + 1) + "-" + e.created_at.getDate()) == document.getElementById("fecha").value)
    }
    listar()
    users = resultados;
}
