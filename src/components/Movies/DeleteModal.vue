<script lang="ts">
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../fireBaseConfig";

export default {
  props: ["movieTitle", "idToBeDeleted"],
  data() {
    return {
      open: true,
    };
  },
  methods: {
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
            Are you sure you want to delete {{ movieTitle }}?
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
