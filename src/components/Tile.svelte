<script>
  import { fly, scale } from "svelte/transition";
  export let type;
  export let selected = false;
</script>

<style>
  .tile {
    width: 50px;
    height: 50px;
    border-radius: 4px;
    cursor: pointer;
  }

  .tile-1 {
    background: red;
  }

  .tile-2 {
    background: gold;
  }

  .tile-3 {
    background: green;
  }

  .tile-4 {
    background: blueviolet;
  }

  .tile-5 {
    background: blue;
  }

  .is-selected {
    box-shadow: 0 0 1px 3px lightblue;
  }
</style>

<div
  class="tile tile-{type}"
  class:is-selected={selected}
  on:click
  out:scale={{ duration: 200 }}
  in:fly={{ duration: 250, delay: 100, y: -100, opacity: 0 }}>
  <slot />
</div>
