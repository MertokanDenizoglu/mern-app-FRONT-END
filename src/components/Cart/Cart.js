import React from "react";
import { Button } from "antd";
import {
  ClearOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteAll,
  deleteCart,
  increase,
  decrease,
} from "../../redux/cartSlice";
const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate()
  return (
    <div className="cart h-full max-h-[calc(100vh_-_110px)] flex flex-col">
      <h2 className="bg-blue-600 text-center py-4 text-white font-bold tracking-wide ">
        Sepetteki Ürünler
      </h2>
      <ul className="cart-items px-2 flex flex-col gap-y-2 py-2 overflow-y-auto">
        {cart.cartItems.map((item) => {
          return (
            <li className="cart-item ">
              <div className="flex items-center justify-between">
                <img
                  onClick={() => dispatch(deleteCart(item))}
                  src={item.img}
                  alt="..."
                  className="w-20 h-20 object-cover "
                />
                <div className="flex flex-col ml-2">
                  <b>{item.title}</b>
                  <span>
                    {item.price} x {item.quantity}
                  </span>
                </div>
                <div className="flex items-center gap-x-4">
                  <Button
                    onClick={() => {
                      dispatch(increase(item));
                    }}
                    size="small"
                    className="w-full flex items-center justify-center !rounded-full"
                    icon={<PlusCircleOutlined />}
                  />

                  <span> {item.quantity}</span>
                  <Button
                    onClick={() => {
                      dispatch(decrease(item));
                    }}
                    className="w-full flex items-center justify-center !rounded-full"
                    size="small"
                    danger
                    icon={<MinusCircleOutlined />}
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="cart-totals mt-auto text-center">
        <div className="px-10 py-2 border-t">
          <div className="flex justify-between">
            <b className="">Ara Toplam</b>
            <span className="">{cart.total}</span>
          </div>
          <div className="flex justify-between">
            <b className=" text-red-700">KDV%{cart.tax}</b>
            <span className="text-red-500">
              +{(cart.total * cart.tax) / 100}
            </span>
          </div>
          <div className="flex justify-between border-t">
            <b className=" text-green-700 text-2xl">Genel Toplam</b>
            <span className="text-black-500 text-2xl">
              {cart.total + (cart.total * cart.tax) / 100}
            </span>
          </div>
          <div className="grid gap-y-5">
            <Button
            onClick={()=>{navigate("/cart")}}
              disabled={cart.cartItems.length === 0}
              icon={<PlusCircleOutlined />}
              className="w-full flex items-center justify-center"
              type="primary"
            >
              Sipariş Oluştur
            </Button>
            <Button
              disabled={cart.cartItems.length === 0}
              onClick={() => {
                dispatch(deleteAll());
              }}
              icon={<ClearOutlined />}
              className="w-full flex items-center justify-center"
              type="primary"
              danger
            >
              Temizle
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
