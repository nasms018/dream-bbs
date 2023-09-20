import React from 'react';
import Form from 'react-bootstrap/Form';

export default function AttachFile({ onFileSelect = f => f }) {
  //허용하는 파일 종류들
  const allowedFileTypes = "image/*, audio/*, video/*, application/x-zip-compressed, text/*";

  const handleChooseFile = (e) => {
    const allowedTypeReg = allowedFileTypes.split(", ")
    //허용목록 파일들
    const 허용목록파일들 = Array.from(e.target.files).filter((file)=>{
      const { type } = file;
      //허용 목록 중 하나 이상 걸렸니
      return allowedTypeReg.filter(regExp => type.match(regExp)).length > 0;
    });
    let collectionOfFileAndHeader = []; //파일과 헤더 모음집
    허용목록파일들.forEach((file)=>{
      console.log(file.name + "파일을 readAsDataURL로 내용 읽기 요청합니다.");
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        //console.log(file.name+"파일 내용 load 이후에..");
        const header = e.target.result.substring(0, 1000);
        
        collectionOfFileAndHeader.push({file, header});
        console.log("정보확인"+ 허용목록파일들.length + "개 중 "+ collectionOfFileAndHeader.length+"개 허용");
        if(허용목록파일들.length === collectionOfFileAndHeader.length){
          //다 모았으면 parent로 전달
          onFileSelect(collectionOfFileAndHeader);
        }
      }
    })
  }

  return <Form.Control
    type="file"
    multiple
    id="fileInput"
    onChange={handleChooseFile}
    accept={allowedFileTypes}
  />
}
