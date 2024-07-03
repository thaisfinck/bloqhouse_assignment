<script lang="ts">
import { RouterLink } from "vue-router";
import { db, moviesRef } from "../../fireBaseConfig";
import { deleteDoc, doc } from "firebase/firestore";

export default {
  data() {
    return {
      open: false,
      movies: [] as any[],
      idToBeDeleted: "",
    };
  },
  firestore: {
    movies: moviesRef,
  },
  methods: {
    openModal(id: any) {
      this.idToBeDeleted = id;
      this.open = true;
    },
    getMovieTitle(id: any) {
      return this.movies.find((movie: any) => movie.id === id)?.title;
    },
    async deleteMovie(id: any) {
      try {
        await deleteDoc(doc(db, "movies", id));

        this.open = false;
      } catch (error) {
        console.error("Error removing document: ", error);
        this.open = false;
      }
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="d-flex justify-content-between" style="margin-top: 1rem">
      <h3>Movies</h3>
      <RouterLink to="/add" class="btn btn-primary" style="border-radius: 20px">
        <i class="fa-solid fa-plus" style="margin-right: 0.5rem"></i>
        Add Movie
      </RouterLink>
    </div>

    <div class="row" style="margin-top: 1rem">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Genre</th>
                  <th>Year</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="movie in movies" :key="movie.id">
                  <td>{{ movie.title }}</td>
                  <td>{{ movie.genre }}</td>
                  <td>{{ movie.year }}</td>

                  <td>
                    <div class="btn-group" style="gap: 0.5rem">
                      <RouterLink
                        :to="{ name: 'Show', params: { id: movie.id } }"
                        class="btn btn-sm btn-secondary"
                        style="border-radius: 10px"
                      >
                        <i class="fa-solid fa-eye"></i>
                      </RouterLink>
                      <RouterLink
                        :to="{ name: 'Edit', params: { id: movie.id } }"
                        class="btn btn-sm btn-primary"
                        style="border-radius: 10px"
                      >
                        <i class="fa-solid fa-pencil"></i>
                      </RouterLink>
                      <button
                        type="button"
                        class="btn btn-sm btn-danger"
                        @click="openModal(movie.id)"
                        style="border-radius: 10px"
                      >
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Confirm Deleting Movie Modal -->
  <div v-if="open">
    <div class="modal show" style="display: block">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirm Delete</h5>
            <button
              type="button"
              class="btn-close"
              @click="open = false"
            ></button>
          </div>
          <div class="modal-body">
            Are you sure you want to delete {{ getMovieTitle(idToBeDeleted) }}?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="open = false"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteMovie(idToBeDeleted)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
