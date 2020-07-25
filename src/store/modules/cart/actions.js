export function addToCartRequest(id) {
   return {
       type: "ADD_REQUEST",
       id
   };
};

// Will be listened only by Reducer to add the info in the cart.
export function addToCartSuccess(product) {
    return {
        type: 'ADD_SUCCESS',
        product
    };
};

export function removeFromCart(id){
    return {
        type: 'REMOVE',
        id
    };
};

export function updateAmountRequest(id, amount) {
    return {
        type: 'UPDATE_AMOUNT_REQUEST',
        id,
        amount
    };
};

export function updateAmountSuccess(id, amount) {
    return {
        type: 'UPDATE_AMOUNT_SUCCESS',
        id,
        amount
    };
};