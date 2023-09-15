const board = document.querySelector('.board')


function createBoard() {

  for (let i = 0; i < 9; i++) {
    const row = document.createElement('tr')

    for (let j = 0; j < 9; j++) {
      const cell = document.createElement('td')
      const input = createInput({
        type: 'number',
        name: 'cell-input',
        id: 'cell-input',
        min: 1,
        max: 9,
      })

      cell.classList.add('cell')
      cell.appendChild(input)
      row.appendChild(cell)
    }
    board.appendChild(row)
  }
}

function createInput(attributes) {
  const input = document.createElement('input')
  Object.keys(attributes).forEach(attr => input.setAttribute(attr, attributes[attr]))
  return input
}

createBoard()
