<script lang="ts">
import { RouterLink } from "vue-router";
import { db, moviesRef } from "../../fireBaseConfig";
import { deleteDoc, doc } from "firebase/firestore";
import DeleteModal from "./DeleteModal.vue";

interface Movie {
  id: string;
  title: string;
  genre: string;
  year: number;
}

export default {
  components: {
    RouterLink,
    DeleteModal,
  },
  data() {
    return {
      open: false,
      movies: [] as Movie[],
      idToBeDeleted: "",
      currentPage: 1,
    };
  },
  firestore: {
    movies: moviesRef,
  },
  computed: {
    sortedMovies() {
      return this.movies.sort((a, b) => a.title.localeCompare(b.title));
    },
  },
  methods: {
    pagination(array: Movie[], page_size: number, page_number: number) {
      return array.slice(
        (page_number - 1) * page_size,
        page_number * page_size
      );
    },
    openModal(id: string) {
      this.idToBeDeleted = id;
      this.open = true;
    },
    getMovieTitle(id: string) {
      return this.movies.find((movie: Movie) => movie.id === id)?.title;
    },
    async deleteMovie(id: string) {
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
            <ul class="pagination" v-if="movies.length > 10">
              <li
                class="page-item"
                v-for="page in Math.ceil(movies.length / 10)"
                :key="page"
              >
                <button class="page-link" @click="currentPage = page">
                  {{ page }}
                </button>
              </li>
            </ul>
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
                <tr
                  v-for="movie in pagination(sortedMovies, 10, currentPage)"
                  :key="movie.id"
                >
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
  <DeleteModal
    v-if="open"
    :idToBeDeleted="idToBeDeleted"
    :movieTitle="getMovieTitle(idToBeDeleted)"
  />
</template>
