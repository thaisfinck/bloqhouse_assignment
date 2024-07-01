<template>
  <div class="container" style="margin-top: 1rem">
    <h3>Add Movie</h3>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" id="title" class="form-control" />
      </div>
      <div class="form-group">
        <label>Genre</label>
        <select class="form-select">
          <option value="action">Action</option>
          <option value="comedy">Comedy</option>
          <option value="drama">Drama</option>
          <option value="horror">Horror</option>
          <option value="sci-fi">Sci-Fi</option>
        </select>
      </div>
      <div class="form-group">
        <label for="year">Year</label>
        <input type="number" id="year" class="form-control" />
      </div>
      <div class="form-group">
        <label for="poster">Poster</label>
        <input type="text" id="poster" class="form-control" />
      </div>
      <button type="submit" class="btn btn-primary" style="margin-top: 1rem">
        Add Movie
      </button>
    </form>
  </div>
</template>
