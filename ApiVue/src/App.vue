<template>
  <div id="app">
    <div class="hero is-white is-gradient is-bold">
      <div class="hero-body">
        <h1 class="title">
          <span class="has-text-success">UdeCuartos</span>
          <span class="subtitle">Hospedajes</span>
          <div class="field has-addons is-pulled-right">
            <div class="control">
              <input type="text" class="input is-rounded" />
            </div>
            <div class="control">
              <button class="button is-success is-rounded" v-on:click="fetch">
                Buscar
              </button>
            </div>
          </div>
        </h1>
      </div>
    </div>
    <div class="container">
      <div
        class="columns is-desktop is-mobile is-tablet is-multiline is-centered"
      >
        <hospedaje
          @verModal="verModal"
          v-for="hospedaje of hospedajes"
          v-bind:key="hospedaje.id"
          v-bind:hospedaje="hospedaje"
        />
      </div>
    </div>
    <div class="modal" :class="{ 'is-active': modal }" v-if="modal">
      <div class="modal-background" @click="modal = false"></div>
      <div class="modal-card" >
        <header class="modal-card-head">
          <p class="modal-card-title">{{ currentHosp.tipo }} en {{currentHosp.ubicacion}}</p>
          <button class="delete" @click="modal = false"></button>
        </header>
        <div class="modal-card-body">
          <section>
            <div class="container">
              <div class="columns">
                <div class="column">
                  <img v-bind:src="currentHosp.imagen" alt="" />
                </div>
                <div class="column">
                  <div class="card">
                    <div class="card-content">
                      <h1 class="title is-1">{{ currentHosp.titulo }}</h1>
                      <div class="content">
                        <h3 class="title is-3">${{ currentHosp.precio }}</h3>
                        <h4 class="title is-4">{{ currentHosp.tipo }}</h4>
                        <h5 class="title is-5">{{ currentHosp.ubicacion }}</h5>
                        <h5 class="title is-5">{{ currentHosp.direccion }}</h5>
                        <div class="has-text-centered">
                          <button class="button is-success is-rounded is-medium">
                            Comprar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Hospedaje from "./components/Hospedaje.vue";

export default {
  name: "App",
  components: {
    Hospedaje,
  },
  data: function () {
    return {
      hospedajes: [],
      modal: false,
      currentHosp: {}
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
    verModal(id) {
      this.fetchOne(id);
    },
    async fetchOne(id) {
      let url = "https://localhost:44389/api/hospedaje/" + id;
      let result = await axios.get(url);
      this.currentHosp = result.data;
      this.modal = true;
    },
  },
};
</script>

<style>

@import "~bulma/css/bulma.css";
</style>
