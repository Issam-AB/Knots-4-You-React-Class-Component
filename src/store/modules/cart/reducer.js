import produce from 'immer';

//Initial state as an empty array and receive the action.
export default function cart(state = [], action){
    switch(action.type){
        case 'ADD_SUCCESS': 
            //draft is a copy of the state.
            return produce(state, draft => {
                const { product } = action;
                draft.push(product)
            });

        case 'REMOVE': 
         return produce(state, draft => {
             const producIndex = draft.findIndex(p => p.id === action.id)

             // 'splice' to remove. 'productIndex' to get the product.
             if(producIndex >= 0) {
                 draft.splice(producIndex,1);
             }
         });
        
        case 'UPDATE_AMOUNT_SUCCESS': {
            return produce(state,draft => {
                const productIndex = draft.findIndex(p => p.id === action.id)

                if(productIndex >= 0) {
                    draft[productIndex].amount = Number(action.amount)
                }
            });
        }
        
         default :
          return state;
    }
}