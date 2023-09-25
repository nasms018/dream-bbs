import AppContext from "context/AppContextProvider";
import Footer from "layout/Footer";
import { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import ReactDOM from 'react-dom';
import { Link, Outlet } from 'react-router-dom';
import Col from 'react-bootstrap/Col';

export default function LoginModal() {
  const { auth, setAuth } = useContext(AppContext);
  const [signInResult, setSignInResult] = useState({});

  let userNickRef = useRef();
  let myInputRef = useRef()


  const [userNick, setUserNick] = useState('');
  const [pwd, setPwd] = useState('');


  const [errMsg, setErrMsg] = useState('');

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /*맨 처음 틀때 만.. 사용자 ID 받는 곳에 focus 준다. 
  Bootstrap Form.Control에서의 focus() 연구 필요
  useEffect(() => {
    userRef.current.focus();
  }, [])
  */
  //user, pwd의 변화 시 ErrMsg clearing
  useEffect(() => {
    setErrMsg('');
  }, [userNick, pwd])

  const onSubmitEnter = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };


  /*
  async await에 대한..
  */
  async function signIn() {
    const jsonData = await fetch(`/sign-api/sign-in`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userNick, password: pwd }),
    }).then(res => res.json());
    //console.log(jsonData);
    if (!jsonData.success)
      throw new Error(JSON.stringify(jsonData));
    return jsonData;
  }

  async function handleSubmit() {
    var signInResult;
    setUserNick('');
    setPwd('');

    try {
      signInResult = await signIn();
      console.log("success");
      console.log(signInResult);

      const accessToken = signInResult.token;
      const userId = signInResult.userId;
      const userName = signInResult.userName;
      const userNick = signInResult.userNick;
      const roles = signInResult.roles;

      setAuth({ accessToken, userId, userNick, userName, roles });
      setUserNick('');
      setPwd('');

      setShow(false);
      console.log(roles);
    } catch (error) {
      console.log("fail");
      console.log(error.message);
      setError(true);
      setErrMsg('Login Failed');
      setAuth({});
      setSignInResult({});
      alert("로그인 실패하였습니다.");
      setPwd('');
    };
  };


  const handleLogout = (e) => {
    e.preventDefault();
    setAuth({});
    setSignInResult({});

    setShow(false);
  }

  function setFocusOnUser() {
    ReactDOM.findDOMNode(userNickRef).focus();
  }

  return auth?.userNick ? (
    <section>
      
      <span style={{ float: 'right' }} className="badge bg-success text-wrap">{auth.userNick}님 로그인</span>
      
      <Button variant="dark" size="sm"
        onClick={handleLogout}>로그아웃</Button>
    </section>
  ) : (
    <>
      <Button variant="primary" style={{ float: 'right', marginRight: '10px' }}
        onClick={handleShow}>
        로그인
      </Button>
      <Link className='badge bg-warning text-wrap' to="/sign-api/sign-in">회원가입</Link>
      <Modal show={show} onHide={handleClose} onShow={setFocusOnUser}>
        <Modal.Header closeButton>
          {/*error ? <Form.Label>{errMsg}</Form.Label>:""*/}
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" >
              <Form.Label htmlFor="userNick">userNick:</Form.Label>
              <Form.Control
                ref={c => userNickRef = c}
                type="text"
                id="userNick"
                inputRef={userNickRef}
                placeholder='ID를 입력하세요'
                autoComplete="off"
                onChange={(e) => setUserNick(e.target.value)}
                value={userNick}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="password">Password:</Form.Label>
              <Form.Control
                type="password"
                id="password"
                placeholder='Password를 입력하세요'
                onChange={(e) => setPwd(e.target.value)}
                onKeyPress={onSubmitEnter}
                value={pwd}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Sign In
          </Button>
          <Button variant="primary" onClick={setFocusOnUser}>
            Focus
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )


}




