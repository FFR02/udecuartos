const app = new Vue({
    el: "#app",
    data: function () {
        return {
            correo: '',
            clave: '',
            error: false
        }

    },
    methods: {
        login() {
            axios({
                method: 'post',
                url: 'https://localhost:49159/api/login',
                data: {
                    'correo': this.correo,
                    'clave': this.clave
                }
            }).then(
                (res) => {
                    this.error=false;
                    console.log(res.data);
                    localStorage.setItem('user_token', res.data.token);
                    localStorage.setItem('user_id', res.data.userData.id);
                    location.href ="./todos.html";
                }
            ).catch((err => 
                console.log(err),
                this.error=true
                ));

        }
    }

}).$mount('#app')



