import { computed, ref } from "vue"
export type Mark = "x" | "o" | "-"
export type Row = readonly [Mark, Mark, Mark]
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

const tmpMark = (
  board: Board,
  {
    col,
    row,
    mark,
  }: {
    col: ColIdx
    row: RowIdx
    mark: Mark
  }
): {
  newBoard: Board
  newMark: Mark
} => {
  const newBoard = board.map((theRow, rowIdx) =>
    theRow.map((cell, colIdx) =>
      rowIdx === row && colIdx === col ? mark : cell
    )
  ) as any as Board
  const newMark = mark === "o" ? "x" : "o"

  return {
    newBoard,
    newMark,
  }
}

/**
 * Vue integration layer
 * State is mutable
 */
export const useTicTacToe = () => {
  const boards = ref<Board[]>([initialBoard])
  const currentMark = ref<Mark>("o")
  const makeMark = ({ col, row }: { col: ColIdx; row: RowIdx }) => {
    const { newBoard, newMark } = tmpMark(currentBoard.value, {
      col,
      row,
      mark: currentMark.value,
    })
    boards.value.push(newBoard)
    currentMark.value = newMark
  }

  const currentBoard = computed(() => {
    return boards.value[boards.value.length - 1]
  })

  return {
    currentBoard,
    makeMark,
  }
}
