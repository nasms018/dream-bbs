import axios from 'api/axios';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import AttachFile from './AttachFile';

export default function AttachFileList({ writer }) {
  const thumbnailRequestTarget = ["video", "image"];
  //검사 장치
  const [contentFilter, setContentFilter] = useState([]);
  //지금까지 선택한 파일 기억장치. 업로드 용도
  const [attachedFiles, setAttachedFile] = useState([]);
  const [썸네일들, set썸네일들] = useState([]);
  const 썸네일이미지목록 = [];
  let 로드해야할개수 = 0;
  const [attachedFileUrls, setAttachedFileUrls] = useState([]);
  const justUrl = [];

  function onFileSelect(finedAndHeaders) {
    let files = [], headers = [];
    finedAndHeaders.forEach(({ file, header }) => {
      if (!contentFilter.includes(header) && !headers.includes(header)) {
        files.push(file);
        headers.push(header);
      }
    });
    setContentFilter([...contentFilter, ...headers]);
    setAttachedFile([...attachedFiles, ...files]);
  }

  //지정된 파일들을 axios로 Server로 올리기하면 썸네일로 첨부파일들을 목록으로 보여준다.
  const handleAttach = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // 동일 key에 여러개 할당 가능?
    Array.from(attachedFiles).forEach((file) => {
      console.log(file);
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
      response.data.forEach(afdto=>{
        if(thumbnailRequestTarget.includes(afdto.contentType))
        justUrl.push(afdto.jsonRepresentation);

      });

      setAttachedFileUrls([...attachedFileUrls, ...justUrl]);
      
/*
      Array.from(response.data).forEach((attachFileDTO) => {
        if (thumbnailRequestTarget.includes(attachFileDTO.contentType)) {
          로드해야할개수++;
          썸네일파일가져오기(attachFileDTO);
        }
      });
      */
    } catch (error) {
      alert("돌아가");
      console.log(error);
    }

  }

  const 썸네일파일가져오기 = async (attachFileDTO) => {
    try {
      const response = await axios.post(`/displayThumbnail`, attachFileDTO,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": `${writer.accessToken}`
          }
        });


      var blob = new Blob([new ArrayBuffer(response.data)], { type: response.headers["content-type"] });
      var imageURL = URL.createObjectURL(blob);
      console.log(blob);
      console.log(imageURL);
      썸네일이미지목록.push(imageURL);
      console.log("로드해야할개수 : " + 로드해야할개수 + "썸네일이미지목록.length : " + 썸네일이미지목록.length);
      if (로드해야할개수 === 썸네일이미지목록.length) {
        set썸네일들([...썸네일들, ...썸네일이미지목록]);
      }

      console.log("썸네일 파일 정보 읽기 성공");
      //console.log(response.headers['content-type']); 
      //console.log(response.data);
    } catch (error) {
      console.log("썸네일 파일 정보 읽기 실패");
      console.log(error);
    }
  }

  console.log("그림그리는 중");

  return <Form.Group className="mb-3" >
    <Form.Label htmlFor="username">첨부파일</Form.Label>
    {attachedFileUrls.map(queryString => <img src={`/displayThumbnail?attachInfo=${queryString}`} alt="|" />)}
    {/*attachedFiles.map(af=><span>{af.name} | </span>) */}
    <AttachFile onFileSelect={onFileSelect} />
    <Button variant="primary" onClick={handleAttach}>
      첨부
    </Button>
  </Form.Group>

}
