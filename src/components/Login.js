import APPContext from "context/AppContextProvider";
import { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

export default function Login() {
  const { auth, setAuth } = useContext(APPContext);
  const [signInResult, setSignInResult] = useState({});

  let userRef = useRef();
  let myInputRef = useRef()


  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');




  const [success, setSuccess] = useState(false);
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
  }, [user, pwd])

  /*
  async await에 대한..
  */
  async function signIn() {
    const jsonData = await fetch(`/sign-api/sign-in`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: user, password: pwd }),
    }).then(res => res.json());
    console.log(jsonData);
    if (!jsonData.success)
      throw new Error(JSON.stringify(jsonData));
    return jsonData;
  }

  async function handleSubmit() {
    var signInResult;
    setUser('');
    setPwd('');

    try {
      signInResult = await signIn();
      console.log("success");
      console.log(signInResult);

      const accessToken = signInResult.token;
      const roles = signInResult.roles;
      const userId = signInResult.userId;
      const userNick = signInResult.userNick;

      setAuth({ user, roles, accessToken, userId, userNick});
      setUser('');
      setPwd('');
      setSuccess(true);
      setShow(false);
      console.log(roles);
    } catch (error) {
      console.log("fail");
      console.log(error.message);
      setError(true);
      setErrMsg('Login Failed');
      setAuth();
      setSignInResult();
      setSuccess(false);

      alert("아이디나 비밀번호가 틀림")

      setPwd('');
    };
  };


  const handleLogout = (e) => {
    e.preventDefault();
    setAuth({});
    setSignInResult({});
    setSuccess(false);
    setShow(false);
  }

  function setFocusOnUser() {
    ReactDOM.findDOMNode(userRef).focus();
  }

  return success ? (
    <section>
      <Button variant="primary" style={{ float: 'right', marginRight: '100px' }}
        onClick={handleLogout}>로그아웃</Button>
      <h4>{auth.user}님 환영합니다</h4>
      <br />
      <p>
        <a href="#">Go to Home</a>
      </p>
    </section>
  ) : (
    <>
      <Button variant="primary" style={{ float: 'right', marginRight: '100px' }}
        onClick={handleShow}>
        로그인
      </Button>
      <Link className='badge bg-warning text-wrap' to="/sign-up">회원가입</Link>
      <Modal show={show} onHide={handleClose} onShow={setFocusOnUser}>
        <Modal.Header closeButton>
          {/*error ? <Form.Label>{errMsg}</Form.Label>:""*/}
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" >
              <Form.Label htmlFor="username">Username:</Form.Label>
              <Form.Control
                ref={c => userRef = c}
                type="text"
                id="username"
                inputRef={userRef}
                placeholder='ID를 입력하세요'
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
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




