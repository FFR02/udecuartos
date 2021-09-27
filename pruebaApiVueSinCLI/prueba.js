const app = new Vue({
    el: "#app",
    data: function () {
        return {
            hospedajes: [],
        };
    },
    created() {
        this.fetch();
    },
    methods: {
        fetch() {
            let result = axios
                .get("https://localhost:44389/api/hospedaje")
                //let result = axios.get("https://rickandmortyapi.com/api/character")
                .then((res) => {
                    //api hospedajes
                    this.hospedajes = res.data;
                    //api rick and morty
                    //this.characters = res.data.results;
                    console.log(res.data);
                })
                .catch((err) => {
                    console.log(result);
                    console.log(err);
                });
        },
    }
});