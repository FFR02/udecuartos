const i18n = new VueI18n({
    locale: localStorage.getItem("lang") || 'es',
    messages: {
        es: {
            inicio: "Inicio",
            ayuda: "Ayuda",
            acercaDe: "Acerca de",
            vuelveteArrendador: "¡Vuelvete arrendador!",
            iniciarSesion: "Iniciar sesion",
            registrarse: "Registrarse",
            error: 'Aun no tienes nada, publica tu habitacion para verla',
            registraHabitacion: 'Registra tu habitacion',
            verMas: 'Ver más',
            eliminar: 'Eliminar',
            titulo: 'Titulo',
            tipoVivienda: 'Tipo de vivienda',
            direccion: 'Dirección',
            ubicacion: 'Ubicación',
            precio: 'Precio',
            foto: 'Foto',
            seleccionaIdioma: "Selecciona un idioma",
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
            error: "You still don't have anything, publish your room to see it",
            registraHabitacion: 'Register your room',
            verMas: 'See more',
            eliminar: 'Remove',
            titulo: 'Title',
            tipoVivienda: 'Housing type',
            direccion: 'Address',
            ubicacion: 'Location',
            precio: 'Price',
            foto: 'Photo',
            seleccionaIdioma: "Choose a language",
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
            error: 'Você ainda não tem nada, publique sua sala para ver',
            registraHabitacion: 'Cadastre seu quarto',
            verMas: 'Ver mais',
            eliminar: 'Retirar',
            titulo: 'Titulo',
            tipoVivienda: 'Tipo de habitação',
            direccion: 'Endereço',
            ubicacion: 'Localização',
            precio: 'Preço',
            foto: 'Foto',
            seleccionaIdioma: "Escolha um idioma",
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
            nombre: '',
            error: false,
            logged: false,
            lang: localStorage.getItem("lang") || "es",
        };
    },
    created() {
        if (localStorage.getItem('user_token')) {
            this.fetch();
            this.logged = true;
        } else {
            location.href = "./login.html";
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
            this.nombre = localStorage.getItem('user_id');
            let result = axios
                .get("https://localhost:44389/api/mishospedajes/" + localStorage.getItem('user_id'), {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('user_token') }
                })
                .then((res) => {
                    //api hospedajes
                    if (res.data == 'value' || res.data == 0) {
                        this.error = true;
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
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('user_token') }
            });
            this.currentHosp = result.data;
            $('#modalID').modal('show')
            this.modal = true;;
        },
        eliminar(id) {
            axios({
                method: 'delete',
                url: 'https://localhost:44389/api/hospedaje/' + id,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('user_token') }
            }).then(
                (res) => {
                    console.log(res.data);
                    location.href = "./mishospedajes.html";
                }
            ).catch((err => console.log(err)))
        },
        modalView() {
            $('#modalR').modal('show')
            this.modal = true;
        },
        cerrarSesion() {
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
});