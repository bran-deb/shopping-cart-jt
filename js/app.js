const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const listaCursos = document.querySelector('#lista-cursos')
const vaciarCarrito = document.querySelector('#vaciar-carrito')

let articulosCarrito = [];

const cargarCarrito = () => {
    listaCursos.addEventListener('click', addCurso)

    carrito.addEventListener('click', eliminarCurso)

    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = []//resetea el array
        limpiarHTML() //eliminamos todo el html
    })
}

const addCurso = (e) => {
    e.preventDefault()

    if (e.target.classList.contains('agregar-carrito')) {
        //traversing the DOM de child al padre
        const cursoSeleccionado = e.target.parentElement.parentElement
        //mandamos el elemento padre
        leerDatosCurso(cursoSeleccionado)
    }
}
//Eliminar curso del carrito
const eliminarCurso = (e) => {
    e.preventDefault()

    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id')
        //eliminar del arreglo de articulos por el data-id (listamos todos menos el cursoid)
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)
        carritoHTML()//itera sobre el carrito y obtiene su html
    }
}

//lee el contenido del html al que le dimos click y extrae la informacion del curso
const leerDatosCurso = (curso) => {
    // console.log(curso);
    //crearObjeto con los datos delcursoseleccionado
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('.info-card h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    //verificar si existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)
    if (existe) {
        //actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++
                return curso//retorna objeto actualizado
            } else {
                return curso //retorna los objetos que no son duplicados
            }
        })
        articulosCarrito = [...cursos]
    } else {
        //agregamos el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso]
    }
    console.log(articulosCarrito);
    carritoHTML()
    //add elements to cart array
}

//muestra el carrito de compras en el HTML
const carritoHTML = () => {
    limpiarHTML()
    //recorrer el HTML
    articulosCarrito.forEach((curso) => {
        const { imagen, titulo, precio, id } = curso
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `
        //agrega el HTML contenido en row(tipo tr que contiene un td)
        //del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}


//elimina los cursos del tbody
const limpiarHTML = () => {
    //forma lenta de eliminar codigo HTML
    // contenedorCarrito.innerHTML = ``
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}
cargarCarrito()