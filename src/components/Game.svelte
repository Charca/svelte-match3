<script>
  import Board from "./Board.svelte";
  import game from "../store/game.store";

  const rows = 8;
  const columns = 8;

  game.init(rows, columns);
</script>

<h2>{$game.score}</h2>
<Board />
