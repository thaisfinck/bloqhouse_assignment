<script lang="ts">
import { useRoute } from "vue-router";
import { doc } from "firebase/firestore";
import { moviesRef } from "../../fireBaseConfig";
import { useDocument } from "vuefire";

export default {
  props: {
    id: {
      type: String,
    },
  },
  setup() {
    return {
      id: useRoute().params.id,
    };
  },
  data() {
    return {
      movie: useDocument(doc(moviesRef, this.id)),
    };
  },
};
</script>

<template>
  <div class="container" style="margin-top: 1rem" v-if="movie">
    <h3>{{ movie.title }}</h3>
    <div class="row">
      <div class="col-md-4" v-if="movie.poster">
        <img
          :src="movie.poster"
          alt="movie poster"
          style="width: 100%; height: auto"
        />
      </div>
      <div class="col-md-8">
        <p><strong>Genre:</strong> {{ movie.genre }}</p>
        <p><strong>Year:</strong> {{ movie.year }}</p>
      </div>

      <div class="col-12" style="margin-top: 1rem; display: flex; gap: 1rem">
        <RouterLink :to="'/edit/' + movie.id" class="btn btn-primary">
          <i class="fa-solid fa-edit"></i>
          Edit
        </RouterLink>
      </div>
    </div>
  </div>
</template>
