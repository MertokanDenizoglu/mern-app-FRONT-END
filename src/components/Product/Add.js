import React from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import { message } from "antd";

const Add = ({
  modalOpen,
  setModalOpen,
  form,
  categories,
  setProducts,
  products,
}) => {
  console.log(categories);
  const onFinish = (values) => {
    try {
      fetch(process.env.REACT_APP_SERVER_URL+"/api/products/add-product", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Ürün Başarıyla Eklendi");
      setProducts([
        ...products,
        {
          ...values,
          _id: Math.random(),
          price: Number(values.price),
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      title={"Yeni Ürün Ekle"}
      footer={null}
      open={modalOpen}
      onCancel={() => setModalOpen(false)}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          name={"title"}
          rules={[
            {
              required: true,
              message: "Ürün İsmi Giriniz",
            },
          ]}
          label={"Ürün İsmi"}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"price"}
          rules={[
            {
              required: true,
              message: "Ürün Tutarı Giriniz",
            },
          ]}
          label={"Ürün Tutarı"}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name={"category"}
          rules={[
            {
              required: true,
              message: "Kategori Seçme Alanı Boş Bırakılamaz",
            },
          ]}
          label={"Kategori"}
        >
          <Select
            showSearch
            placeholder="Kategori Seç"
            optionFilterProp="category"
            filterOption={(input, option) =>
              (option?.title ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={categories}
          />
        </Form.Item>
        <Form.Item
          name={"img"}
          rules={[
            {
              required: true,
              message: "Ürün Görseli Giriniz",
            },
          ]}
          label={"Ürün Görseli"}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" className="w-full" type="primary">
            Ürün Ekle
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;
