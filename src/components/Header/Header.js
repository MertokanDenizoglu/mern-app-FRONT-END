import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Badge, Input, message } from "antd";
import {
  SearchOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  UsergroupDeleteOutlined,
  LineChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import './index.css'
const Header = ({ setSearch }) => {
  const cart = useSelector((state) => state.cart);
  console.log(cart, "Header Cart");
  const { pathname } = useLocation();
  const logOut = () => {
    if (window.confirm("Çıkış Yapmak İstediğinize Emin misiniz?")) {
      message.success("Çıkış Yapıldı");
      localStorage.removeItem("user");

      window.location.reload();
    }
  };

  return (
    <div className="border-b mb-6">
      <header className="py-4 px-6 gap-10 flex justify-between">
        <div className="logo">
          <Link to={"/"}>
            <h1 className="text-2xl font-bold  md:text-xl">MOD</h1>
          </Link>
        </div>
        <div className="header-search flex-1 flex justify-center">
          <Input
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            className="rounded-full max-w-[800px]"
            size="large"
            placeholder="Ara"
            prefix={<SearchOutlined />}
          />
        </div>
        <div className="menu-links flex gap-x-8  md:static md:w-auto w-screen bg-white md:bg-transparent fixed bottom-0 left-0 md:border-t-0 border-t mad:px-0 py-1">
          <Link  className={`menu-link flex flex-col ${
                pathname === "/" && "active"
              } `} to={"/"}>
            <HomeOutlined className="md:text-2xl text-xl hover:text-blue-500 transition-all" />
            <span className="text-sm">Ana Sayfa</span>
          </Link>
          <Badge count={cart.cartItems.length} offset={[0, 10]}>
            <Link
              className={`menu-link flex flex-col ${
                pathname === "/cart" && "active"
              } `}
              to={"/cart"}
            >
              <ShoppingCartOutlined className="md:text-2xl text-xl hover:text-blue-500 transition-all" />
              <span className="text-sm">Sepet</span>
            </Link>
          </Badge>
          <Link  className={`menu-link flex flex-col ${
                pathname === "/bills" && "active"
              } `} to={"/bills"}>
            <CopyOutlined className="md:text-2xl text-xl hover:text-blue-500 transition-all" />
            <span className="text-sm">Faturalar</span>
          </Link>
          <Link  className={`menu-link flex flex-col ${
                pathname === "/customers" && "active"
              } `} to={"/customers"}>
            <UsergroupDeleteOutlined className="md:text-2xl text-xl hover:text-blue-500 transition-all" />
            <span className="text-sm">Müşteriler</span>
          </Link>
          <Link  className={`menu-link flex flex-col ${
                pathname === "/statistic" && "active"
              } `} to={"/statistic"}>
            <LineChartOutlined className="md:text-2xl text-xl hover:text-blue-500 transition-all" />
            <span className="text-sm">İstatistik</span>
          </Link>
          <Link onClick={logOut} className="menu-link flex flex-col">
            <LogoutOutlined className="md:text-2xl text-xl hover:text-blue-500 transition-all" />
            <span className="text-sm">Çıkış</span>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Header;
