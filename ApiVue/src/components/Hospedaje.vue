<template>
  <div
    class="column is-12-mobile is-4-desktop is-4-tablet"
  >
    <div class="card has-equal-height">
      <div class="card-header">
        <img v-bind:src="hospedaje.imagen" v-bind:alt="hospedaje.titulo" />
      </div>
      <div class="card-content">
        <h4 class="title is-size-4">{{ hospedaje.titulo }}</h4>
        <h5 class="title is-size-5">${{ hospedaje.precio }}</h5>
        <h6 class="title is-size-6">{{ hospedaje.ubicacion }}</h6>
        <div class="has-text-centered">
          <button class="button is-success is-rounded" @click="verMas(hospedaje.id)">Ver mas</button>
        </div>

        
      </div>
    </div>
  </div>
</template>

<script>
export default{
    props: ['hospedaje'],
    methods: {
      verMas(id){
        this.$emit("verModal", id)
      }
    }
};
</script>
