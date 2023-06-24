import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { Carousel } from "antd";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    setLoading(true)
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL+"/api/auth/login", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(values),
      });
     const user = await res.json()
     console.log(user)
      if (res.status === 200) {
        localStorage.setItem("user",JSON.stringify({
          username:user?.username,
          email:user?.email
        }))
        message.success("Giriş İşlemi Başarılı");
        navigate("/")
        setLoading(false)
      } else if (res.status === 404) {
        message.error("Kullanıcı Bulunamadı");
      }
    } catch (error) {
      console.log(error);
      message.error("Kayıt Olma İşlemi Başarısız");
      setLoading(false)
    }
  };
  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="flex px-10 flex-col w-full justify-center h-full">
          <h1 className="text-center  text-5xl font-bold mb-2">MOD</h1>
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              remember: false,
            }}
          >
            <Form.Item
              label="E-mail"
              name={"email"}
              rules={[
                {
                  required: true,
                  message: "E-mail Alanı Boş Bırakılamaz",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Şifre"
              name={"password"}
              rules={[
                {
                  required: true,
                  message: "Şifre Boş Bırakılamaz",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item name={"remember"} valuePropName="checked">
              <div className="flex justify-between">
                <Checkbox>Beni Hatırla</Checkbox>
                <Link>Şifremi Unuttum</Link>
              </div>
            </Form.Item>
            <Form.Item>
              {" "}
              <Button
                className="w-full"
                size="large"
                htmlType="submit"
                type="primary"
                loading={loading}
              >
                Giriş Yap
              </Button>
            </Form.Item>
          </Form>
          <span className="text-center ">
            Bir Hesabınız Yok mu ?{" "}
            <Link to={"/register"} className="text-blue-500">
              Kayıt Ol
            </Link>
          </span>
        </div>
        <div className="xl:w-4/6  min-w-[1200px] bg-[#6c63ff]">
          <div className="w-full">
            <Carousel className="p-20" autoplay>
              <div>
                <img
                  className="w-full m-auto"
                  src="images/admin.svg"
                  alt="..."
                />
              </div>
              <div>
                <img
                  className="w-full m-auto"
                  src="images/customer.svg"
                  alt="..."
                />
              </div>
              <div>
                <img
                  className="w-full m-auto"
                  src="images/statistic.svg"
                  alt="..."
                />
              </div>
              <div>
                <img
                  className="w-full m-auto"
                  src="images/responsive.svg"
                  alt="..."
                />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
