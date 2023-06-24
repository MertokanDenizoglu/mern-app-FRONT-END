/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Header from "../components/Header/Header";
import StatisticCard from "../components/Statistic/StatisticCard";
import { useEffect, useState } from "react";
import { Area } from "@ant-design/plots";
import { Pie } from "@ant-design/plots";
import { message } from "antd";

const Statistic = () => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const user = localStorage.getItem("user");
  const userName = JSON.parse(user);
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
    asyncFetch();
  }, []);
  const asyncFetch = () => {
    fetch(process.env.REACT_APP_SERVER_URL+"/api/bills/get-all")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };

  const config = {
    data,
    xField: "customerName",
    yField: "subTotal",
    xAxis: {
      range: [0, 1],
    },
  };
  const config2 = {
    appendPadding: 10,
    data,
    angleField: "subTotal",
    colorField: "customerName",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        content: "İstatistik",
      },
    },
  };
  const totalAmount = () => {
    const amount = data.reduce((total, item) => item.totalAmount + total, 0);
    return amount;
  };
  return (
    <>
      <Header />
      <div className="px-6">
        <h1 className="text-center font-bold text-3xl">İSTATİSTİKLERİM</h1>
        <div className="statistic-section">
          <h2 className="text-xl">
            Hoş Geldiniz{" "}
            <span className="text-green-700 font-bold text-xl">
              {userName.username}
            </span>
            .
          </h2>
          <div className="statistc-cards grid xl:grid-cols-4 gap-x-5  md:grid-cols-2 ">
            <StatisticCard
              title={"Toplam Müşteri"}
              amount={data?.length}
              img={"images/user.png"}
            />
            <StatisticCard
              title={"Toplam Kazanç"}
              amount={totalAmount().toFixed(2) + " ₺"}
              img={"images/money.png"}
            />
            <StatisticCard
              title={"Toplam Satış"}
              amount={data?.length}
              img={"images/sale.png"}
            />
            <StatisticCard
              title={"Toplam Ürün"}
              amount={products?.length}
              img={"images/product.png"}
            />
          </div>
          <div className="flex">
            {" "}
            <div className="w-1/2">
              <Area {...config} />
            </div>
            <div className="w-1/2">
              <Pie {...config2} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Statistic;
