    var app = new Vue({
    el: '#app',
    data: function() {
        return {
            message: 'Kevin',
            stringSearch: 'facatativa',
            hospedajes: []
        };
    },
    created() {
        this.search();
    },
    methods: {
        search: function() {
            const titleSearch = document.getElementById("search-result-title");
            titleSearch.textContent = this.stringSearch;

            const params = {
                query: this.stringSearch.toLowerCase()
            };

            axios
                .get("https://localhost:44389/api/hospedaje/search", { params })
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