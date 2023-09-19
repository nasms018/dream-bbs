import axios from 'api/axios';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import AttachFile from './AttachFile';

export default function AttachFileList({ writer }) {
  //검사 장치
  const [contentFilter, setContentFilter] = useState([]);
  //지금까지 선택한 파일 기억장치. 업로드 용도
  const [attachedFiles, setAttachedFile] = useState([]);
  function onFileSelect(file, header) {
    console.log(attachedFiles.length);
    if (!contentFilter.includes(header)) {
      setContentFilter([...contentFilter, header]);
      setAttachedFile([...attachedFiles, file]);
    }
    console.log(contentFilter.includes(header));
  }
  //지정된 파일들을 axios로 Server로 올리기하면 썸네일로 첨부파일들을 목록으로 보여준다.
  const handleAttach = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    
    // 동일 key에 여러개 할당 가능?
    Array.from(attachedFiles).forEach((file) => {
      formData.append("attachFiles", file);
    });

    try {
      const response = await axios.post(`/upload_multi`, formData, 
        {headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": `${writer.accessToken}`}});
      alert("성공");
      console.log(response.data);
    } catch (error) {
      alert("돌아가");
      console.log(error);
    }
  }

  return <Form.Group className="mb-3" >
    <Form.Label htmlFor="username">첨부파일 : </Form.Label>
    {attachedFiles.map(af=><span> | {af.name}</span>) }
    <AttachFile onFileSelect={onFileSelect} />
    <Button variant="primary" onClick={handleAttach}>
      첨부
    </Button>
  </Form.Group>
  
}
