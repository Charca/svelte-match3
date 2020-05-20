<script>
  import { createEventDispatcher } from "svelte";
  import { fly, scale } from "svelte/transition";
  export let type;
  export let index;
  export let size;
  export let special;
  export let selected = false;
  const dispatch = createEventDispatcher();
  const dragGhost = new Image(0, 0);
  dragGhost.src =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

  let SWIPE_THRESHOLD = size - 10;
  let NEW_ANIMATION_TIMEOUT = 1200;
  let isSwiping = false;
  let xDown;
  let yDown;
  let xDiff;
  let yDiff;
  let isNew = false;

  $: {
    isNew = special !== false;
    setTimeout(() => (isNew = false), NEW_ANIMATION_TIMEOUT);
  }

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
    background-image: url(/assets/tilesheet.webp);
    background-size: calc(var(--tile-size) * 5);
    cursor: pointer;
    position: absolute;
    top: 0;
    bottom: 0;
  }

  .tile-1 {
    background-position-y: 0;
  }

  .tile-2 {
    background-position-y: calc(var(--tile-size) * -1);
  }

  .tile-3 {
    background-position-y: calc(var(--tile-size) * -2);
  }

  .tile-4 {
    background-position-y: calc(var(--tile-size) * -3);
  }

  .tile-5 {
    background-position-y: calc(var(--tile-size) * -4);
  }

  .tile.special-x {
    background-position-x: calc(var(--tile-size) * -2);
  }

  .tile.special-y {
    background-position-x: calc(var(--tile-size) * -3);
  }

  .tile.special-color-candy {
    background-position-x: 0;
    background-position-y: calc(var(--tile-size) * -6);
  }

  .is-selected {
    background-position-x: calc(var(--tile-size) * -1);
  }

  .is-new {
    animation: grow 0.2s;
  }

  .new-pulse-animation {
    content: "";
    width: 10px;
    height: 10px;
    position: absolute;
    left: calc(50% - 5px);
    top: calc(50% - 5px);
    border-radius: 100%;
    background: rgba(255, 255, 255, 1);
    animation: pulse-white 1.2s;
  }

  @keyframes grow {
    0% {
      transform: scale(0);
    }

    100% {
      transform: scale(1);
    }
  }

  @keyframes pulse-white {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
    }

    70% {
      transform: scale(1);
      box-shadow: 0 0 0 60px rgba(255, 255, 255, 0);
    }

    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
    }
  }
</style>

{#if isNew}
  <div class="new-pulse-animation" />
{/if}
<div
  style="--tile-size: {size}px"
  class="tile tile-{type} special-{special}"
  class:is-selected={selected || isSwiping}
  class:is-new={isNew}
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
