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
  const [validMatch, setValidMatch] = useState(false);

  const [userSex, setUserSex] = useState();
  const [listCP, setListCP] = useState(new Map());


  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('');
  }, [userName, pwd, matchPwd])

  const checkCPValidity = (cpType, inValue) => {
    console.log(cpType);
    console.log(inValue);
    if (cpType.validationRe && !(new RegExp(cpType.validationRe).test(inValue))) {
      return;
    }
    //복제하고, 중복되지 않게 값 추가, 기억시키기

    listCP.set(cpType, inValue)
    setListCP(listCP);




  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let list =[]
    for (let [key, value] of listCP) {

      list.push({cpType:key, cpVal:value});
      
    }

    const bodyData = {
      organization: { id: "0000" },
      name: userName,
      nick: userNick,
      pwd: pwd,
      sex: userSex,
      listContactPoint: list
      
    };
    console.log(list);
    console.log(JSON.stringify(list));


    try {
      const response = await axios.post("/party/anonymous/createMember",
        JSON.stringify(bodyData),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      console.log(response?.bodyData);
      console.log(JSON.stringify(response))
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this

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
                placeholder='비밀번호를 입력하세요'
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              />
              <Form.Label htmlFor="usermatchPwd">암호확인:</Form.Label>
              <Form.Control
                type="password"
                id="usermatchPwd"
                placeholder='비밀번호를 확인하세요'
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
                  onChange={(e) => checkCPValidity(cpType.codeVal, e.target.value)}
                />
              </>))}
            </Form.Group>

          </Form>
          <Button variant="primary" onClick={handleSubmit}>
            Sign up
          </Button>
        </>
      )}
    </>
  )
}

export default Register
