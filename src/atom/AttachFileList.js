import React, { useState } from 'react'
import AttachFile from './AttachFile';
import { Button } from 'react-bootstrap';


export default function AttachFileList() {
  //검사 장치
  const [contentFilter, setContentFilter] = useState([]);
  //지금까지 선택한 파일 기억장치. 업로드 용도
  const [attachedFile, setAttachedFile] = useState([]);
  function onFileSelect(file, header) {

    if (!contentFilter.includes(header)) {
      setContentFilter([...contentFilter, header]);
      setAttachedFile([...attachedFile, file]);
    }
    console.log(contentFilter.includes(header));
  }
  //지정된 파일들을 axios로 Server로 올리기하면 썸네일로 첨부파일들을 목록으로 보여준다.
  const handleAttach = (e) => {

  }

  return <>{/*[files.map((aFile)=><span>{aFile.name}</span>)]*/}
    <AttachFile onFileSelect={onFileSelect} />
    {attachedFile.map(af => <span>{af.name}|</span>)}
    <Button variant="primary" onClick={handleAttach}>
      첨부
    </Button>
  </>
}
