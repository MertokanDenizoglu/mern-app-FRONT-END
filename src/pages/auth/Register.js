import React ,{useState} from "react";
import { Button, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import { Carousel } from "antd";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate()
  const [loading,setLoading]=useState(false)
  const onFinish = async(values) => {
    setLoading(true)
    try {
    const res =  await fetch(process.env.REACT_APP_SERVER_URL+"/api/auth/register",{
        method: "POST",
        headers:{"Content-type" : "application/json; charset=UTF-8"},
        body: JSON.stringify(values)
      })
      console.log(res)
      if(res.status === 200){
        message.success("Kayıt Olma İşlemi Başarılı")
        navigate("/login")
        setLoading(false)
      }
     
    } catch (error) {
      console.log(error)
      message.error("Kayıt Olma İşlemi Başarısız")
    }
  };
  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="flex px-10 flex-col w-full justify-center h-full">
          <h1 className="text-center  text-5xl font-bold mb-2">MOD</h1>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Kullanıcı Adı"
              name={"username"}
              rules={[
                {
                  required: true,
                  message: "Kullanıcı Adı Boş Bırakılamaz",
                },
              ]}
            >
              <Input />
            </Form.Item>
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
            <Form.Item
              label="Şifre Tekrar"
              name={"passwordRety"}
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Şifrenizi Doğrulayınız",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Şifreler Uyuşmuyor"));
                  },
                }),
              ]}
            >
              <Input.Password />
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
                Kaydol
              </Button>
            </Form.Item>
          </Form>
          <span className="text-center ">
            Bir Hesabınız Var mı ?{" "}
            <Link to={"/login"} className="text-blue-500">
              Giriş Yap
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

export default Register;
