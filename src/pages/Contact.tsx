import React from "react";
import { useAddContactMutation } from "../api/contact";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [addContact] = useAddContactMutation();
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    addContact(values)
      .unwrap()
      .then(() => {
        return navigate("/");
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  type FieldType = {
    name: string;
    phone: number;
    email: string;
    content: string;
  };
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="font-bold text-2xl mb-4">Mời bạn đóng góp ý kiến</h2>
      <img
        style={{ maxWidth: 200 }}
        src={`${process.env.PUBLIC_URL}/images/phone.jpg`}
        alt="description"
        className="w-full h-48 object-cover mb-4"
      />
      <Form
        name="basic"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 25 }}
        style={{ maxWidth: 800 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {/* Thêm các ô liên hệ khác vào đây */}

        <Form.Item<FieldType>
          label="Họ Tên"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập Họ và Tên" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Số điện thoại"
          name="phone"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (/^\d+$/.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject("Số điện thoại phải là số");
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Bạn hãy nhập Email",
            },
            {
              type: "email",
              message: "Email không hợp lệ",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Ý kiến"
          name="content"
          rules={[{ min: 10, message: "Đánh giá phải có ít nhất 10 ký tự" }]}
        >
          <Input />
          {/* Sử dụng Input.TextArea cho ô đánh giá. */}
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            style={{ marginTop: 20, marginLeft: 20 }}
            type="primary"
            htmlType="submit"
          >
            Gửi ý kiến
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Contact;
