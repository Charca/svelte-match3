<script>
  import Button from "./Button.svelte";
  import game from "../store/game.store";
</script>

<style>
  footer {
    display: flex;
    justify-content: flex-end;
  }
</style>

<footer>
  <Button on:click={game.reset}>Reset</Button>
</footer>
