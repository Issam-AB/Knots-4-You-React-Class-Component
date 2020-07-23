import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from "../../../services/api";
import {addToCartSuccess, updateAmountSuccess } from './actions';
import history from '../../../services/history';

// function*= 'generator' = async /yield = awiat.
function* addToCart({id}) {

    //To not duplicate the product when the user select more than one in 'Home/index.js'.
    //It will sum inside of the cart.
    const productExists = yield select(
        state => state.cart.find(p =>p.id === id)
    );

    //call = to get the info from api.
    const stock = yield call(api.get, `/stock/${id}`)
    //console.log(stock);

    const stockAmount = stock.data.amount;
    //console.log(stockmAount);

    //If 'productExists' id not null use 'productExists.amount' otherwise, use '0'.
    const currentAmount = productExists ? productExists.amount : 0;

    const amount = currentAmount +1;

    if(amount > stockAmount) {
        toast.error('Out of stock!')
        return;
    }

    //To increment the quantity inside of the 'cart.
    if(productExists){

        yield put(updateAmountSuccess(id,amount))
    } else {
        const response = yield call(api.get, `/products/${id}`);

        const data = {
            ...response.data,
            amount: 1
        }
        //console.log(data);

        //put = to tigger an action 
        yield put(addToCartSuccess(data));
        history.push('/cart');
    
    }
};

function* updateAmount({id, amount}) {
    if((amount <= 0)) return;

    const stock = yield call(api.get, `stock/${id}`)

    const stockAmount = stock.data.amount;

    if(amount > stockAmount) {
        toast.error('Out of stock!')
        return;
    }
    yield put(updateAmountSuccess(id,amount))
}

export default function* watchAll() {
    //all = to regitrer many Listeners.

    yield all([
        //takeLatest = To control when the user click to fast in the button.
        //..it will registrer only one click.
        // 'action from REDUX, SAGA want to listen '@cart/ADD_REQUEST'
        takeLatest('ADD_REQUEST',addToCart),
        takeLatest('UPDATE_AMOUNT_REQUEST',updateAmount) 
    ]);
}

