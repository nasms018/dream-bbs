import React from 'react';
import Form from 'react-bootstrap/Form';

export default function AttachFile({ onFileSelect = f => f }) {
  //허용하는 파일 종류들
  const allowedFileTypes = "image/*, audio/*, video/*, application/x-zip-compressed, text/*";

  const handleChooseFile = (e) => {
    const files = e.target.files;
    if (!files) return;

    console.log(files);

    for (let i = 0; i < files.length; i++) {
      const { type } = files[i];
      console.log(type);
      const allowed = allowedFileTypes.split(", ");
      const isAllow = allowed.filter(allow => type.match(allow)).length > 0;
      console.log(isAllow);
      if (!isAllow)
        continue;
      //내용을 읽어서 동일 내용은 막는 장치
      let reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = (e) => {
        const fileContents = e.target.result;
        const header = fileContents.substring(0, 1000);
        onFileSelect(files[i], header);
      };
    }
  }

  return <Form.Control
    type="file"
    multiple
    id="fileInput"
    onChange={handleChooseFile}
    accept={allowedFileTypes}
  />
}
