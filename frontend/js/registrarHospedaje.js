const btnEnviar = document.getElementById('btnEnviar');



btnEnviar.addEventListener('click', () => {
    let titulo = document.getElementById('titulo').value;
    let tipo = document.getElementById('tipoHospedaje').value;
    let direccion = document.getElementById('direccion').value;

    axios({
        method: 'post',
        url: 'https://localhost:44389/api/hospedaje',
        data: {
            'titulo': titulo,
            'tipo': tipo,
            'direccion': direccion
        }
    }).then(
        (res) => {
            console.log(res.data)
        }
    ).catch((err => console.log(err)))
});

