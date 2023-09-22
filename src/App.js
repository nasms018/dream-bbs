import './App.css';

import BBSRouter from 'router/BBSRouter';

import {useContext } from 'react';
import AppContext from 'context/AppContextProvider';
import axios from 'api/axios';

const getCodeList = async (setCodeList) => {
  const response = await axios.get("/framework/anonymous/listAllContactPointType");
  setCodeList(response?.data);
}
/*
async function fn() {
  let text = '하나';
  text = text + await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('둘');
    }, 2000);
  });
  text += '셋';
  console.log(text + '넷');
  return text + '넷';
}
console.log(fn().then(a=>{console.log(a); return a +"asdf"}))
*/


function App() {
  const { codeList, setCodeList } = useContext(AppContext);
  if (!codeList) {
    getCodeList(setCodeList);
  }

  return (
    <BBSRouter/>
  )
}

export default App;
