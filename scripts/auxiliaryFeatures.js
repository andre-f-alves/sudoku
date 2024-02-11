function createInput(attrs) {
  const input = document.createElement('input')
  Object.entries(attrs).forEach(([ attr, value ]) => input.setAttribute(attr, value))
  return input
}

function createKeyboard() {
  const keyboard = document.createElement('table')

  for (let i = 0; i < 3; i++) {
    const row = document.createElement('tr')

    for (let j = 0; j < 3; j++) {
      const cell = document.createElement('td')
      const key = document.createElement('button')
      
      const keyValue = 9 - (3 * i + j)
      
      key.innerText = keyValue
      key.setAttribute('type', 'button')
      key.setAttribute('value', keyValue)

      cell.appendChild(key)
      row.appendChild(cell)
    }
    keyboard.appendChild(row)
  }
  return keyboard
}

export { createInput, createKeyboard }
