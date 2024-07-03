<script lang="ts">
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../fireBaseConfig";
import router from "../../router";

export default {
  methods: {
    cancel() {
      router.push("/");
    },

    async addMovie() {
      const titleElement = document.getElementById("title") as HTMLInputElement;
      const genreElement = document.getElementById(
        "genre"
      ) as HTMLSelectElement;
      const yearElement = document.getElementById("year") as HTMLInputElement;
      const posterElement = document.getElementById(
        "poster"
      ) as HTMLInputElement;

      const title = titleElement?.value;
      const genre = genreElement?.value;
      const year = yearElement?.value ?? null;
      const poster = posterElement?.files?.[0] ? posterElement.files[0] : null;

      const newMovie = {
        title,
        genre,
        year,
        poster,
      };

      await addDoc(collection(db, "movies"), newMovie);
    },

    submitForm(e: { preventDefault: () => void }) {
      e.preventDefault();
      this.addMovie();
      this.cancel();
    },
  },
};
</script>

<template>
  <div class="container" style="margin-top: 1rem">
    <h3>Add Movie</h3>
    <form>
      <div class="form-group mb-3">
        <label for="title" lass="form-label">Title</label>
        <input type="text" id="title" class="form-control" required />
      </div>
      <div class="form-group mb-3">
        <label for="genre" class="form-label">Genre</label>
        <select class="form-select" id="genre" required>
          <option value="action">Action</option>
          <option value="comedy">Comedy</option>
          <option value="drama">Drama</option>
          <option value="horror">Horror</option>
          <option value="sci-fi">Sci-Fi</option>
        </select>
      </div>
      <div class="form-group mb-3">
        <label for="year" lass="form-label">Year</label>
        <input type="number" id="year" class="form-control" />
      </div>
      <div class="form-group mb-3">
        <label for="poster" class="form-label">Upload Poster</label>
        <input type="file" class="form-control" id="poster" />
      </div>
      <div
        class="form-group mb-3"
        style="display: flex; gap: 1rem; margin-top: 1rem"
      >
        <button type="submit" class="btn btn-primary" @click="submitForm">
          Add Movie
        </button>
        <button type="button" class="btn btn-secondary" @click="cancel">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>
