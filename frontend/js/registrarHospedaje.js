const btnEnviar = document.getElementById('btnEnviar');
const btnEliminar = document.getElementById('btnDelete');

//Imagenes
const imagePreview = document.getElementById('img-preview');
const imageUpload = document.getElementById('img-upload');
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/drwoisvgb/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'bszh8nk7';

var imgURL="imagen";

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
        }
    );
    console.log(res);
    //Aca se guarda la url de la imagen en cloudinary
    imagePreview.src = res.data.secure_url;
    //Guardamos el url para luego subirlo a la api
    imgURL = res.data.secure_url;
});


btnEnviar.addEventListener('click', () => {
    let titulo = document.getElementById('titulo').value;
    let tipo = document.getElementById('tipoHospedaje').value;
    let direccion = document.getElementById('direccion').value;
    let ubicacion = document.getElementById('ubicacion').value;
    let precio = document.getElementById('precio').value;
    precioNumber = parseInt(precio, 10);
    axios({
        method: 'post',
        url: 'https://localhost:49159/api/hospedaje',
        data: {
            'titulo': titulo,
            'tipo': tipo,
            'direccion': direccion,
            'ubicacion': ubicacion,
            'precio': precioNumber,
            'imagen': imgURL
        }
    }).then(
        (res) => {
            console.log(res.data);
            location.reload();
        }
    ).catch((err => console.log(err)));
});

btnEliminar.addEventListener('click', () => {
    let id = document.getElementById('identificador').value;
    axios({
        method: 'delete',
        url: 'https://localhost:49159/api/hospedaje/' + id
    }).then(
        (res) => {
            console.log(res.data);
            location.reload();
        }
    ).catch((err => console.log(err)))
});

