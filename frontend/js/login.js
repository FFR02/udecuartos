const btnLog = document.getElementById('btnLog');

btnLog.addEventListener('click', () => {
    let correo = document.getElementById('correo').value;
    let clave = document.getElementById('clave').value;
    axios({
        method: 'post',
        url: 'https://localhost:44389/api/login',
        data: {
            'correo': correo,
            'clave': clave
        }
    }).then(
        (res) => {
            console.log(res.data);
            //location.reload();
        }
    ).catch((err => console.log(err)));
});



