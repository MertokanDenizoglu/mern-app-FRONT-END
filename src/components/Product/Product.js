import React, { useState } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Add from "./Add";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";

const Product = ({ products, setProducts, categories, filtered, search }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = (item) => {
    dispatch(addProduct({ ...item, quantity: 1 }));
  };
  return (
    <div>
      <ul className="products-wrapper grid gap-4 grid-cols-product">
        {" "}
        {filtered
          .filter((product) => product.title.toLowerCase().includes(search))
          .map((item) => {
            return (
              <li key={item._id}>
                <div
                  onClick={() => handleClick(item)}
                  className="product-item border hover:shadow-md cursor-pointer transition-all select-none"
                >
                  <div className="product-img">
                    <img
                      src={item.img}
                      alt="..."
                      className="h-28 object-cover w-full borde-b"
                    />
                  </div>
                  <div className="product-info flex flex-col p-3">
                    <span className="font-bold">{item.title}</span>
                    <span>{item.price}</span>
                  </div>
                </div>
              </li>
            );
          })}
        <div
          onClick={() => setModalOpen(true)}
          className="product-item border hover:shadow-md cursor-pointer transition-all bg-red-600 select-none flex items-center justify-center"
        >
          <PlusOutlined className="justify-center text-3xl text-white" />
        </div>
        <div
          onClick={() => navigate("/product")}
          className="product-item border hover:shadow-md cursor-pointer transition-all bg-orange-600 select-none flex items-center justify-center"
        >
          <EditOutlined className="justify-center text-3xl  text-white" />
        </div>
      </ul>
      <Add
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        categories={categories}
        products={products}
        setProducts={setProducts}
      />
    </div>
  );
};

export default Product;
