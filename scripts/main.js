import {
  createSudokuBoard,
  isValid,
  isUniqueInRow,
  isUniqueInColumn,
  isUniqueInBlock
} from './game-functions.js'

(() => {
  const boardContainer = document.querySelector('.board-container')

  const board = boardContainer.appendChild(createSudokuBoard())

  board.childNodes.forEach((row, rowIndex) => {
    row.childNodes.forEach((cell, cellIndex) => {
      cell.appendChild(createInput({
        type: 'number',
        name: `${rowIndex};${cellIndex}`,
        id: `${rowIndex};${cellIndex}`,
        min: 1,
        max: 9,
      }, 'input', checkValue))
    })
  })
})()

function createInput(attrs, eventType, eventListenerCallback) {
  const input = document.createElement('input')
  Object.entries(attrs).forEach(([ attr, value ]) => input.setAttribute(attr, value))

  if (eventType && eventListenerCallback) {
    input.addEventListener(eventType, event => eventListenerCallback(event.target))
  }

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
