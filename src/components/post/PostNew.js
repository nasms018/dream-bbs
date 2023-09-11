import axios from 'api/axios';
import AppContext from "context/AppContextProvider";
import { useContext, useEffect, useState } from "react";
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export default function PostList() {
  const { boardId } = useParams();  // APP에 있는 :id 와 이름 통일  //http://localhost:8080/post/anonymous/listAll/000n
  const { auth: writer } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [hasAllContents, setHasAllContents] = useState()
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    setHasAllContents(title.trim() ? content.trim() : false);
    console.log(title);
    console.log(content);
  }, [title, content])

  const handleSubmit = async (e) => {
    e.preventDefault()


    const bodyData = {
      BoardVO: { id: boardId }, writer: { id: writer.userId, nick:writer.userNick },
      title: title.trim(), content: content.trim()
    }
    if(!hasAllContents)
      return;

    console.log(bodyData);
    console.log(JSON.stringify(bodyData));


    try {
      const response = await axios.post(
        "/post/anonymous/createPost",
        bodyData,
        {
          headers: { 
          "x-auth-token" : `${writer.accessToken}`  //Bearer
        }
        }
      );
      console.log(response?.bodyData);
      console.log(JSON.stringify(response))
      
      //clear state and controlled inputs
      //need value attrib on inputs for this

    } catch (err) {
      setErrMsg('Registration Failed')
    }
  }


  return <>

    <Form>
      <h4>글쓰기</h4>
      <Form.Group className="mb-3" >
        <Form.Label htmlFor="username">제목:</Form.Label>
        <Form.Control
          type="text"
          id="title"
          placeholder='타이틀을 입력하세요'
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label htmlFor="username">내용:</Form.Label>
        <Form.Control
          as="textarea"
          id="contents"
          placeholder='내용을 입력하세요'
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </Form.Group>
    </Form>
    <Button variant="primary" onClick={handleSubmit} disabled={!hasAllContents}>
      등록
    </Button>
  </>

}