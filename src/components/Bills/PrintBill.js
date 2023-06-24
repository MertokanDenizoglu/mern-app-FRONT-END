import React, { useRef } from "react";
import { Button, Modal } from "antd";
import { useReactToPrint } from "react-to-print";

const PrintBill = ({ setShowModal, showModal, customer, setCustomer }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <Modal
      footer={false}
      open={showModal}
      onOk={() => {
        setShowModal(false);
      }}
      onCancel={() => {
        setShowModal(false);
      }}
      title="Fatura Yazdır"
    >
      <section ref={componentRef} className="py-12 bg-black">
        <div className="max-w-5xl mx-auto bg-white px-6">
          <article className="overflow-hidden">
            <div className="logo my-6">
              <h1 className="text-4xl font-bold text-slate-500">MOD</h1>
            </div>
            <div className="bill-details">
              {customer && (
                <div className="flex gap-x-5">
                  <div className="text-center">
                    <p className="font-bold">Veriliş Tarihi: </p>
                    <span>
                      {customer.createdAt &&
                        customer.createdAt.substring(0, 10)}
                    </span>
                  </div>
                  <div className="text-center">
                    <p className="font-bold">Verilen Kişi: </p>
                    <span>{customer.customerName}</span>
                  </div>
                  <div className="text-center">
                    <p className="font-bold">Fatura No: </p>
                    <span>{customer._id && customer._id.substring(0, 6)}</span>
                  </div>
                  <div className="text-center">
                    <p className="font-bold">Ödeme Yöntemi: </p>
                    <span>{customer.paymentMode}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="bill-able-area mt-8">
              <table className="min-w-full divide-y divide-slate-500 overflow-hidden">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3 pl-4 text-left text-sm text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden "
                    >
                      Görsel
                    </th>
                    <th
                      scope="col"
                      className="py-3 pl-4 text-left text-sm text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden "
                    >
                      Başlık
                    </th>
                    <th
                      scope="col"
                      className="py-3 pl-4 text-left text-sm text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden "
                    >
                      Fiyat
                    </th>
                    <th
                      scope="col"
                      className="py-3 pl-4 text-left text-sm text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden "
                    >
                      Adet
                    </th>
                    <th
                      scope="col"
                      className="py-3 pl-4 text-left text-sm text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden "
                    >
                      Toplam
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {customer?.cartItems?.map((item) => {
                    return (
                      <tr>
                        <td className="py-4 pr-3 sm:pl-6">
                          <img
                            src={item.img}
                            alt="..."
                            width={50}
                            className="object-cover"
                          />
                        </td>
                        <td className="py-4 pr-3">
                          <span className="text-slate-500">{item.title}</span>
                        </td>
                        <td className="py-4 pr-3">
                          <span className="text-slate-500">
                            {item.price} ₺
                          </span>
                        </td>
                        <td className="py-4 pr-3">
                          <span className="text-slate-500">
                            {item.quantity}
                          </span>
                        </td>
                        <td className="py-4 pr-3">
                          <span className="text-slate-500">
                            {item.price * item.quantity}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <th className="text-right pt-6 " colSpan={4} scope="row">
                      Ara Toplam
                    </th>
                    <th className="text-right pt-6 " colSpan={4} scope="row">
                      {customer.subTotal}
                    </th>
                  </tr>
                  <tr>
                    <th
                      className="text-right pt-6  text-red-700"
                      colSpan={4}
                      scope="row"
                    >
                      KDV %{customer.tax}
                    </th>
                    <th
                      className="text-right pt-6  text-red-700"
                      colSpan={4}
                      scope="row"
                    >
                      {(customer.subTotal * customer.tax) / 100}
                    </th>
                  </tr>
                  <tr>
                    <th
                      className="text-right pt-6 text-green-500 "
                      colSpan={4}
                      scope="row"
                    >
                      Genel Toplam
                    </th>
                    <th
                      className="text-right pt-6 text-green-500 "
                      colSpan={4}
                      scope="row"
                    >
                      {customer.subTotal +
                        (customer.subTotal * customer.tax) / 100}
                    </th>
                  </tr>
                </tfoot>
              </table>

              <div className="border-b mt-4 mb-4 border-t font-bold text-center">
                Bu fiş, Türk Ticaret Kanunu ve ilgili diğer yasal düzenlemelere
                uygun olarak düzenlenmiştir. Fatura ve fişlerin saklanması,
                ilgili mevzuatta belirtilen süreler boyunca zorunludur. Bu belge
                sadece ödeme işlemini teyit etmek amacıyla verilmektedir ve
                herhangi bir garanti veya taahhüt içermemektedir. Fatura veya
                fiş üzerinde yer alan bilgilerin doğruluğu, alıcının
                sorumluluğundadır.
              </div>
            </div>
          </article>
        </div>
      </section>
      <div className="flex justify-end mt-4">
        <Button onClick={handlePrint} type="primary">
          Yazdır
        </Button>
      </div>
    </Modal>
  );
};

export default PrintBill;
