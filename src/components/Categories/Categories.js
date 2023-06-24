import React, { useEffect, useState } from "react";
import "./style.css";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { Form, message } from "antd";
import Add from "./Add";
import Edit from "./Edit";
const Categories = ({ categories, setCategories , setFiltered , products }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [title,setTitle]=useState("Tümü")
  useEffect(()=>{
   if(title==="Tümü" ){
    setFiltered(products)
   }else{
    setFiltered(products.filter(item=>item.category===title))
   }
  },[products , setFiltered , title])
  const [form] = Form.useForm();
  const onFinish = (values) => {
    try {
      fetch(process.env.REACT_APP_SERVER_URL+"/api/categories/add-category", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Kategori Başarıyla Eklendi");
      form.resetFields();
      setCategories([...categories, values]);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(title)
  return (
    <ul className="flex gap-y-10 flex-col">
      {categories.map((item) => {
        return (
          <li className="category-item " key={item._id} onClick={()=>{setTitle(item.title)}}>
            <span>{item.title}</span>
          </li>
        )
      }).reverse()}

      <li
        onClick={() => setModalOpen(true)}
        className="category-item !bg-purple-600 hover:opacity-90"
      >
        <span>
          <PlusOutlined className="justify-center" />
        </span>
      </li>
      <li
        onClick={() => setEditModal(true)}
        className="category-item !bg-orange-600 hover:opacity-90"
      >
        <span>
          <EditOutlined className="justify-center" />
        </span>
      </li>
      <Add
        modalOpen={modalOpen}
        onFinish={onFinish}
        categories={categories}
        setCategories={setCategories}
        setModalOpen={setModalOpen}
        form={form}
      />
      <Edit
        editModal={editModal}
        setEditModal={setEditModal}
        categories={categories}
        setCategories={setCategories}
      />
    </ul>
  );
};

export default Categories;
