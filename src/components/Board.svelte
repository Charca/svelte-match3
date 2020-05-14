<script>
  import { createEventDispatcher } from "svelte";
  import { flip } from "svelte/animate";
  import { quintOut } from "svelte/easing";
  import Tile from "./Tile.svelte";
  import game from "../store/game.store";
  import { areTilesAdjacent, getMatches } from "../store/game.utils";

  const TILE_SIZE = 60;
  const BOARD_PADDING = 10;
  const dispatch = createEventDispatcher();

  $: board = $game.board;
  $: rows = $game.rows;
  $: columns = $game.columns;
  $: cells = [...Array(board.length).keys()];
  $: selectedTile = null;
  $: isTileSelected = i => selectedTile === i;
  $: getCellStyle = i => {
    const row = Math.floor(i / columns);
    const col = i % columns;

    return `
      top: ${TILE_SIZE * row + BOARD_PADDING}px;
      left: ${TILE_SIZE * col + BOARD_PADDING}px;
    `;
  };
  $: boardStyle = `
    width: ${TILE_SIZE * columns + BOARD_PADDING * 2}px;
    height: ${TILE_SIZE * rows + BOARD_PADDING * 2}px;
  `;

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
        game.decrementMoves();
        game.resolveBoard(() => {
          if ($game.moves === 0) {
            dispatch("game-over", {
              score: $game.score
            });
          }
        });
      }

      selectedTile = null;
    }, 250 - 50);
  }

  $: console.log($game);
</script>

<style>
  main {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .board {
    position: relative;
    margin: 0 auto;
    background: rgba(0, 53, 103, 0.5);
    box-shadow: inset 0 0 8px rgba(0, 53, 103, 1);
    border-radius: 5px;
  }

  .cell {
    position: absolute;
    width: 60px;
    height: 60px;
  }

  .tile-wrapper {
    position: absolute;
    width: 60px;
    height: 60px;
  }
</style>

<main>
  <div class="board" style={boardStyle}>
    {#each cells as cell}
      <div class="cell" style={getCellStyle(cell)} />
    {/each}
    {#each board as tile, i (tile.id)}
      <span
        class="tile-wrapper"
        animate:flip={{ delay: 0, duration: 250, easing: quintOut }}
        style={getCellStyle(i)}>
        {#if tile.type !== null}
          <Tile
            type={tile.type}
            on:click={() => handleTileClick(i)}
            selected={isTileSelected(i)} />
        {/if}
      </span>
    {/each}
  </div>
</main>
