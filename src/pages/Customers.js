import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import { Table } from "antd";

const Customers = () => {
  const [bills, setBills] = useState([]);
  useEffect(() => {
    const getBills = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL+"/api/bills/get-all");
        const data = await res.json();
        setBills(data);
      } catch (error) {
        console.log(error);
      }
    };
    getBills();
  }, []);
  console.log(bills, "000");
  const columns = [
    {
      title: "İsim",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Telefon Numarası",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
    },
    {
      title: "Katılma Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        return <span>{text.substring(0, 10)}</span>;
      },
    },
  ];
  return (
    <>
      <Header />
      <h1 className="text-center font-bold text-3xl">MÜŞTERİLER</h1>
      <Table className="overflow-y-auto" columns={columns} dataSource={bills} bordered  />
      <div className="flex justify-end"> </div>
    </>
  );
};

export default Customers;
