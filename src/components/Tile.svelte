<script>
  import { fly, scale } from "svelte/transition";
  export let type;
  export let selected = false;
</script>

<style>
  .tile {
    width: 60px;
    height: 60px;
    background-size: 60px;
    cursor: pointer;
  }

  .tile-1 {
    background-image: url(/assets/tiles/red.png);
  }

  .tile-1.is-selected {
    background-image: url(/assets/tiles/red-active.png);
  }

  .tile-2 {
    background-image: url(/assets/tiles/orange.png);
  }

  .tile-2.is-selected {
    background-image: url(/assets/tiles/orange-active.png);
  }

  .tile-3 {
    background-image: url(/assets/tiles/green.png);
  }

  .tile-3.is-selected {
    background-image: url(/assets/tiles/green-active.png);
  }

  .tile-4 {
    background-image: url(/assets/tiles/purple.png);
  }

  .tile-4.is-selected {
    background-image: url(/assets/tiles/purple-active.png);
  }

  .tile-5 {
    background-image: url(/assets/tiles/blue.png);
  }

  .tile-5.is-selected {
    background-image: url(/assets/tiles/blue-active.png);
  }

  /* .is-selected {
    box-shadow: 0 0 1px 3px lightblue;
  } */
</style>

<div
  class="tile tile-{type}"
  class:is-selected={selected}
  on:click
  out:scale={{ duration: 200 }}
  in:fly={{ duration: 250, delay: 100, y: -100, opacity: 0 }}>
  <slot />
</div>
