import {
  generateRandomBoard,
  getMatches,
  getResolvedBoard,
  getClearedBoard,
  getBoardScore,
} from './game.utils'

export const init = (rows, columns) => (state) => {
  return {
    rows,
    columns,
    board: generateRandomBoard(rows, columns),
    score: 0,
  }
}

export const swapTiles = (p, q) => (state) => {
  const { board } = state
  const aux = board[p]
  board[p] = board[q]
  board[q] = aux

  return {
    ...state,
    board,
  }
}

export const clearBoard = () => (state) => {
  const { board, rows, columns } = state
  const clearedBoard = getClearedBoard(board, rows, columns)

  return {
    ...state,
    board: clearedBoard,
  }
}

export const resolveBoard = () => (state) => {
  const { board, rows, columns } = state
  const resolvedBoard = getResolvedBoard(board, rows, columns)

  return {
    ...state,
    board: resolvedBoard,
  }
}

export const scoreBoard = () => (state) => {
  const { board, rows, columns, score } = state
  const newScore = getBoardScore(board, rows, columns) + score

  return {
    ...state,
    score: newScore,
  }
}

export const checkMatchesAndResolve = (resolveCb) => (state) => {
  const { board, rows, columns } = state
  const matches = getMatches(board, rows, columns)
  if (matches.length > 0) {
    resolveCb()
  }

  return state
}
