const i18n = new VueI18n({
    locale: localStorage.getItem("lang") || 'es',
    messages: {
      es: {
        crearCuenta: 'Crea tu cuenta',
        usaCorreo: 'Usa tu correo electronico',
        nombres: 'Nombres',
        apellidos: 'Apellidos',
        cedula: 'Documento de identidad',
        ubicacion: 'Ubicacion',
        correo: 'Correo electronico',
        clave: 'Contraseña',
        repiteClave: 'Repite tu contraseña',
        iniciarSesion: "Iniciar sesion",
        registrarse: "Registrarse",
        verificaInfo: '¡Las contraseñas no coinciden!',
        yaTienesCuenta: '¿Ya tienes una cuenta?',
        seleccionaIdioma: "Selecciona un idioma",
        guardar: "Guardar",
        cerrar: "Cerrar",
      },
      en: {
        crearCuenta: 'Creat your account',
        usaCorreo: 'Use your email',
        nombres: 'Names',
        apellidos: 'Surnames',
        cedula: 'Identification card',
        ubicacion: 'Location',
        correo: 'Email',
        clave: 'Password',
        repiteClave: 'Repeat your password',
        iniciarSesion: "Login",
        registrarse: "Sign up",
        verificaInfo: 'Passwords do not match!',
        yaTienesCuenta: 'Do you already have an account?',
        seleccionaIdioma: "Choose a language",
        guardar: "Save",
        cerrar: "Close",
      },
      pt: {
        crearCuenta: 'Crie sua conta',
        usaCorreo: 'Use seu email',
        nombres: 'Nomes',
        apellidos: 'Sobrenomes',
        cedula: 'Carteira de identidade',
        ubicacion: 'Localização',
        correo: 'Correio eletrônico',
        clave: 'Senha',
        repiteClave: 'Repita sua senha',
        iniciarSesion: "Entrar",
        registrarse: "Cadastre-se",
        verificaInfo: 'As senhas não correspondem!',
        yaTienesCuenta: 'Você já tem uma conta?',
        seleccionaIdioma: "Escolha um idioma",
        guardar: "Salve",
        cerrar: "Fechar",
      }
    },
});

const app = new Vue({
    el: "#app",
    i18n,
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
            lang: localStorage.getItem("lang") || "es",
        }

    },
    created() {
        let langs = document.getElementsByName("languages");
        for (let i = 0; i < langs.length; i++) {
          if (langs[i].value == this.lang) {
            langs[i].setAttribute("checked", "");
          }
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
                url: 'https://localhost:44389/api/user',
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

        },
        changeLanguage: function () {
            let langs = document.getElementsByName("languages");

            for (let i = 0; i < langs.length; i++) {
                if (langs[i].checked) {
                    localStorage.setItem("lang", langs[i].value);
                }
            }

            window.location.reload();
        },
    }

}).$mount('#app')
