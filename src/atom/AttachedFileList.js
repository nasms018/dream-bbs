import axios from 'api/axios';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import AttachFile from './AttachFile';

export default function AttachFileList({ writer, listAttach, setListAttach }) {
  const thumbnailRequestTarget = ["video", "image"];
  //검사 장치
  const [contentFilter, setContentFilter] = useState([]);
  //지금까지 선택한 파일 기억장치. 업로드 용도
  const [uploadTargets, setUploadTargets] = useState([]);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [imgSrc, setImgSrc] =useState([]);

  let justUrl = [];
  function onFileSelect(finedAndHeaders) {
    let files = [], headers = [];
    finedAndHeaders.forEach(({ file, header }) => {
      if (!contentFilter.includes(header) && !headers.includes(header)) {
        files.push(file);
        headers.push(header);
      }
    });
    setContentFilter([...contentFilter, ...headers]);
    setUploadTargets([...uploadTargets, ...files]);
  }

  //지정된 파일들을 axios로 Server로 올리기하면 썸네일로 첨부파일들을 목록으로 보여준다.
  const handleAttach = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // 동일 key에 여러개 할당 가능?
    Array.from(uploadTargets).forEach((file) => {
      formData.append("attachFiles", file);
    });
    try {
      const response = await axios.post(`/upload_multi`, formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": `${writer.accessToken}`
          }
        });
      alert("성공");
      console.log(response.data);
      response.data.map( (afdto) => {
        if (thumbnailRequestTarget.includes(afdto.contentType))
          loadThumbnail(afdto);
      });

      setAttachedFiles([...attachedFiles, ...justUrl]);
      setListAttach([...listAttach, ...response.data]);
    } catch (error) {
      alert("돌아가");
      console.log(error)
    }
    setUploadTargets([]);
  }

  const loadThumbnail = async (afdto) => {
    //originalFilePureName
    console.log(afdto);
     
      try {
        const blob = axios.post(`/anonymous/displayThumbnail`, afdto,
          {
            headers: { "Content-Type": "application/json" }, responseType: "blob"
          }).then(res => res.data);
          console.log(blob);
          const thumbFile = new File([blob], "image", { type: blob.type });
          const imgUrl = URL.createObjectURL(thumbFile);
          setImgSrc(imgUrl);
      } catch (error) {
        console.log(error)
      }
    
  }


  console.log("그림그리는 중", attachedFiles);

  return <Form.Group className="mb-3" >
    <Form.Label htmlFor="username">첨부파일</Form.Label>
    <img src={imgSrc} />
    <AttachFile onFileSelect={onFileSelect} />
    {attachedFiles.map((af) => <sapn><img src={imgSrc} alt="|"  width='100px' height='100px' /></sapn>)}
    <Button variant="primary" onClick={handleAttach}>
      첨부
    </Button>
  </Form.Group>

}
