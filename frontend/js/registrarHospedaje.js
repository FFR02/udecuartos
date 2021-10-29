const btnEnviar = document.getElementById('btnRegistrar');

//Imagenes
const imageUpload = document.getElementById('img-upload');
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/drwoisvgb/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'bszh8nk7';
var imgURL = "imagen";

imageUpload.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    //Envio a cloudinary
    const res = await axios.post(
        CLOUDINARY_URL,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(
            confirmEnviar(),
            (res) => {
                console.log("enviado");
            }
        ).catch((err => console.log(err)));;
    console.log(res);
    
    //Aca se guarda la url de la imagen en cloudinary
    //Guardamos el url para luego subirlo a la api
    imgURL = res.data.secure_url;
});
function confirmEnviar() {
    btnEnviar.disabled = true; 
    btnEnviar.value = "Enviando...";
    setTimeout(function(){
      btnEnviar.disabled = false;
      btnEnviar.value = "Registrar";
    }, 5000);
    return false;
  }
btnEnviar.addEventListener('click', () => {
    let titulo = document.getElementById('titulo').value;
    let tipo = document.getElementById('tipoHospedaje').value;
    let direccion = document.getElementById('direccion').value;
    let ubicacion = document.getElementById('ubicacion').value;
    let precio = document.getElementById('precio').value;
    precioNumber = parseInt(precio, 10);
    iduser = parseInt(localStorage.getItem('user_id'), 10);
    axios({
        method: 'post',
        url: 'https://localhost:49155/api/hospedaje',
        data: {
            'titulo': titulo,
            'tipo': tipo,
            'direccion': direccion,
            'ubicacion': ubicacion,
            'precio': precioNumber,
            'imagen': imgURL,
            'iduser': iduser
        },
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('user_token') }
    }).then(
        (res) => {
            console.log(res.data);
            location.href = "./MisHospedajes.html";
        }
    ).catch((err => console.log(err)));
}, );

// btnEliminar.addEventListener('click', () => {
//     let id = document.getElementById('identificador').value;
//     axios({
//         method: 'delete',
//         url: 'https://localhost:49155/api/hospedaje/' + id
//     }).then(
//         (res) => {
//             console.log(res.data);
//             location.reload();
//         }
//     ).catch((err => console.log(err)))
// });

