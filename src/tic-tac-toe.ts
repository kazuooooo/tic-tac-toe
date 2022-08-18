import { computed, ref } from "vue"
export type Counter = "x" | "o" | "-"
export type Row = readonly [Counter, Counter, Counter]
export type Board = readonly [Row, Row, Row]
export type ColIdx = 0 | 1 | 2
export type RowIdx = 0 | 1 | 2

export const initialBoard: Board = [
  ["-", "-", "-"],
  ["-", "-", "-"],
  ["-", "-", "-"],
]

export const createGame = (initialState: Board[]) => {
  return [...initialState]
}

const makeMove = (
  board: Board,
  {
    col,
    row,
    counter,
  }: {
    col: ColIdx
    row: RowIdx
    counter: Counter
  }
): {
  newBoard: Board
  newCounter: Counter
} => {
  const newBoard = board.map((theRow, rowIdx) =>
    theRow.map((cell, colIdx) =>
      rowIdx === row && colIdx === col ? counter : cell
    )
  ) as any as Board
  const newCounter = counter === "o" ? "x" : "o"

  return {
    newBoard,
    newCounter,
  }
}

/**
 * Vue integration layer
 * State is mutable
 */
export const useTicTacToe = () => {
  const boards = ref<Board[]>([initialBoard])
  const counter = ref<Counter>("o")
  const move = ({ col, row }: { col: ColIdx; row: RowIdx }) => {
    const { newBoard, newCounter } = makeMove(currentBoard.value, {
      col,
      row,
      counter: counter.value,
    })
    boards.value.push(newBoard)
    counter.value = newCounter
  }

  const currentBoard = computed(() => {
    return boards.value[boards.value.length - 1]
  })

  return {
    currentBoard,
    makeMove: move,
  }
}
