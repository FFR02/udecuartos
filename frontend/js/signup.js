const app = new Vue({
    el: "#app",
    data: function() {
        return {
            nombres: '',
            apellidos: '',
            nombreCompleto: '',
            correo: '',
            cedula: '',
            ubicacion: '',
            contraseña: '',
            recontraseña: '',
            error: false,
        }

    },
    methods: {
        validar(){
            if(this.contraseña != this.recontraseña){
                this.error = true;
                return;
            }else{
                this.error = false;
                this.nombreCompleto = this.nombres + " " + this.apellidos;
                this.signup();
            }
        },
        signup() {
            this.cedula= this.cedula.toString();
            var docNumber = Number(this.cedula)
            axios({
                method: 'post',
                url: 'https://localhost:49159/api/user',
                data: {
                    'nombre': this.nombreCompleto,
                    'cedula': docNumber,
                    'ubicacion': this.ubicacion,
                    'correo': this.correo,
                    'clave': this.contraseña
                }
            }).then(
                (res) => {
                    console.log(res.data);
                    location.href ="./login.html";
                }
            ).catch((err => console.log(err)));

        }
    }

}).$mount('#app')
