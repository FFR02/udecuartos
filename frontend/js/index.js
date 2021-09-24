
function getData(){
    axios({
        method: 'GET',
        url: 'https://localhost:44389/api/hospedaje'
    }).then(res => {
        const list = document.getElementById('list')
        const fragment = document.createDocumentFragment()
        for (const userInfo of res.data) {
            const listItem = document.createElement('LI')
            listItem.textContent = `${userInfo.id} - ${userInfo.titulo} - ${userInfo.tipo} - ${userInfo.direccion}`
            listItem.className = "list-group-item";
            fragment.appendChild(listItem)
        }
        list.appendChild(fragment)
    }).catch(err => console.log(err))
}

document.addEventListener('DOMContentLoaded', getData, false)

