const btnLog = document.getElementById('btnLog');

btnEnviar.addEventListener('click', () => {
    let correo = document.getElementById('correo').value;
    let clave = document.getElementById('clave').value;
    axios({
        method: '',
        url: '',
        data: {
        }
    }).then(
        (res) => {
            console.log(res.data);
            location.reload();
        }
    ).catch((err => console.log(err)));
});



