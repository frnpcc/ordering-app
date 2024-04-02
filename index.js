import menuArray from "/data.js"



function getItemsHtml() {
  return menuArray.map(menu => {
    const { name, ingredients, id, price, emoji } = menu
    return `
    <div class="item-card">
      <div class="item-first">
        <span class="item-icon">${emoji}</span>
        <div class="item-info">
          <h3 class="item-name">${name}</h3>
          <p>${ingredients.join(', ')}</p>
          <span class="item-price">$${price}</span>
        </div>
      </div>
      <span class="add-btn" id="add-btn">+</span>
    </div>`
  }).join('')
}

function render() {
  const itemsContainer = document.getElementById('items-container')
  itemsContainer.innerHTML = getItemsHtml()
}

render()
