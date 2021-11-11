const i18n = new VueI18n({
    locale: localStorage.getItem('lang') || 'es',
    messages: {
        es: {
            inicio: "Inicio",
            ayuda: "Ayuda",
            acercaDe: "Acerca de",
            vuelveteArrendador: "¡Vuelvete arrendador!",
            iniciarSesion: "Iniciar sesion",
            registrarse: "Registrarse",
            buscar: "Buscar",
            agregaUbicacion: "Agrega una ubicacion",
            seleccionaIdioma: "Selecciona un idioma",
            verMas: 'Ver más',
            guardar: "Guardar",
            cerrar: "Cerrar",
            verPerfil: 'Ver mi perfil',
            explorar: 'Descubre',
            misHospedajes: 'Mis hospedajes',
            cerrarSesion: "Cerrar Sesion",
          },
          en: {
            inicio: "Home",
            ayuda: "Help",
            acercaDe: "About us",
            vuelveteArrendador: "¡Become a lessor!",
            iniciarSesion: "Login",
            registrarse: "Sign up",
            buscar: "Search",
            agregaUbicacion: "Add a location",
            seleccionaIdioma: "Choose a language",
            verMas: 'See more',
            guardar: "Save",
            cerrar: "Close",
            verPerfil: 'See my profile',
            explorar: 'Discover',
            misHospedajes: 'My lodgings',
            cerrarSesion: "Log out",
          },
          pt: {
            inicio: "Começo",
            ayuda: "Ajuda",
            acercaDe: "Sobre nós",
            vuelveteArrendador: "!Se tornar um senhorio!",
            iniciarSesion: "Entrar",
            registrarse: "Cadastre-se",
            buscar: "Procurar",
            agregaUbicacion: "Adicionar um local",
            seleccionaIdioma: "Escolha um idioma",
            verMas: 'Ver mais',
            guardar: "Salve",
            cerrar: "Fechar",
            verPerfil: 'Veja meu perfil',
            explorar: 'Descobrir',
            misHospedajes: 'Meus alojamentos',
            cerrarSesion: "Sair",
          }
    },
});

const app = new Vue({
    el: "#app",
    i18n,
    data: function () {
        return {
            hospedajes: [],
            modal: false,
            currentHosp: {},
            logged: false,
            nombre: '',
            lang: localStorage.getItem('lang') || 'es'
        };
    },
    created() {
        if(localStorage.getItem('user_token')){
            this.fetch();
            this.logged = true;
        }else{
            location.href ="./login.html";
        }

        let langs = document.getElementsByName("languages");
        for (let i = 0; i < langs.length; i++) {
            if (langs[i].value == this.lang) {
                langs[i].setAttribute("checked", "");
            }
        }
    },
    methods: {
        fetch() {
            this.nombre = localStorage.getItem('user_id')
            let result = axios
                .get("https://udecuartos-backend.azurewebsites.net/api/hospedaje",{
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
            let url = "https://udecuartos-backend.azurewebsites.net/api/hospedaje/" + id;
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
});