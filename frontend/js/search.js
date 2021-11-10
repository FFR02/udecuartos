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
            misHospedajes: 'My lodgings',
            explorar: 'Discover',
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

var app = new Vue({
    el: '#app',
    i18n,
    data: function () {
        return {
            message: 'Kevin',
            stringSearch: '',
            logged: false,
            modal: false,
            error: false,
            hospedajes: [],
            currentHosp: {},
            lang: localStorage.getItem('lang') || 'es'
        };
    },
    created() {
        const params = window.location.search;
        const urlParams = new URLSearchParams(params);

        if (localStorage.getItem("user_token")) {
            this.logged = true;
        }

        let langs = document.getElementsByName("languages");
        for (let i = 0; i < langs.length; i++) {
            if (langs[i].value == this.lang) {
                langs[i].setAttribute("checked", "");
            }
        }

        if (urlParams.has('q')) {
            let query = urlParams.get('q');
            this.stringSearch = query
        }

        this.search();
    },
    methods: {
        search: function () {
            const titleSearch = document.getElementById("search-result-title");
            titleSearch.textContent = this.stringSearch;

            const params = {
                query: this.stringSearch.toLowerCase()
            };

            axios
                .get("https://localhost:44389/api/hospedaje/search", { params })
                .then((res) => {
                    if (res.data == 'value' || res.data == 0) {
                        this.error = true;
                        this.hospedajes = [];
                    } else {
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
            let url = "https://localhost:44389/api/hospedaje/" + id;
            let result = await axios.get(url, {
                headers: {'Authorization': 'Bearer '+ localStorage.getItem('user_token')}
            });
            this.currentHosp = result.data;
            $('#modalID').modal('show')
            this.modal = true;
        },
        cerrarSesion: function () {
            localStorage.clear();
            location.href = "./login.html";
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
})