import { writable } from 'svelte/store'
import {
  init,
  swapTiles,
  resolveBoard,
  clearBoard,
  scoreBoard,
  checkMatchesAndResolve,
} from './game.actions'

function createStore() {
  const { subscribe, update } = writable({})

  return {
    subscribe,
    init: (rows, columns) => update(init(rows, columns)),
    swapTiles: (p, q) => update(swapTiles(p, q)),
    resolveBoard: function doResolve() {
      update(clearBoard())
      setTimeout(() => {
        update(scoreBoard())
        update(resolveBoard())
        setTimeout(() => {
          update(checkMatchesAndResolve(doResolve))
        }, 350)
      }, 200)
    },
  }
}

export default createStore()
