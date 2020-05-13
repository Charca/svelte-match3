<script>
  import game from "../store/game.store";
</script>

<style>
  header {
    height: 100px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .group {
    background: red;
    color: white;
    padding: 10px 20px;
    border-radius: 20px;
    background: -webkit-linear-gradient(top, #ff5db1 0%, #ef017c 100%);
    text-transform: uppercase;
    letter-spacing: 1px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    border: 4px solid white;
  }

  .group-value {
    font-size: 40px;
  }

  .score {
    justify-self: end;
    min-width: 200px;
    text-align: right;
  }
</style>

<header>
  <div class="group">
    <div class="group-label">Moves</div>
    <div class="group-value">68</div>
  </div>
  <div class="group score">
    <div class="group-label">Score</div>
    <div class="group-value">{$game.score}</div>
  </div>
</header>
