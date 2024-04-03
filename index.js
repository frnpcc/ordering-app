import menuArray from "/data.js"

const orderDetailsEl = document.getElementById('order-details')
const orderDetailsArr = []
const itemsPrices = []
const orderTotalEl = document.getElementById('order-total')
const orderBtn = document.getElementById('order-btn')
const paymentModal = document.getElementById('payment-modal')

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
      <button class="add-btn" id="add-btn" data-add=${id}>+</button>
    </div>`
  }).join('')
}

function renderItemsList() {
  const itemsContainer = document.getElementById('items-container')
  itemsContainer.innerHTML = getItemsHtml()
}

renderItemsList()

const selectItemBtn = document.getElementById('add-btn')

document.addEventListener('click', function(e){
  if (e.target.dataset.add){
    getSelectedItem(Number(e.target.dataset.add))
  } else if (e.target.id === 'order-btn'){
    renderPaymentModal()
  } else if(e.target.id === 'pay-btn'){
    renderOrderCompletedMsg(e)
  } else if (e.target.dataset.remove){
    removeSelectedItem(Number(e.target.dataset.remove))
  }
})

function getSelectedItem(itemId){
  const selectedItemObj = menuArray.filter( menuItem => menuItem.id === itemId )[0]
  orderDetailsArr.push(selectedItemObj)
  itemsPrices.push(selectedItemObj.price)
  getOrderDetailsHtml(orderDetailsArr)
  orderTotal(itemsPrices)
}

function getOrderDetailsHtml(array) {

  const orderDetailsHtml = array.map(function(item){
    return `
    <div class="item-details">
      <p>${item.name} <span class='remove-order-item' id="remove-item" data-remove='${item.id}'>remove</span></p>
      <span class='order-item-price'>$${item.price}</span>
    </div>`
  }).join('')

  renderOrderDetails(orderDetailsHtml)
}

function renderOrderDetails(html){
  orderDetailsEl.innerHTML = html
}

function orderTotal(array){
  const orderTotal = array.reduce(function(total, current){
    return total + current
  }, 0)
  orderTotalEl.textContent = '$' + orderTotal
}

function renderPaymentModal() {
  paymentModal.style.display = 'inline'
}

function renderOrderCompletedMsg(e) {
  e.preventDefault()
  paymentModal.style.display = 'none'
  orderTotalEl.style.display = 'none'
  document.getElementById('order-section').style.display = 'none'
  document.getElementById('completed-msg').style.display = 'block'

}

function removeSelectedItem(itemId){
  const selectedItem = menuArray.filter( menuItem => menuItem.id === itemId)[0]
  const itemIndex = orderDetailsArr.indexOf(selectedItem)
  orderDetailsArr.splice(itemIndex, 1)
  getOrderDetailsHtml(orderDetailsArr)
}
