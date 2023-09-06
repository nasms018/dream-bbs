import { useRef, useState, useEffect, useContext } from "react";

import AppContext from "context/AppContextProvider";
import axios from 'api/axios';
import { Form, Button } from "react-bootstrap";

//const USER_REGEX = ""; // /^[A-z][A-z0-9-_]{3,23}$/;
//const PWD_REGEX = ""; // /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
//const REGISTER_URL = '/register';

const Register = () => {
  const { codeList } = useContext(AppContext);


  const [userName, setUserName] = useState('');
  const [userNick, setUserNick] = useState('');
  const [pwd, setPwd] = useState('');
  const [matchPwd, setMatchPwd] = useState('');

  const [userSex, setUserSex] = useState('');


  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);


  useEffect(() => {
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('');
  }, [userName, pwd, matchPwd])

  const checkCPValidity = (cpType, inValue) => {
    if (cpType.validationRe) {
      console.log("aaaa" + new RegExp(cpType.validationRe).test(inValue))
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    try {
      const response = await axios.post("/party/anonymous/createMember",
        JSON.stringify({
          organization: { id: "0000" },
          person: {
            name: userName,
            nick: userNick,
            pwd: pwd,
            sex: true,
            listContactPoint: [{ cpType: "hand phone number" }, { cpVal: "000-0999-8888" },
            { cpType: "home address" }, { cpVal: "구로1" },
            { cpType: "email address" }, { cpVal: "aa@abc.com" }]
          }
        }),
        {
          headers: { 'Content-Type': 'application/json' }
          //withCredentials: true
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response))
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUserName('');
      setPwd('');
      setMatchPwd('');
    } catch (err) {

      setErrMsg('Registration Failed')


    }
  }

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="/">Sign In</a>
          </p>
        </section>
      ) : (
        <>
          <Form>
            <Form.Group className="mb-3" >
              <Form.Label htmlFor="username">이름:</Form.Label>
              <Form.Control
                //ref={c => userRef = c}
                type="text"
                id="username"
                placeholder='이름을 입력하세요'
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="usernick">사용자 닉:</Form.Label>
              <Form.Control
                type="text"
                id="usernick"
                placeholder='사용자 닉을 입력하세요'
                onChange={(e) => setUserNick(e.target.value)}
                value={userNick}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="userpwd">암호:</Form.Label>
              <Form.Control
                type="password"
                id="userpwd"
                placeholder='사용자 닉을 입력하세요'
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              />
              <Form.Label htmlFor="usermatchPwd">암호확인:</Form.Label>
              <Form.Control
                type="password"
                id="usermatchPwd"
                placeholder='사용자 닉을 입력하세요'
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" >
		<Form.Label htmlFor="userSex">성별:</Form.Label>
        <div key={`inline-radio`} className="mb-3">
          <Form.Check
            inline
            label="남성"
            name="userSex"
            type="radio"
            id={`inline-radio-1`}
          />
          <Form.Check
            inline
            label="여성"
            name="userSex"
            type="radio"
            id={`inline-radio-1`}
          />
        </div>
	</Form.Group>


            <Form.Group className="mb-3" >
              {codeList.map((cpType) => (<>
                <Form.Label htmlFor={cpType.codeVal}>{cpType.codeVal}:</Form.Label>
                <Form.Control
                  type="text"
                  id={cpType.codeVal}
                  onChange={(e) => checkCPValidity(cpType, e.target.value)}
                />
              </>))}
            </Form.Group>

          </Form>

        </>
      )}
    </>
  )
}

export default Register
