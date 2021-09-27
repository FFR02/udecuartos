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
              <button class="button is-success is-rounded" v-on:click="fetch">Buscar</button>
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
          v-for="hospedaje of hospedajes"
          v-bind:key="hospedaje.id"
          v-bind:hospedaje="hospedaje"
        />
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
  },
};
</script>

<style>
@import "~bulma/css/bulma.css";
</style>
