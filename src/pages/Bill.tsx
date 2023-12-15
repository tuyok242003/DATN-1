import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShoppingContext } from "../contexts/ShoppingContext";
import { formatCurrency } from "../helpers/common";
import { useAddBillMutation } from "../api/bill";
import { Form, Button, Alert, Input, Tabs, Row, Col } from "antd";
import { ProductItem } from "@/interfaces/product";
import TabPane from "antd/es/tabs/TabPane";
const Bill = () => {
  const [addBill] = useAddBillMutation();
  type FieldType = {
    id: number;
    user_id: number;
    status: string;
    address: string;
    date: string;
    total: number;
    phone: number;
    payment_method: string;
    notes: string;
  };
  const navigate = useNavigate();
  const onFinish = (values: FieldType) => {
    const {
      id,
      user_id,
      address,
      date,
      phone,
      payment_method,
      notes,
      total,
      status,
    } = values;
    const products: ProductItem[] = cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      img: item.img,
      description: "", // Thêm mô tả dựa trên dữ liệu của bạn
      quantity: item.quantity,
      category: "", // Thêm danh mục dựa trên dữ liệu của bạn
    }));
    addBill({
      id,
      user_id,
      address,
      date,
      phone,
      payment_method,
      notes,
      total,
      status,
      products,
    })
      .unwrap()
      .then(() => {
        return navigate("/adminBill");
      });
    // Check the selected delivery option
    if (deliveryOption === "pickup") {
      // Handle direct pickup logic
    } else if (deliveryOption === "qrCode") {
      // Handle QR code scanning logic
    }
  };
  const bill = localStorage.getItem("bill");
  const [deliveryOption, setDeliveryOption] = useState("pickup");
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const { cartItems, totalPrice } = useShoppingContext();

  const data = cartItems.filter((item) => {
    return bill?.includes(item.id.toString());
  });
  console.log(data);

  const calculateTotalPrice = () => {
    return data.reduce((total, item) => {
      const cartItem = cartItems.find((cartItem) => cartItem.id === item.id);
      if (cartItem) {
        return total + cartItem.price * cartItem.quantity;
      }
      return total;
    }, 0);
  };
  const calculateTotalItems = () => {
    return data.reduce((total, item) => {
      const cartItem = cartItems.find((cartItem) => cartItem.id === item.id);
      if (cartItem) {
        return total + cartItem.quantity;
      }
      return total;
    }, 0);
  };
  return (
    <div className="row">
      <Form.Item
        label="Địa chỉ nhận hàng"
        name="shippingAddress"
        rules={[
          {
            required: true,
            message: "Please input a valid shipping address.",
          },
        ]}
      >
        Dương Trung Hiếu (+84) 382387055 Ngõ 87 Phú Đô, Phường Phú Đô, Phường
        Phú Đô, Quận Nam Từ Liêm, Hà Nội
      </Form.Item>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Ảnh</th>
            <th>Sản Phẩm</th>
            <th>Đơn Giá</th>
            <th>Số Lượng</th>
            <th>Số Tiền</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.img}
                    className="img-fluid rounded"
                    alt={item.name}
                  />
                </td>
                <td>{item.name}</td>
                <td>{formatCurrency(item.price)}</td>

                <td>{item.quantity}</td>
                <td>{formatCurrency(item.price * item.quantity)}</td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="total-price" style={{ textAlign: "right" }}>
        <strong>Tổng số tiền ( {calculateTotalItems()}) sản phẩm:</strong>
        <strong> {formatCurrency(calculateTotalPrice())}</strong>
      </div>
      <Form
        name="basic"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {/* Display total price */}
        <Form.Item<FieldType>
          label="Status"
          name="status"
          initialValue="Đang nhận hàng" // Set the initial value for the status
          hidden
        >
          <Input disabled />
        </Form.Item>
        <Form.Item<FieldType> label="Lưu ý" name="notes">
          <Input placeholder="Lưu ý cho Người bán..." />
        </Form.Item>

        <Form.Item<FieldType>
          label="Total"
          name="total"
          initialValue={calculateTotalPrice()} // Assuming you want to set the initial value as the calculated total
          rules={[{ required: true, message: "Please provide the total" }]}
          hidden
        >
          <Input disabled />
        </Form.Item>

        <Form.Item<FieldType>
          label="Purchase Date"
          name="date"
          initialValue={new Date().toISOString()} // Set an initial value, you can customize this
          rules={[
            { required: true, message: "Please provide the purchase date" },
          ]}
          hidden
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Delivery Option"
          name="payment_method"
          initialValue="Thanh toán khi nhận hàng"
        >
          <Tabs onChange={(key) => setDeliveryOption(key)}>
            <TabPane tab="Thanh toán khi nhận hàng" key="pickup">
              Thanh toán khi nhận hàng
            </TabPane>
            <TabPane tab="Mã QR" key="qrCode"></TabPane>
          </Tabs>
        </Form.Item>
        {deliveryOption === "qrCode" && (
          <Form.Item
            label="QR Code"
            name="payment_method"
            rules={[
              {
                required: true,
                message: "Please scan the QR code.",
              },
            ]}
          >
            <img src={`${process.env.PUBLIC_URL}/images/maQr.png`} alt="" />
            {/* Add QR code scanning component or logic here */}
            {/* For example: <QRCodeScanner onScan={(data) => handleQRCodeScan(data)} /> */}
          </Form.Item>
        )}

        <div className="col-md-12 mt-5">
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              style={{ marginRight: 20 }}
              type="primary"
              danger
              htmlType="submit"
            >
              Đặt Hàng
            </Button>
            <Button
              type="primary"
              danger
              className="ml-2"
              onClick={() => navigate("/adminBill")}
            >
              Back
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default Bill;
