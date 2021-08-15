const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito')
const listaCursos = document.querySelector('#lista-cursos')
const vaciarCarrito = document.querySelector('#vaciar-carrito')


const cargarCarrito = () => {
    listaCursos.addEventListener('click', addCurso)
}

const addCurso = (e) => {
    e.preventDefault()
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado)
    }
}

//lee el contenido del html al que le dimos click y extrae la informacion del curso
const leerDatosCurso = (curso) => {
    console.log(curso);
    //crearObjeto con los datos delcursoseleccionado
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('.info-card h4').textContent,
        precio: curso.querySelector('.precio').textContent

    }
    console.log(infoCurso);
}



cargarCarrito()
