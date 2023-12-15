import { useGetPostByIdQuery, useUpdatePostMutation } from "../api/post";
import { Button, Form, Input, Skeleton } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PostEdit = () => {
  const { idPost } = useParams<{ idPost: string }>();
  const { data: postData } = useGetPostByIdQuery(idPost || "");
  const [updatePost] = useUpdatePostMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    form.setFieldsValue({
      content: postData?.content,
      img: postData?.img,
    });
  }, [postData]);

  const onFinish = (values: any) => {
    updatePost({ ...values, id: idPost })
      .unwrap()
      .then(() => {
        return navigate("/admin/post");
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  type FieldType = {
    name: string;
    price: number;
    image: string;
    description: string;
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
          label="content"
          name="content"
          rules={[
            { required: true, message: "Vui lòng nhập nội dung bài viết" },
            { min: 3, message: "Ít nhất 3 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Post image"
          name="img"
          rules={[
            { required: true, message: "Bạn hãy nhập dữ liệu mới của Image" },
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
            onClick={() => navigate("/admin/post")}
          >
            Back
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PostEdit;
