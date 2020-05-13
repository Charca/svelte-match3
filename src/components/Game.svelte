<script>
  import Board from "./Board.svelte";
  import GameHeader from "./GameHeader.svelte";
  import GameFooter from "./GameFooter.svelte";
  import game from "../store/game.store";

  const rows = 8;
  const columns = 8;

  game.init(rows, columns);
</script>

<style>
  main {
    display: flex;
    flex-direction: column;
    height: 100%;
    max-width: 500px;
    max-height: 1000px;
    margin: 0 auto;
  }
</style>

<main>
  <GameHeader />
  <Board />
  <GameFooter />
</main>
