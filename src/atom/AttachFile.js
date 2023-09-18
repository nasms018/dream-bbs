import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import AttachFileList from './AttachFileList';


export default function AttachFile({ onFileSelect = f => f }) {
  //허용하는 파일 종류들
  const allowedFileTypes = "image/*, audio/*, video/*, application/x-zip-compressed, application/pdf, text/*";


  const handleChooseFile = (e) => {
    e.preventDefault();
    const files = e.target.files;
    if (!files) return;
    for (let i = 0; i < files.length; i++) {
      const { type } = files[i];
      const allowed = allowedFileTypes.split(", ");

      const isAllow = allowed.filter(allow => type.match(allow)) > 0;
      if (!isAllow) continue;
      //내용을 읽어서 동일 내용은 막는 장치
      let reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = (e) => {
        const fileContents = e.target.value;
        const header = fileContents.substring(0, 1000);
        console.log(header);
        onFileSelect(files[i], header);
      }
    };
  }
  return (<Form.Group className="mb-3" >
    <Form.Label htmlFor="username">첨부파일:</Form.Label>
    <Form.Control
      type='file'
      id="fileInput"
      multiple
      accept={allowedFileTypes}
      onChange={handleChooseFile}
    />
  </Form.Group>
  )
}
