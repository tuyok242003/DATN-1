import React, { useState } from "react";
import { useAddPostMutation } from "../api/post";
import { Form, Input, Button, Upload, message } from "antd";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";

const PostAdd = () => {
  const [addPost] = useAddPostMutation();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<any[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const onFinish = (values: any) => {
    // Add the image URL to the values before submitting
    values.img = imageUrl;

    addPost(values)
      .unwrap()
      .then(() => {
        return navigate("/admin/post");
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Ảnh phải có định dạng JPEG/PNG!");
    }
    return isJpgOrPng;
  };

  const handleChange = (info: any) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      // Set the image URL after successful upload
      setImageUrl(info.file.response.url);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
    setFileList([...info.fileList]);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="font-bold text-2xl mb-4">Thêm Bài viết</h2>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Nội dung bài viết"
          name="content"
          rules={[
            { required: true, message: "Vui lòng nhập nội dung bài viết" },
            { min: 6, message: "Ít nhất 6 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Ảnh"
          name="img"
          rules={[{ required: true, message: "Vui lòng chọn ảnh" }]}
        >
          <Upload
            name="img"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={{ showRemoveIcon: false }}
            action="/api/upload" // Replace with your server endpoint for file upload
            beforeUpload={beforeUpload}
            onChange={handleChange}
            fileList={fileList}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
              </div>
            )}
          </Upload>
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

export default PostAdd;
