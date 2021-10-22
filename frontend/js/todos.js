const app = new Vue({
    el: "#app",
    data: function () {
        return {
            hospedajes: [],
            modal: false,
            currentHosp: {},
            nombre: ''
        };
    },
    created() {
        if(localStorage.getItem('user_token')){
            this.fetch();
        }else{
            location.href ="./login.html";
        }
        
    },
    methods: {
        fetch() {
            this.nombre = localStorage.getItem('user_id')
            let result = axios
                .get("https://localhost:49153/api/hospedaje",{
                    headers: {'Authorization': 'Bearer '+ localStorage.getItem('user_token')}
                })
                .then((res) => {
                    //api hospedajes
                    this.hospedajes = res.data;
                    console.log(res.data);
                })
                .catch((err) => {
                    console.log(result);
                    console.log(err);
                });
        },
        verModal(id) {
            this.fetchOne(id);
        },
        async fetchOne(id) {
            let url = "https://localhost:49153/api/hospedaje/" + id;
            let result = await axios.get(url, {
                headers: {'Authorization': 'Bearer '+ localStorage.getItem('user_token')}
            });
            this.currentHosp = result.data;
            $('#modalID').modal('show')
            this.modal = true;
        },
        cerrarSesion(){
            localStorage.clear();
            location.href ="./login.html";
        }
    }
});