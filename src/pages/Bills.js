import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import { Table, Button, message } from "antd";
import PrintBill from "../components/Bills/PrintBill";

const Bills = () => {
  const [showModal, setShowModal] = useState(false);
  const [bills, setBills] = useState([]);
  const[customer,setCustomer]=useState([]);
  console.log(customer,"CUSTOMER")
  const handleDelete = (id) => {
    if (window.confirm("Emin misiniz?")) {
      try {
        fetch(process.env.REACT_APP_SERVER_URL+"/api/bills/delete-bill", {
          method: "DELETE",
          body: JSON.stringify({ billId: id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        message.success("Silme İşlemi Başarılı");
        setBills(
          bills.filter((item) => {
            return item._id !== id;
          })
        );
      } catch (error) {
        console.log(error);
        message.error("Birşeyler Yanlış Gitti");
      }
    }
  };
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

  const columns = [
    {
      title: "İsim",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Telefon No",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
    },
    {
      title: "Ödeme Yöntemi",
      dataIndex: "paymentMode",
      key: "paymentMode",
    },
    {
      title: "Oluşturulma Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        return (
          <span>
            {text.substring(0, 10)}/{text.substring(11, 16)}
          </span>
        );
      },
    },
    {
      title: "Toplam Ödeme",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      title: "Fatura",
      render: (_,record) => {
        return (
          <Button
            onClick={() => {
              setShowModal(true);
              setCustomer(record)
            }}
            type="link"
           
          >
            Yazdır
          </Button>
        );
      },
    },
    {
      title: "Faturayı Sil",
      render: (record) => {
        return (
          <Button
            type="primary"
            danger
            onClick={() => {
              handleDelete(record._id);
            }}
          >
            Sil
          </Button>
        );
      },
    },
  ];
  return (
    <>
      <PrintBill showModal={showModal} setShowModal={setShowModal} customer={customer} setCustomer={setCustomer} />
      <Header />
      <h1 className="text-center font-bold text-3xl">FATURALAR</h1>
      <Table
        className="overflow-y-auto px-10"
        columns={columns}
        dataSource={bills}
        bordered
        scroll={{ x: 1000, y: 400 }}
      />
      <div className="flex justify-end">
        {" "}
        {/* <Card className="w-72 mt-4 mr-10">
          <div className="flex justify-between border-b">
            <span>Ara Toplam</span>
            <span>100 TL</span>
          </div>
          <div className="flex justify-between border-b">
            <span className="text-red-900">KDV</span>
            <span className="text-red-900">18 TL</span>
          </div>
          <div className="flex justify-between border-b">
            <span className="text-xl  text-green-400 font-bold">
              Genel Toplam
            </span>
            <span className="text-xl text-green-400 font-bold">118 TL</span>
          </div>
          <Button
            onClick={() => {
              setShowModal(true);
            }}
            type="primary"
            className="w-full mt-3"
          >
            Fatura Oluştur
          </Button>
        </Card> */}
      </div>
    </>
  );
};

export default Bills;
