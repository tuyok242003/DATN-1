import { useGetBillByIdQuery, useUpdateBillMutation } from "../api/bill";
import { Button, Form, Input, Skeleton, Select } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BillEdit = () => {
  const { idBill } = useParams<{ idBill: string }>();
  const { data: billData } = useGetBillByIdQuery(idBill || "");
  const [updateBill] = useUpdateBillMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    form.setFieldsValue({
      address: billData?.address,
      status: billData?.status,
      date: billData?.date,
      total: billData?.total,
      phone: billData?.phone,
      payment_method: billData?.payment_method,
      notes: billData?.notes,
    });
  }, [billData]);

  const onFinish = (values: any) => {
    updateBill({ ...values, id: idBill })
      .unwrap()
      .then(() => {
        return navigate("/Hisbill");
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  type FieldType = {
    status: string;
    address: string;
    date: string;
    total: number;
    phone: number;
    payment_method: string;
    notes: string;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="font-bold text-2xl mb-4">Cập nhật sản phẩm : Bài viết</h2>
      <Skeleton />
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="address"
          name="address"
          rules={[
            { required: true, message: "Vui lòng nhập dia chi" },
            { min: 3, message: "Ít nhất 3 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Trạng thái"
          name="status"
          rules={[
            { required: true, message: "Vui lòng chọn trạng thái đơn hàng" },
          ]}
        >
          <Select>
            <Select.Option value="waiting_payment">
              Chờ thanh toán
            </Select.Option>

            <Select.Option value="shipping">Vận chuyển</Select.Option>
            <Select.Option value="waiting_delivery">
              Chờ giao hàng
            </Select.Option>
            <Select.Option value="completed">Hoàn thành</Select.Option>
            <Select.Option value="cancelled">Đã huỷ</Select.Option>
            <Select.Option value="refunded">Trả hàng / Hoàn tiền</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item<FieldType>
          label="phone"
          name="phone"
          rules={[
            { required: true, message: "Vui lòng nhập số điênj thoại" },
            { min: 3, message: "Ít nhất 3 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="payment_method"
          name="payment_method"
          rules={[
            { required: true, message: "Vui lòng nhập hinh thuc thanh toan" },
            { min: 3, message: "Ít nhất 3 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="notes"
          name="notes"
          rules={[
            { required: true, message: "Vui lòng nhập notes" },
            { min: 3, message: "Ít nhất 3 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" danger htmlType="submit">
            Submit
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
      </Form>
    </div>
  );
};

export default BillEdit;
