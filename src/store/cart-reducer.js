export const defaultIndividualCartList = {
  items: [],
  totalAmount: 0,
};

export const cartReducer = (state, action) => {
  //if action called is to add item or add quantity of an existing item into the cart
  if (action.type === "CART_INCREMENT") {
    const updatedTotalAmount =
      state.totalAmount + action.payload.price * action.payload.amount;

    // find if item is already present in the cart
    const existingCartItemIndex = state.items.findIndex((item) => {
      return item.id === action.payload.id;
    });
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    // if item already exists in cart, then we only have to update totalAmount of this existing item
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: action.payload.amount + existingCartItem.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
      // if item do not exist, we then process to the push of the item into existing cart (but concat is better because it creates a copy of existing cart when adding item)
    } else {
      updatedItems = state.items.concat(action.payload);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  // if action called is to remove item or deduce quantity of an existing item into the cart
  if (action.type === "CART_REMOVE_ITEM") {
    // find the Index of the selected item into the cart
    const existingCartItemIndex = state.items.findIndex((item) => {
      return item.id === action.id;
    });
    // identificate and update total amount of the cart
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    let updatedItems;

    // if only one left quantity of the item in the cart, we will have to remove the complete item, (and not only put quantity to 0), so that it desappears
    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((el) => {
        return el.id !== action.id;
      });
      // if remaining quantitiy before deduction is > 1 in the cart, then we onmy process update of the amount
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  // by default we return empty cart
  return defaultIndividualCartList;
};
