<template>
  <div v-for="(row, rowIdx) in currentBoard" :key="rowIdx" class="row">
    <div v-for="(col, colIdx) in row" :key="colIdx" class="col" :data-testid="`row-${rowIdx}-col-${colIdx}`"
      :data-test="`row-${rowIdx}-col-${colIdx}`" @click="makeMark({ row: rowIdx, col: colIdx })">
      {{ col }}
    </div>
  </div>
</template>

<script lang="ts">
import { useTicTacToe } from './tic-tac-toe';

export default {
  setup(_props: {}) {
    const { currentBoard, makeMark } = useTicTacToe()

    return {
      currentBoard,
      makeMark
    }
  }
}
</script>

<style>
.row {
  display: flex;
}

.col {
  border: 1px solid black;
  height: 50px;
  width: 50px;
}
</style>
