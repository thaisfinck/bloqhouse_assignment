<script setup lang="ts">
import { RouterLink } from "vue-router";
import { ref } from "vue";
import { db, refreshMovies } from "../../fireBaseConfig";
import { deleteDoc, doc } from "firebase/firestore";

const open = ref(false);

const movies = refreshMovies();

const idToBeDeleted = ref("");

const openModal = (id: any) => {
  idToBeDeleted.value = id;
  open.value = true;
};

const deleteMovie = async (id: any) => {
  try {
    await deleteDoc(doc(db, "movies", id));
    refreshMovies();
    open.value = false;
  } catch (error) {
    console.error("Error removing document: ", error);
    open.value = false;
  }
};
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
                      @click="openModal(movie.id)"
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
            Are you sure you want to delete this movie?
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
