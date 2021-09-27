<template>
  <div
    class="column is-12-mobile is-4-desktop is-4-tablet"
  >
    <div class="card">
      <div class="card-header">
        <img v-bind:src="hospedaje.imagen" v-bind:alt="hospedaje.titulo" />
      </div>
      <div class="card-content">
        <h3 class="title is-size-4">{{ hospedaje.titulo }}</h3>
        <h4 class="title is-size-5">${{ hospedaje.precio }}</h4>
        <h5 class="title is-size-6">{{ hospedaje.ubicacion }}</h5>
        <button class="button is-success is-rounded is-small">Ver mas</button>
      </div>
    </div>
  </div>
</template>

<script>
export default{
    props: ['hospedaje']
};
</script>
