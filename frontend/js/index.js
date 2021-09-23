
function getData(){
    axios({
        method: 'GET',
        url: 'https://localhost:44389/api/inmueble'
    }).then(res => {
        const list = document.getElementById('list')
        const fragment = document.createDocumentFragment()
        for (const userInfo of res.data) {
            const listItem = document.createElement('LI')
            listItem.textContent = `${userInfo.titulo} - ${userInfo.tipo} - ${userInfo.ubicacion}  - ${userInfo.precio}`
            fragment.appendChild(listItem)
        }
        list.appendChild(fragment)
    }).catch(err => console.log(err))
}

document.addEventListener('DOMContentLoaded', getData, false)

