<script setup>
import { addDoc, collection } from "firebase/firestore";
import { db, refreshMovies } from "../../fireBaseConfig";
import { useRouter } from "vue-router";

const router = useRouter();

const addMovie = () => {
  const title = document.getElementById("title").value;
  const genre = document.getElementById("genre").value;
  const year = document.getElementById("year").value || null;
  const poster = document.getElementById("poster").files[0] || null;

  const newMovie = {
    title,
    genre,
    year,
    poster,
  };

  addDoc(collection(db, "movies"), newMovie);
  refreshMovies();
};

const submitForm = (e) => {
  e.preventDefault();
  addMovie();
  router.push("/");
};
</script>

<template>
  <div class="container" style="margin-top: 1rem">
    <h3>Add Movie</h3>
    <form>
      <div class="form-group">
        <label for="title" lass="form-label">Title</label>
        <input type="text" id="title" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="genre" class="form-label">Genre</label>
        <select class="form-select" id="genre" required>
          <option value="action">Action</option>
          <option value="comedy">Comedy</option>
          <option value="drama">Drama</option>
          <option value="horror">Horror</option>
          <option value="sci-fi">Sci-Fi</option>
        </select>
      </div>
      <div class="form-group">
        <label for="year" lass="form-label">Year</label>
        <input type="number" id="year" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="poster" class="form-label">Upload Poster</label>
        <input type="file" class="form-control" id="poster" />
      </div>
      <div class="mb-3" style="display: flex; gap: 1rem; margin-top: 1rem">
        <button type="submit" class="btn btn-primary" @click="submitForm">
          Add Movie
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
