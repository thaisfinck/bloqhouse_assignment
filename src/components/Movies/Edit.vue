<script lang="ts">
import { moviesRef } from "../../fireBaseConfig";
import { useRoute } from "vue-router";
import { updateDoc, doc } from "firebase/firestore";
import router from "../../router";
import { useDocument } from "vuefire";

export default {
  data() {
    return {
      id: useRoute().params.id.toString(),
      movie: useDocument(doc(moviesRef, useRoute().params.id.toString())),
    };
  },

  methods: {
    cancel() {
      router.push("/");
    },
    async updateMovie(submitEvent: any) {
      const title = submitEvent.target.elements.title.value;
      const genre = submitEvent.target.elements.genre.value;
      const year = submitEvent.target.elements.year.value;
      const poster = submitEvent.target.elements.poster.files[0]
        ? submitEvent.target.elements.poster.files[0].name
        : null;

      const updatedMovie = {
        title,
        genre,
        year,
        poster,
      };

      try {
        await updateDoc(doc(moviesRef, this.id), updatedMovie);
      } catch (error) {
        console.error("Failed to update the movie:", error);
      }
    },

    submitForm(e: { preventDefault: () => void }) {
      e.preventDefault();
      this.updateMovie(e);
      router.push("/movies/" + this.id);
    },
  },
};
</script>

<template>
  <div class="container" style="margin-top: 1rem" v-if="movie">
    <h3>Edit Movie</h3>
    <form @submit="submitForm">
      <div class="form-group mb-3">
        <label for="title" class="form-label">Title</label>
        <input
          name="title"
          type="text"
          class="form-control"
          id="title"
          v-model="movie.title"
          required
        />
      </div>
      <div class="form-group mb-3">
        <label for="genre" class="form-label">Genre</label>
        <select
          name="genre"
          class="form-select"
          id="genre"
          v-model="movie.genre"
          required
        >
          <option value="action">Action</option>
          <option value="comedy">Comedy</option>
          <option value="drama">Drama</option>
          <option value="horror">Horror</option>
          <option value="sci-fi">Sci-Fi</option>
        </select>
      </div>
      <div class="form-group mb-3">
        <label for="year" class="form-label">Year</label>
        <input
          name="year"
          type="number"
          class="form-control"
          id="year"
          v-model="movie.year"
        />
      </div>
      <div class="form-group mb-3" v-if="movie.poster">
        <img :src="movie.poster" alt="poster" style="width: 100px" />
      </div>
      <div class="form-group mb-3" v-else>
        <label for="poster" class="form-label">Upload Poster</label>
        <input name="poster" type="file" class="form-control" id="poster" />
      </div>

      <div
        class="form-group mb-3"
        style="display: flex; gap: 1rem; margin-top: 1rem"
      >
        <button type="submit" class="btn btn-primary" @submit="submitForm">
          Update Movie
        </button>

        <button type="button" class="btn btn-secondary" @click="cancel">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>
