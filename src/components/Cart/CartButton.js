import classes from './CartButton.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { toggle } from '../store/uiSlice';

const CartButton = (props) => {
  const { totalQuantity } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const toggleCartHandler = () => {
    dispatch(toggle());
  }

  return (
    <button onClick={toggleCartHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
