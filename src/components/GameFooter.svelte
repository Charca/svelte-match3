<script>
  import game from "../store/game.store";
</script>

<style>
  footer {
    display: flex;
    justify-content: flex-end;
  }

  button {
    transition: all 0.1s;
    padding: 12px 30px;
    border-radius: 12px;
    font-size: 24px;
    color: #fff;
    text-decoration: none;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    background-color: #3498db;
    border-bottom: 5px solid #2980b9;
    text-shadow: 0px -2px #2980b9;
  }

  button:active {
    transform: translate(0px, 5px);
    -webkit-transform: translate(0px, 5px);
    border-bottom: 1px solid;
  }

  button:focus {
    outline: none;
  }
</style>

<footer>
  <button>Reset</button>
</footer>
