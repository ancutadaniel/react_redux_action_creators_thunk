import { replaceCart } from './cartSlice';
import { showNotification } from './uiSlice';

// Create a action creator function thunk
export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(
            showNotification({
                status: 'pending',
                title: 'Sending...',
                message: 'Sending cart data!',
            })
        );

        const sendRequest = async () => {
            const resp = await fetch('https://react-http-c6e95-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
                method: 'PUT',
                body: JSON.stringify({
                    items: cart.items,
                    totalQuantity: cart.totalQuantity,
                }),
            });
            if (!resp.ok) {
                throw new Error('Sending cart data failed.');
            }
        }

        try {
            await sendRequest();
            dispatch(
                showNotification({
                    status: 'success',
                    title: 'Success!',
                    message: 'Sent cart data successfully!',
                })
            );
        } catch (error) {
            dispatch(
                showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Sending cart data failed!',
                })
            );
        }
    }
}

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const resp = await fetch('https://react-http-c6e95-default-rtdb.europe-west1.firebasedatabase.app/cart.json');
            if (!resp.ok) {
                throw new Error('Fetching cart data failed.');
            }
            const data = await resp.json();
            return data;
        }

        try {
            const cartData = await fetchData();
            dispatch(replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity,
            }));

        } catch (error) {
            dispatch(
                showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'Fetching cart data failed!',
                })
            );
        }
    }
}