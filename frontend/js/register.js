const imagePreview = document.getElementById('img-preview');

function getData() {
    axios({
        method: 'GET',
        url: 'https://localhost:49155/api/hospedaje'
    }).then(res => {
        const list = document.getElementById('list')
        const fragment = document.createDocumentFragment()
        for (const userInfo of res.data) {
            const listItem = document.createElement('LI')
            const imagen = document.createElement('img')
            listItem.textContent = `${userInfo.id} - ${userInfo.titulo} - ${userInfo.tipo} - ${userInfo.direccion} - ${userInfo.imagen}`
            listItem.className = "list-group-item";
            imagen.src = `${userInfo.imagen}`;

            var a = document.createElement('a');
            var linkText = document.createTextNode("Detalles");
            a.appendChild(linkText);
            a.title = "Detalles";
            a.href = "#";

            fragment.appendChild(imagen);
            fragment.appendChild(a);
            fragment.appendChild(listItem)
        }
        list.appendChild(fragment)
    }).catch(err => console.log(err))
}

document.addEventListener('DOMContentLoaded', getData, false)

