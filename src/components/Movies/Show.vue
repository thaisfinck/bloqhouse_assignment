<script setup lang="ts">
import { useRoute } from "vue-router";
import { querySnapshot } from "../../fireBaseConfig";

const route = useRoute();

const id = route.params.id;

const movie = querySnapshot.docs
  .map((doc) => {
    return {
      id: doc.id,
      title: doc.data().title,
      genre: doc.data().genre,
      year: doc.data().year,
      poster: doc.data().poster,
    };
  })
  .find((movie) => movie.id === id);
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
        <RouterLink to="/" class="btn btn-secondary">
          <i class="fa-solid fa-arrow-left"></i>
          Back to Movies
        </RouterLink>
        <RouterLink :to="'/edit/' + movie.id" class="btn btn-warning">
          <i class="fa-solid fa-edit"></i>
          Edit
        </RouterLink>
      </div>
    </div>
  </div>
</template>
