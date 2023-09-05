import { useRef, useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import AuthContext from "context/AuthProvider";

function Login() {
  const { auth, setAuth } = useContext(AuthContext);
  const userRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [signInResult, setSignInResult] = useState({});
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
  const handleSubmit = (e) => {
    setSignInResult({});
    e.preventDefault();
    console.log(`${user}... ${pwd}  handleSubmit 처리할 것`);

    fetch(`http://localhost:8080/sign-api/sign-in`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: user, password: pwd }),
    }).then(response => response.json())
    .then(data => {console.log("............. ");console.log(data); return (data=>setSignInResult(data));})
    //.then(data => data.code === 0 ? setSignInResult(data) : console.log("실패" + data.code))

      .then(setLoading(false));

    
    
    /*
    .then(response => {
      console.log(response);
      console.log(response.json);
      response.json()})
      .then(data=>setSignInResult(data))
      .then(setLoading(false));
*/
    console.log(signInResult);
    const accessToken = signInResult.token;
    const roles = signInResult.roles;

    setAuth({ user, roles, accessToken });
    setUser('');
    setPwd('');
    if(accessToken){
      setSuccess(true);
    } else {
      setSuccess(false);
    }
    setShow(false);

  }

  const handleLogout = (e) => {
    e.preventDefault();
    setAuth({});
    setSignInResult({});
    setSuccess(false);
    setShow(false);
  }

  return success ? (
    <section>
      <h4>{auth.user}님 환영합니다</h4>
      <br />
      <p>
        <a href="/">Go to Home</a>
      </p>
      <Button variant="primary" style={{ float: 'right', marginRight: '100px' }}
        onClick={handleLogout}>나가기</Button>
    </section>
  ) : (
    <>
      <Button variant="primary" style={{ float: 'right', marginRight: '100px' }}
        onClick={handleShow}>
        로그인
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {error ? <Form.Label>{errMsg}</Form.Label> : ""}
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" >
              <Form.Label htmlFor="username">Username:</Form.Label>
              <Form.Control
                type="text"
                id="username"
                inputRef={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label htmlFor="password">Password:</Form.Label>
              <Form.Control
                type="password"
                id="password"
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
        </Modal.Footer>
      </Modal>
    </>
  )
    ;
}

export default Login;