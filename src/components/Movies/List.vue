<script setup lang="ts">
import { RouterLink } from "vue-router";

import ConfirmDeleteModal from "../Modals/ConfirmDeleteModal.vue";

import { ref } from "vue";

const open = ref(false);

const movies = ref([
  {
    id: 1,
    title: "The Shawshank Redemption",
    genre: "Drama",
    year: 1994,
  },
  {
    id: 2,
    title: "The Godfather",
    genre: "Crime",
    year: 1972,
  },
  {
    id: 3,
    title: "The Dark Knight",
    genre: "Action",
    year: 2008,
  },
]);
</script>

<template>
  <div class="container">
    <div class="d-flex justify-content-between" style="margin-top: 1rem">
      <h3>Movies</h3>
      <RouterLink to="/add" class="btn btn-primary">
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
                    <RouterLink
                      :to="{ name: 'Edit', params: { id: movie.id } }"
                      class="btn btn-sm btn-primary"
                    >
                      <i class="fa-solid fa-pencil"></i>
                    </RouterLink>
                    <button
                      type="button"
                      class="btn btn-sm btn-danger"
                      @click="open = true"
                    >
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ConfirmDeleteModal v-model:visible="open" />
</template>
