import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShoppingContext } from "../contexts/ShoppingContext";
import { formatCurrency } from "../helpers/common";

interface CartItem {
  id: number;
  img: string;
  name: string;
  price: number;
  quantity: number;
}

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    totalPrice,
    increaseQty,
    decreaseQty,
    removeCartItem,
    clearCart,
  } = useShoppingContext();
  const [selectAll, setSelectAll] = useState(false);
  const handleSelectAll = () => {
    const allItemIds = cartItems.map((item) => item.id);
    setSelectAll(!selectAll);
    setSelectedItems(selectAll ? [] : allItemIds);
  };
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const saveProduct = () => {
    localStorage.setItem("bill", selectedItems.join(","));
  };
  const handleCheckboxChange = (itemId: number) => {
    const updatedSelectedItems = [...selectedItems];
    const index = updatedSelectedItems.indexOf(itemId);

    if (index !== -1) {
      // Item is already selected, so unselect it
      updatedSelectedItems.splice(index, 1);
    } else {
      // Item is not selected, so select it
      updatedSelectedItems.push(itemId);
    }

    setSelectedItems(updatedSelectedItems);
  };

  return (
    <div className="row">
      <h3>Checkout</h3>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th>Checkbox</th>
            <th>Img</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item: CartItem) => {
            const isChecked = selectedItems.includes(item.id);

            return (
              <tr key={item.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                </td>
                <td>
                  <img
                    src={item.img}
                    className="img-fluid rounded"
                    alt={item.name}
                  />
                </td>
                <td>{item.name}</td>
                <td>{formatCurrency(item.price)}</td>
                <td>
                  {item.quantity}
                  <button
                    type="button"
                    className="btn btn-sm btn-primary ms-3 me-1"
                    onClick={() => decreaseQty(item.id)}
                  >
                    <strong>-</strong>
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={() => increaseQty(item.id)}
                  >
                    <strong>+</strong>
                  </button>
                </td>
                <td>{formatCurrency(item.price * item.quantity)}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger btn-remove"
                    onClick={() => removeCartItem(item.id)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="col-md-12">
        <span className="float-end me-2">
          <strong>Total: {formatCurrency(totalPrice)}</strong>
        </span>
      </div>
      <div className="col-md-12 mt-5">
        <Link to="/products" className="btn btn-sm btn-primary float-start">
          Continue shopping
        </Link>
        <Link
          to="/bill"
          onClick={saveProduct}
          className="btn btn-sm btn-primary float-start"
        >
          Thanh Toán
        </Link>
        <button
          className="btn btn-sm btn-success float-end me-2 d-block"
          onClick={() => {
            // Perform the action for the selected items (e.g., payment)
            console.log("Selected items:", selectedItems);

            // Clear the cart and navigate
            clearCart();
            navigate("/products");
          }}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
