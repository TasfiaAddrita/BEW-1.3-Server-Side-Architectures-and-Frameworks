// ========================================================
// Level 1 Challenges
// ========================================================

const sayHello = () => {
  return "Hello"
}

const area = (w, h) => {
  return w * h
}

const perimeter = (w, h) => {
  return w + w + h + h
}

const circleArea = r => {
  return Math.PI * r * r
}

// ========================================================
// Level 2 Challenges
// ========================================================
// NOTE: You will need to implement methods below (not yet
// defined) in order to make the tests pass.
// ========================================================

const shoppingCart = {
    items: [],

    getAllItems: function() {
        return this.items
        // return items
    },
    addItem: function(item) {
        found = this.items.find(i => i.name === item.name)
        if (found) {
            found.quantity += 1
        } else {
            this.items.push(item)
        }
    },
    removeItem:function(item_name) {
        rm_item = this.items.find(i => i.name === item_name)
        rm_item.quantity -= 1
        if (rm_item.quantity < 1) {
            this.items.pop(rm_item)
        }
    },
    getTotalNumItems: function() {
        totalQuantity = 0
        for (index in this.items) {
            totalQuantity += this.items[index].quantity
        }
        return totalQuantity
    },
    getTotalPrice: function() {
        totalPrice = 0
        for (index in this.items) {
            totalPrice += (this.items[index].quantity) * this.items[index].price
        }
        return parseFloat(totalPrice.toFixed(2))
    }
}

const createItem = (name, price) => {
    const item = {
        name: name,
        price: price,
        quantity: 1
    }
    return item
}

module.exports = { 
  sayHello, area, perimeter, circleArea,
  shoppingCart, createItem
}
