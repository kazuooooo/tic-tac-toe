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

const makeBoard = (
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
): Board => {
  return board.map((theRow, rowIdx) =>
    theRow.map((cell, colIdx) =>
      rowIdx === row && colIdx === col ? mark : cell
    )
  ) as any as Board
}

const copyBoard = (board: Board) => {
  return JSON.parse(JSON.stringify(board))
}

/**
 * Vue integration layer
 * State is mutable
 */
export const useTicTacToe = () => {
  const boards = ref<Board[]>([initialBoard])
  const turn = ref(0)
  const currentMark = computed(() => (turn.value % 2 == 0 ? "o" : "x"))

  const makeMark = ({ col, row }: { col: ColIdx; row: RowIdx }) => {
    // ボードをコピー
    const newBoard = copyBoard(currentBoard.value)
    // 指定した位置にマークをつける
    newBoard[row][col] = currentMark.value
    boards.value.push(newBoard)
    turn.value += 1
  }

  const currentBoard = computed(() => {
    return boards.value[boards.value.length - 1]
  })

  return {
    currentBoard,
    makeMark,
  }
}
