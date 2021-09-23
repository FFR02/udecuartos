const btnEnviar = document.getElementById('btnEnviar');
const btnEliminar = document.getElementById('btnDelete');

btnEnviar.addEventListener('click', () => {
    let titulo = document.getElementById('titulo').value;
    let tipo = document.getElementById('tipoHospedaje').value;
    let ubicacion = document.getElementById('ubicacion').value;
    let precio = document.getElementById('precio').value;
    let userid = document.getElementById('userId').value;

    axios({
        method: 'post',
        url: 'https://localhost:44389/api/inmueble',
        data: {
            'titulo': titulo,
            'tipo': tipo,
            'ubicacion': ubicacion,
            'precio': precio,
            'userId': userid
        }
    }).then(
        (res) => {
            console.log(res.data)
        }
    ).catch((err => console.log(err)))
});

btnEliminar.addEventListener('click', () => {
    let id = document.getElementById('identificador').value;
    axios({
        method: 'delete',
        url: 'https://localhost:44389/api/inmueble/'+ id
    }).then(
        (res) => {
            console.log(res.data)
        }
    ).catch((err => console.log(err)))
});

