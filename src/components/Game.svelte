<script>
  import Board from "./Board.svelte";
  import game from "../store/game.store";

  const rows = 10;
  const columns = 14;

  game.init(rows, columns);
</script>

<Board />
