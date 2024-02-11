function createSudokuBoard() {
  const board = document.createElement('table')

  for (let i = 0; i < 9; i++) {
    const row = document.createElement('tr')

    for (let j = 0; j < 9; j++) {
      const cell = document.createElement('td')

      if (j !== 0 && j % 3 === 0) {
        const divisionLine = document.createElement('div')
        divisionLine.style.width = 0
        row.appendChild(divisionLine)
      }

      row.appendChild(cell)
    }

    if (i !== 0 && i % 3 === 0) {
      board.appendChild(document.createElement('div'))
    }

    board.appendChild(row)
  }
  return board
}

function isValid(value) {
  return /^[1-9]$/.test(value)
}

function isUniqueInRow(row, value, currentCol) {
  for (let col = 0; col < 9; col++) {
    const input = document.getElementById(`${row};${col}`)

    if (input.value === value && col !== parseInt(currentCol)) {
      return false
    }
  }
  return true
}

function isUniqueInColumn(col, value, currentRow) {
  for (let row = 0; row < 9; row++) {
    const input = document.getElementById(`${row};${col}`)

    if (input.value === value && row !== parseInt(currentRow)) {
      return false
    }
  }
  return true
}

function isUniqueInBlock(blockRow, blockCol, currentRow, currentCol, value) {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const input = document.getElementById(`${blockRow + row};${blockCol + col}`)

      if (
        (
          blockRow + row !== parseInt(currentRow) ||
          blockCol + col !== parseInt(currentCol)
        ) &&
        input.value === value
      ) {
        return false
      }
    }
  }
  return true
}

export { createSudokuBoard, isValid, isUniqueInRow, isUniqueInColumn, isUniqueInBlock }
