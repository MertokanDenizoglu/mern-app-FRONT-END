import React from "react";
import { Modal, Form, Input, Button } from "antd";

const Add = ({ onFinish, modalOpen, setModalOpen, form }) => {
  return (
    <Modal
      title={"Yeni Kategori Ekle"}
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
              message: "Kategori İsmi Giriniz",
            },
          ]}
          label={"Kategori İsmi"}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" className="w-full" type="primary">
            Kategori Ekle
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;
