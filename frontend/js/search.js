var app = new Vue({
    el: '#app',
    data: function () {
        return {
            message: 'Kevin',
            stringSearch: '',
            logged: false,
            hospedajes: []
        };
    },
    created() {
        const params = window.location.search;
        const urlParams = new URLSearchParams(params);

        if (localStorage.getItem("user_token")) {
            this.logged = true;
        }

        if(urlParams.has('q')) {
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
                .get("https://localhost:49155/api/hospedaje/search", { params })
                .then((res) => {
                    this.hospedajes = res.data;
                    console.log(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        cerrarSesion: function(){
            localStorage.clear();
            location.href ="./login.html";
        }
    }
})