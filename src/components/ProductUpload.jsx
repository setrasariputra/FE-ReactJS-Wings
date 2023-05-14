import React, { useState } from "react";
import axios from "../config.axios";

export default function ProductUpload(props) {
  const productSelected = props.product_selected;
  const accept = "image/jpeg, image/png, image/gif";
  const type = "product_image";
  const url_upload = "/api/v1/product/image/store";
  const [uploadProgressFile, setUploadProgressFile] = useState("");

  function onFileSelected(event) {
    const selectedFile = event.target.files[0];
    onUpload(selectedFile);
  }

  async function onUpload(selectedFile) {
    const fd = new FormData();
    fd.append("file_upload", selectedFile);
    fd.append("type", type);
    axios
      .post(url_upload + "/" + productSelected.id, fd, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        onUploadProgress: (uploadEvent) => {
          let uploadProgress =
            Math.round((uploadEvent.loaded / uploadEvent.total) * 100) + "%";
          setUploadProgressFile(uploadProgress);

          console.log("Upload Progress: " + uploadProgressFile);
        },
      })
      .then((res) => {
        console.log(res.data);
        if(res.data.status == 'success') {
            props.onSuccessUpload(true)
        }
      },(err) => {
        console.log(err)
      });
  }
  return (
    <div>
      <div className="my-4">
        <label className="block">
          <span className="sr-only">Choose image</span>
          <input
            type="file"
            accept={accept}
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
            onChange={onFileSelected}
          />
        </label>
      </div>
    </div>
  );
}
