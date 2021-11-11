const i18n = new VueI18n({
    locale: localStorage.getItem("lang") || 'es',
    messages: {
      es: {
        bienvenido: '¡Bienvenido!',
        ingresaCorreo: 'Ingresa con tu correo electronico',
        correo: 'Correo electronico',
        clave: 'Contraseña',
        iniciarSesion: "Iniciar sesion",
        registrarse: "Registrarse",
        verificaInfo: '¡Verifica tu información!',
        noTienesCuenta: '¿No tienes una cuenta?',
        recuperarClave: '¿Olvidate tú contraseña?',
        seleccionaIdioma: "Selecciona un idioma",
        guardar: "Guardar",
        cerrar: "Cerrar",
      },
      en: {
        bienvenido: '¡Welcome!',
        ingresaCorreo: 'Enter with your email',
        correo: 'Email',
        clave: 'Password',
        iniciarSesion: "Login",
        registrarse: "Sign up",
        verificaInfo: 'Check your information!',
        noTienesCuenta: 'You do not have an account?',
        recuperarClave: 'Forgot your password?',
        seleccionaIdioma: "Choose a language",
        guardar: "Save",
        cerrar: "Close",
      },
      pt: {
        bienvenido: '¡Receber!',
        ingresaCorreo: 'Entre com seu email',
        correo: 'Correio eletrônico',
        clave: 'Senha',
        iniciarSesion: "Entrar",
        registrarse: "Cadastre-se",
        verificaInfo: 'Verifique suas informações!',
        noTienesCuenta: 'Você não tem uma conta?',
        recuperarClave: 'Esqueceu sua senha?',
        seleccionaIdioma: "Escolha um idioma",
        guardar: "Salve",
        cerrar: "Fechar",
      }
    },
  });

const app = new Vue({
    el: "#app",
    i18n,
    data: function () {
        return {
            correo: '',
            clave: '',
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
        login() {
            axios({
                method: 'post',
                // url: 'https://localhost:44389/api/login',
                url: 'https://udecuartos-backend.azurewebsites.net/api/login',
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
                    location.href ="./MisHospedajes.html";
                }
            ).catch((err) => {
                console.log(err)
                this.error=true
            });

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



