import React, { useEffect, useRef, useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import AuthContext
  from 'context/AuthProvider';
import ReactDOM from 'react-dom';




function Login() {

  //const inputRef = useRef<HTMLInputElement>(null);
  //const inputRef = React.useRef(null);

  const { auth, setAuth } = useContext(AuthContext);

  const userRef = useRef();
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [signInResult, setSignInResult] = useState();
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //const {loading, data, error} = useFatch();

  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  //맨 처음 뜰때만 사용자 ID 받는 곳에 포커스를 준다.
  /*
    useEffect(() => {
      inputRef.current.focus();
  }, [])
  */


  useEffect(() => {
    setErrMsg('');
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`아이디 : ${user}...비번 : ${pwd} / handleSubmit 처리할것`);
    //const {loading, data, error} = useFatch(LOGIN_URL, "POST", {ID:user, Password:pwd})

    await fetch(`http://localhost:8080/sign-api/sign-in`, {
      method: "POST", // 또는 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: user, password: pwd }),
    }).then(response => response.json())
      .then(data => setSignInResult(data))
      .then(console.log)
      .then(setLoading(false))
      .catch(setError);

    const accessToken = signInResult.token;
    //console.log("AccessToken : ");
    console.log(accessToken);

    const roles = signInResult.roles;
    //console.log("roles : ");
    console.log(roles);

    setAuth({ user, roles, accessToken });
    setUser('');
    setPwd('');
    setSuccess(true);
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
          <Button style={{ float: 'right', marginRight: 20 }} variant="primary" onClick={handleLogout} >
            Log Out
          </Button>
        </section>
      ) : (
        <>
          <Button style={{ float: 'right', marginRight: 20 }} variant="primary" onClick={handleShow} >
            Sign In
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Sign In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="username">Username:</Form.Label>
                  <Form.Control
                    type="text"
                    id="username"
                    placeholder="아이디"
                    //ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                  />
                  <Form.Label htmlFor="password">Password:</Form.Label>
                  <Form.Control
                    type="password"
                    id="password"
                    placeholder="비밀번호"
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
  
}

export default Login;