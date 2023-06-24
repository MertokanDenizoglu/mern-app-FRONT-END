import React from "react";
import Modal from "antd/es/modal/Modal";
import { Form, Input, Select, Button, Card, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { deleteAll } from "../../redux/cartSlice";

const CreateBill = ({ setShowModal, showModal }) => {
  const dispatch = useDispatch();
  
  const onFinish = (values) => {
    console.log(values)
    try {
      fetch(process.env.REACT_APP_SERVER_URL+"/api/bills/add-bill", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          subTotal: cart.total,
          tax: cart.tax,
          totalAmount: cart.total + (cart.total * cart.tax) / 100,
          cartItems:cart.cartItems
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Fatura Başarıyla Oluşturuldu");
      setShowModal(false)
      dispatch(deleteAll());
    } catch (error) {
      message.error("Bir Hata Oluştur");
    }
  };
  const cart = useSelector((state) => state.cart);
  return (
    <Modal
      footer={false}
      open={showModal}
      onOk={() => {
        setShowModal(false);
      }}
      onCancel={() => {
        setShowModal(false);
      }}
      title="Fatura Oluştur"
    >
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name={"customerName"}
          label="Müşteri Adı"
          rules={[
            {
              required: true,
              message: "Müşteri Adı Giriniz",
            },
          ]}
        >
          <Input placeholder="Müşteri adı" />
        </Form.Item>
        <Form.Item
          name={"customerPhoneNumber"}
          label="Tel No"
          rules={[
            {
              required: true,
              message: "Telefon Numarası Giriniz",
            },
          ]}
        >
          <Input placeholder="Telefon" maxLength={11} />
        </Form.Item>
        <Form.Item
          name={"paymentMode"}
          label="Ödeme Yöntemi"
          rules={[
            {
              required: true,
              message: "Ödeme Yöntemi Seçiniz",
            },
          ]}
        >
          <Select placeholder="Ödeme Yöntemi">
            <Select.Option value="Nakit">Nakit</Select.Option>
            <Select.Option value="Kredi Kartı">Kredi Kartı</Select.Option>
          </Select>
        </Form.Item>
        <Card className="w-full">
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
        </Card>{" "}
        <Button htmlType="submit"  type="primary" className="w-full mt-3">
          Sipariş Oluştur
        </Button>{" "}
      </Form>
    </Modal>
  );
};

export default CreateBill;
