<script>
  import { createEventDispatcher } from "svelte";
  import { fly, scale } from "svelte/transition";
  export let type;
  export let index;
  export let size;
  export let selected = false;
  const dispatch = createEventDispatcher();
  const dragGhost = new Image(0, 0);
  dragGhost.src =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

  let SWIPE_THRESHOLD = size - 10;
  let isSwiping = false;
  let xDown;
  let yDown;
  let xDiff;
  let yDiff;

  function handleTouchStart(event) {
    isSwiping = true;
    xDown = event.touches ? event.touches[0].clientX : event.clientX;
    yDown = event.touches ? event.touches[0].clientY : event.clientY;
    xDiff = 0;
    yDiff = 0;
  }

  function handleTouchMove(event) {
    if (!isSwiping) return;
    const xUp = event.touches ? event.touches[0].clientX : event.clientX;
    const yUp = event.touches ? event.touches[0].clientY : event.clientY;
    let direction;

    xDiff = xDown - xUp;
    yDiff = yDown - yUp;

    if (xDiff < -SWIPE_THRESHOLD) {
      direction = "right";
    } else if (xDiff > SWIPE_THRESHOLD) {
      direction = "left";
    } else if (yDiff < -SWIPE_THRESHOLD) {
      direction = "down";
    } else if (yDiff > SWIPE_THRESHOLD) {
      direction = "up";
    }

    if (direction) {
      dispatch("swipe", {
        direction,
        index
      });

      isSwiping = false;
    }
  }

  function handleTouchEnd() {
    isSwiping = false;
  }

  function handleDragStart(event) {
    event.dataTransfer.setDragImage(dragGhost, 0, 0);
    handleTouchStart(event);
  }

  function handleDrag(event) {
    handleTouchMove(event);
  }

  function handleDragEnd() {
    handleTouchEnd();
  }
</script>

<style>
  .tile {
    width: var(--tile-size);
    height: var(--tile-size);
    background-size: var(--tile-size);
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
  style="--tile-size: {size}px"
  class="tile tile-{type}"
  class:is-selected={selected || isSwiping}
  out:scale={{ duration: 200 }}
  in:fly={{ duration: 250, delay: 100, y: -100, opacity: 0 }}
  on:touchstart={handleTouchStart}
  on:touchmove={handleTouchMove}
  on:touchend={handleTouchEnd}
  on:dragstart={handleDragStart}
  on:dragend={handleDragEnd}
  on:drag={handleDrag}
  draggable={true}
  on:click>
  <slot />
</div>
