/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Categories from "../components/Categories/Categories";
import Header from "../components/Header/Header";
import Product from "../components/Product/Product";
import Cart from "../components/Cart/Cart";
import { message } from "antd";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const GetProducts = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL+"/api/products/get-all");
        const data = await res.json();
        setProducts(data);
        console.log(products);
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
        console.log(categories);
      } catch (error) {
        console.log(error);
        message.error("Kategoriler Yüklenemedi");
      }
    };
    GetCategories();
  }, []);
  console.log(search);
  return (
    <>
      <Header setSearch={setSearch} />
      <div className="home px-6 flex justify-between gap-10">
        <div className="categories overflow-auto max-h-[calc(100vh-_-250px)] pb-96 ">
          <Categories
            categories={categories}
            products={products}
            setCategories={setCategories}
            filtered={filtered}
            setFiltered={setFiltered}
          />
        </div>
        <div className="products flex-[8]">
          <Product
            products={products}
            setProducts={setProducts}
            categories={categories}
            setCategories={setCategories}
            filtered={filtered}
            search={search}
          />
        </div>
        <div className="cart-wrapper min-w-[300px] md:-mr-[24px] md:-mt-[24px] border">
          <Cart />
        </div>
      </div>
    </>
  );
};

export default Home;
