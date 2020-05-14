<script>
  import Board from "./Board.svelte";
  import GameHeader from "./GameHeader.svelte";
  import GameFooter from "./GameFooter.svelte";
  import GameOverModal from "./GameOverModal.svelte";
  import game from "../store/game.store";

  const rows = 8;
  const columns = 8;
  const moves = 20;

  game.init(rows, columns, moves);

  let showModal = false;
  let bestScore;
  let score;

  function handleGameOver(event) {
    score = $game.score;
    const prevBest = localStorage.getItem("best-score") || 0;
    const newBest = Math.max(score, parseInt(prevBest, 10));

    localStorage.setItem("best-score", newBest);
    bestScore = newBest;
    showModal = true;
  }

  function handlePlayAgain() {
    game.reset();
    showModal = false;
  }
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
  <Board on:game-over={handleGameOver} />
  <GameFooter />
  <GameOverModal
    {score}
    {bestScore}
    visible={showModal}
    on:play-again={handlePlayAgain} />
</main>
