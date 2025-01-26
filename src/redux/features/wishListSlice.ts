import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist, moveToCart } from "./wishlistSlice";

const MyComponent = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);

  const handleAddToWishlist = (product) => {
    dispatch(addToWishlist(product));
  };

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleMoveToCart = (product) => {
    dispatch(moveToCart({ product, dispatch }));
  };

  return (
    <div>
      {/* Render wishlist items and buttons */}
    </div>
  );
};
