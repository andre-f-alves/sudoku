import {
  createSudokuBoard,
  isValid,
  isUniqueInRow,
  isUniqueInColumn,
  isUniqueInBlock
} from './gameFunctions.js'

import {
  createInput,
  createKeyboard
} from './auxiliaryFeatures.js'

(() => {
  const boardContainer = document.querySelector('.board-container')
  const board = boardContainer.appendChild(createSudokuBoard())

  const rows = [ ...board.rows ]

  rows.forEach((row, rowIndex) => {
    const cells = [ ...row.cells ]

    cells.forEach((cell, cellIndex) => {
      const coordinates = `${rowIndex};${cellIndex}`

      const input = cell.appendChild(createInput({
        type: 'number',
        name: coordinates,
        id: coordinates,
        title: `Campo (${coordinates})`,
        min: 1,
        max: 9,
      }))

      input.addEventListener('input', event => checkValue(event.target))

    })
  })

  const keyboardContainer = document.querySelector('.keyboard-container')
  keyboardContainer.appendChild(createKeyboard())
})()

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
