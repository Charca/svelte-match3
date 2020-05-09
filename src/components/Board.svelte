<script>
  import { flip } from "svelte/animate";
  import { quintOut } from "svelte/easing";
  import Tile from "./Tile.svelte";
  import game from "../store/game.store";
  import { areTilesAdjacent, getMatches } from "../store/game.utils";

  $: board = $game.board;
  $: rows = $game.rows;
  $: columns = $game.columns;
  $: selectedTile = null;
  $: isTileSelected = i => selectedTile === i;
  $: getCellStyle = i => {
    const row = Math.floor(i / columns);
    const col = i % columns;

    return `
      top: ${60 * row}px;
      left: ${60 * col}px;
    `;
  };

  function handleTileClick(i) {
    if (isTileSelected(i)) {
      return (selectedTile = null);
    }

    if (selectedTile === null) {
      return (selectedTile = i);
    }

    if (!areTilesAdjacent(selectedTile, i, columns)) {
      return (selectedTile = null);
    }

    game.swapTiles(selectedTile, i);
    setTimeout(() => {
      const matches = getMatches(board, rows, columns);
      if (matches.length === 0) {
        game.swapTiles(selectedTile, i);
      } else {
        game.resolveBoard();
      }

      selectedTile = null;
    }, 250 - 50);
  }

  $: console.log($game);
</script>

<style>
  .board {
    position: relative;
    width: calc(60px * var(--board-x));
    height: calc(60px * var(--board-y));
    margin: 0 auto;
  }

  .cell {
    position: absolute;
    width: 60px;
    height: 60px;
  }
</style>

<div class="board" style="--board-x: {$game.columns}; --board-y: {$game.rows};">
  {#each board as cell, i (cell.id)}
    <span
      class="cell"
      animate:flip={{ delay: 0, duration: 250, easing: quintOut }}
      style={getCellStyle(i)}>
      {#if cell.type !== null}
        <Tile
          type={cell.type}
          on:click={() => handleTileClick(i)}
          selected={isTileSelected(i)}>
          <!-- {i} -->
        </Tile>
      {/if}
    </span>
  {/each}
</div>
