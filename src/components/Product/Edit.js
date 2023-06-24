/* eslint-disable react-hooks/exhaustive-deps */
import { Modal, Table, Button, message, Form, Input, Select } from "antd";
import React, { useState, useEffect } from "react";

const Edit = () => {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editingItem, setEditingItem] = useState({});
  const [form] = Form.useForm();
  useEffect(() => {
    const GetProducts = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL+"/api/products/get-all");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
        message.error("Kategoriler Yüklenemedi");
      }
    };
    GetProducts();
  }, []);
  useEffect(() => {
    const GetCategories = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL+"/api/categories/get-all");
        const data = await res.json();
        data &&
          setCategories(
            data.map((item) => {
              return { ...item, value: item.title };
            })
          );

      } catch (error) {
        console.log(error);
        message.error("Kategoriler Yüklenemedi");
      }
    };
    GetCategories();
  }, []);
  const onFinish = (values) => {
    if (window.confirm("Emin misiniz?")) {
      try {
        fetch(process.env.REACT_APP_SERVER_URL+"/api/products/update-product", {
          method: "PUT",
          body: JSON.stringify({ ...values, productId: editingItem._id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        setProducts(
          products.map((item) => {
            if (item.id === editingItem._id) {
              return values;
            } else {
              return item;
            }
          })
        );
        message.success("Güncelleme İşlemi Başarılı");
      } catch (error) {
        console.log(error);
        message.error("Birşeyler Yanlış Gitti");
      }
    }
  };
  const deleteProduct = (id) => {
    if (window.confirm("Emin misiniz?")) {
      try {
        fetch(process.env.REACT_APP_SERVER_URL+"/api/products/delete-product", {
          method: "DELETE",
          body: JSON.stringify({ productId: id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        message.success("Silme İşlemi Başarılı");
        setProducts(products.filter((item) => item._id !== id));
      } catch (error) {
        console.log(error);
        message.error("Birşeyler Yanlış Gitti");
      }
    }
  };
  const columns = [
    {
      title: "Ürün Adı",
      dataIndex: "title",
      render: (_, record) => {
        return <p>{record.title}</p>;
      },
    },
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      render: (_, record) => {
        return (
          <img className="w-20 h-20 object-cover" src={record.img} alt="..." />
        );
      },
    },
    {
      title: "Ürün Fiyatı",
      dataIndex: "price",
    },
    {
      title: "Kategori",
      dataIndex: "category",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex">
            <Button
              onClick={() => {
                setModalOpen(true);
                setEditingItem(record);
              }}
              type="link"
            >
              Düzenle
            </Button>
            <Button
              onClick={() => {
                deleteProduct(record._id);
              }}
              type="link"
              danger
            >
              Sil
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <>
      {" "}
      <Table
        pagination={true}
        columns={columns}
        dataSource={products}
        bordered
        rowKey={"_id"}
        scroll={{ x: 1000, y: 600 }}
      />
      <Modal
        title={"Yeni Ürün Ekle"}
        footer={null}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          initialValues={editingItem}
        >
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
                (option?.title ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
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
              Güncelle
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Edit;
