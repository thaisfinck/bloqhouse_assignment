<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <RouterLink to="/" class="navbar-brand">
          <h1 class="h3">Movie Catalog</h1>
          <span class="text-muted">bloqhouse</span>
        </RouterLink>

        <div v-if="$route.path !== '/'">
          <RouterLink to="/" class="btn btn-secondary">
            <i class="fa-solid fa-arrow-left" style="margin-right: 0.5rem"></i>
            Back to List
          </RouterLink>
        </div>
      </div>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>
