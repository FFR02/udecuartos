const app = new Vue({
    el: "#app",
    data: function () {
        return {
            hospedajes: [],
            modal: false,
            currentHosp: {},
            nombre: '',
            error: false,
            logged: false
        };
    },
    created() {
        if(localStorage.getItem('user_token')){
            this.fetch();
            this.logged = true;
        }else{
            location.href ="./login.html";
        }
    },
    methods: {
        fetch() {
            this.nombre = localStorage.getItem('user_id');
            let result = axios
                .get("https://localhost:49155/api/mishospedajes/"+localStorage.getItem('user_id'),{
                    headers: {'Authorization': 'Bearer '+ localStorage.getItem('user_token')}
                })
                .then((res) => {
                    //api hospedajes
                    if(res.data == 'value' || res.data == 0){
                        this.error = true;
                    }else{
                        this.error = false;
                        this.hospedajes = res.data;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        verModal(id) {
            this.fetchOne(id);
        },
        async fetchOne(id) {
            let url = "https://localhost:49155/api/hospedaje/" + id;
            let result = await axios.get(url, {
                headers: {'Authorization': 'Bearer '+ localStorage.getItem('user_token')}
            });
            this.currentHosp = result.data;
            $('#modalID').modal('show')
            this.modal = true;;
        },
        eliminar(id){
            axios({
                method: 'delete',
                url: 'https://localhost:49155/api/hospedaje/' + id,
                headers: {'Authorization': 'Bearer '+ localStorage.getItem('user_token')}
            }).then(
                (res) => {
                    console.log(res.data);
                    location.href ="./mishospedajes.html";
                }
            ).catch((err => console.log(err)))
        },
        modalView(){
            $('#modalR').modal('show')
            this.modal = true;
        },
        cerrarSesion(){
            localStorage.clear();
            location.href ="./login.html";
        }
    }
});