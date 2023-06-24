import { Modal, Form, Table, Input, Button, message } from "antd";
import React, { useState } from "react";

const Edit = ({ editModal, setEditModal, categories, setCategories }) => {
  const [editingRow, setEditingRow] = useState({});
  const onFinish = (values) => {
    try {
      fetch(process.env.REACT_APP_SERVER_URL+"/api/categories/update-category", {
        method: "PUT",
        body: JSON.stringify({ ...values, categoryId: editingRow._id }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Güncelleme İşlemi Başarılı");
      setCategories(
        categories.map((item) => {
          if (item._id === editingRow._id) {
            return { ...item, title: values.title };
          }
          return item;
        })
      );
    } catch (error) {
      message.error("Birşeyler Yanlış Gitti");
      console.log(error);
    }
  };

  const deleteCategory = (id) => {
    if (window.confirm("Emin misiniz?")) {
      try {
        fetch(process.env.REACT_APP_SERVER_URL+"/api/categories/delete-category", {
          method: "DELETE",
          body: JSON.stringify({ categoryId: id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        message.success("Silme İşlemi Başarılı");
        setCategories(
          categories.filter((item) => {
            return item._id !== id;
          })
        );
      } catch (error) {
        console.log(error);
        message.error("Birşeyler Yanlış Gitti");
      }
    }
  };
  const columns = [
    {
      title: "Kategori Adı",
      dataIndex: "title",
      render: (_, record) => {
        if (record._id === editingRow._id) {
          return (
            <Form.Item name="title">
              <Input className="mb-0" defaultValue={record.title} />
            </Form.Item>
          );
        } else {
          return <p>{record.title}</p>;
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex">
            <Button type="link" onClick={() => setEditingRow(record)}>
              Düzenle
            </Button>
            <Button
              onClick={() => {
                deleteCategory(record._id);
              }}
              type="link"
              danger
            >
              Sil
            </Button>
            <Button htmlType="submit" type="text">
              Kaydet
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <Modal
      open={editModal}
      title={"Kategori İşlemleri"}
      footer={null}
      onCancel={() => {
        setEditModal(false);
      }}
    >
      <Form onFinish={onFinish}>
        <Table columns={columns} dataSource={categories} bordered />
      </Form>
    </Modal>
  );
};

export default Edit;
