(function createBoard() {
  const board = document.querySelector('.board')

  for (let i = 0; i < 9; i++) {
    const row = document.createElement('tr')

    for (let j = 0; j < 9; j++) {
      const cell = document.createElement('td')
      const input = createInput({
        type: 'number',
        name: `${i};${j}`,
        id: `${i};${j}`,
        min: 1,
        max: 9,
      })

      input.addEventListener('input', event => checkValue(event.target))

      cell.classList.add('cell')

      if (i !== 0 && i % 3 === 0) {
        cell.classList.add('top-division')
      }

      if (j !== 0 && j % 3 === 0) {
        cell.classList.add('left-division')
      }

      cell.appendChild(input)
      row.appendChild(cell)
    }

    board.appendChild(row)
  }
})()

function createInput(attributes) {
  const input = document.createElement('input')
  Object.entries(attributes).forEach(attr => input.setAttribute(attr[0], attr[1]))
  return input
}

function checkValue(inputElement) {
  const [ row, col ] = inputElement.getAttribute('id').split(';')
  const number = inputElement.value

  const blockRow = Math.floor(row / 3) * 3
  const blockCol = Math.floor(col / 3) * 3

  inputElement.classList.remove('not-unique')

  if (!isValid(number)) {
    inputElement.value = ''
    return
  }

  if (
    !isUniqueInRow(row, number, col) ||
    !isUniqueInColumn(col, number, row)
  ) {
    inputElement.classList.toggle('not-unique')
    return
  }

  if (!isUniqueInBlock(blockRow, blockCol, row, col, number)) {
    inputElement.classList.toggle('not-unique')
  }
}

function isValid(value) {
  return /^[0-9]$/.test(value)
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
