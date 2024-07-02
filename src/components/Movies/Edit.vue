<script setup>
import { ref } from "vue";
import { querySnapshot } from "../../fireBaseConfig";
import { useRoute, useRouter } from "vue-router";
import { updateDoc, doc } from "firebase/firestore";
import { refreshMovies, db } from "../../fireBaseConfig";

const route = useRoute();

const router = useRouter();

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

const formatedYear = ref(movie.year) ?? "";

const fomatedPoster = ref(movie.poster) ?? "No Poster";

const updateMovie = () => {
  const title = document.getElementById("title").value;
  const genre = document.getElementById("genre").value;
  const year = document.getElementById("year").value ?? null;
  const poster = document.getElementById("poster").files
    ? document.getElementById("poster").files[0]
    : null;

  const updatedMovie = {
    title,
    genre,
    year,
    poster,
  };

  updateDoc(doc(db, "movies", id), updatedMovie);
  refreshMovies();
};

const submitForm = (e) => {
  e.preventDefault();
  updateMovie();
  router.push("/movies/" + id);
};
</script>

<template>
  <div class="container" style="margin-top: 1rem">
    <h3>Edit Movie</h3>
    <form>
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="movie.title"
          required
        />
      </div>
      <div class="mb-3">
        <label for="genre" class="form-label">Genre</label>
        <input
          type="text"
          class="form-control"
          id="genre"
          v-model="movie.genre"
          required
        />
      </div>
      <div class="mb-3">
        <label for="year" class="form-label">Year</label>
        <input
          type="number"
          class="form-control"
          id="year"
          v-model="formatedYear"
        />
      </div>
      <div class="mb-3">
        <label for="poster" class="form-label">Poster</label>
        <input
          type="text"
          class="form-control"
          id="poster"
          v-model="fomatedPoster"
        />
      </div>
      <div class="mb-3" v-if="movie.poster">
        <img :src="movie.poster" alt="poster" style="width: 100px" />
      </div>
      <div class="mb-3" v-else>
        <label for="poster" class="form-label">Upload Poster</label>
        <input type="file" class="form-control" id="poster" />
      </div>

      <div class="mb-3" style="display: flex; gap: 1rem; margin-top: 1rem">
        <button type="submit" class="btn btn-primary" @click="submitForm">
          Update Movie
        </button>

        <button
          type="button"
          class="btn btn-secondary"
          @click="router.push('/')"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>
