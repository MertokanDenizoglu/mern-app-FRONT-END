import React, { useState } from "react";
import Header from "../components/Header/Header";
import { Table, Card, Button } from "antd";
import CreateBill from "../components/Cart/CreateBill";
import { useSelector, useDispatch } from "react-redux";
import { increase, decrease, deleteCart } from "../redux/cartSlice";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

const Cart = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  console.log(cart.cartItems.length, "SEPET ");
  const columns = [
    {
      title: "Kategori",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Fiyat",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Ürün Adı",
      dataIndex: "title",
      key: "title",
    },

    {
      title: "Ürün Görseli",
      dataIndex: "img",
      key: "img",
      render: (_, record) => {
        return <img className="w-20" src={record.img} alt="..." />;
      },
    },
    {
      title: "Ürün Adedi",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => {
        return (
          <div className="flex justify-center">
            {" "}
            <Button
              onClick={() => {
                dispatch(increase(record));
              }}
              size="small"
              className="w-full flex items-center justify-center !rounded-full"
              icon={<PlusCircleOutlined />}
            />
            {text}
            <Button
              onClick={() => {
                dispatch(decrease(record));
              }}
              size="small"
              className="w-full flex items-center justify-center !rounded-full"
              icon={<MinusCircleOutlined />}
            />
          </div>
        );
      },
    },
    {
      title: "Toplam Fiyat",
      render: (record, text) => {
        console.log(text);
        return <span>{text.quantity * text.price}</span>;
      },
    },
    {
      title: "İptal",
      render: (record) => {
        return (
          <Button
            onClick={() => dispatch(deleteCart(record))}
            type="link"
            danger
          >
            Siparişi Temizle
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <CreateBill showModal={showModal} setShowModal={setShowModal} />
      <Header />
      <Table
        className="px-10 mt-4"
        dataSource={cart.cartItems}
        columns={columns}
        bordered
        pagination={false}
      />
      <div className="cart-total flex justify-end">
        <Card className="w-72 mt-4 mr-10">
          <div className="flex justify-between border-b">
            <span>Ara Toplam</span>
            <span>{cart.total}</span>
          </div>
          <div className="flex justify-between border-b">
            <span className="text-red-900">KDV %{cart.tax}</span>
            <span className="text-red-900">
              {(cart.total * cart.tax) / 100}
            </span>
          </div>
          <div className="flex justify-between border-b">
            <span className="text-xl  text-green-400 font-bold">
              Genel Toplam
            </span>
            <span className="text-xl text-green-400 font-bold">
              {cart.total + (cart.total * cart.tax) / 100}
            </span>
          </div>
          <Button
            disabled={cart.cartItems.length === 0}
            onClick={() => {
              setShowModal(true);
            }}
            type="primary"
            className="w-full mt-3"
          >
            Sipariş Oluştur
          </Button>
        </Card>
      </div>
    </>
  );
};

export default Cart;
