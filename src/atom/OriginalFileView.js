import axios from "api/axios";
import { useState } from 'react';
import { Form } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
export default function OriginalFileView({imgUrl, afdto}) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [originalFile, setOriginalFile] = useState();

// uri={`/anonymous/displayThumbnail`} body={afdto} renderSuccess={renderImg}
// onHide={handleClose} onShow={setFocusOnUser}
  const buildUri = (blob) => {
    const originalFile = new File([blob.data], afdto.originalFilePureName, {type: afdto.contentType});
    setOriginalFile((window.URL || window.webkitURL).createObjectURL(originalFile));
    handleShow();
  }

  const getOriginalFile = () =>{
    axios.post(`/anonymous/getOriginalFile`, afdto,
      {
          headers: {"Content-Type": "application/json"},
          responseType: "blob"
      }).then(buildUri)
      .catch(error=>{
        console.log("getOriginalFile에러 : "+ error);
      });
     
  }

  return (<>
      <img src={imgUrl}  width="100px" height="100px" onClick={(e)=>getOriginalFile()}/>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton  onHide={handleClose}>
        <Modal.Title>{afdto.originalFilePureName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" >
              {afdto.contentType ==="image"?<img src={originalFile}/>:
              afdto.contentType ==="video"?<video src={originalFile} controls autoPlay/>:""
              }
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
      </>)

}




