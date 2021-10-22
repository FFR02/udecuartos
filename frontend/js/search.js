var app = new Vue({
    el: '#app',
    data: function () {
        return {
            message: 'Kevin',
            stringSearch: '',
            hospedajes: []
        };
    },
    created() {
        const params = window.location.search;
        const urlParams = new URLSearchParams(params);

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
                .get("https://localhost:49153/api/hospedaje/search", { params })
                .then((res) => {
                    this.hospedajes = res.data;
                    console.log(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
})