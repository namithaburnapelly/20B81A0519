import logo from './logo.svg';
import './App.css';
import axios from "axios"
import { useEffect, useState } from 'react';

function App() {

  const [trainData, setTrainData] = useState([])

  const d = {
    "companyName": "Go Trains",
    "clientID": "90e8eb4d-7437-4d71-ad32-e60203041e75",
    "ownerName": "Namitha",
    "ownerEmail": "namitha.nja@gmail.com",
    "rollno": "20B81A0519",
    "clientSecret": "GaZQntPiyJbzjrRN"
  }

  useEffect(() => {
    async function call() {

      await fetch('http://20.244.56.144/train/auth', {
        method: "POST",
        body: JSON.stringify(d)
      }).then((data) => {
        return data.json()
      }).then((p) => {
        var { access_token } = p

        var head = { 'Authorization': `Bearer ${access_token}` }

        fetch('http://20.244.56.144/train/trains', {
          method: "GET",
          headers: head
        }).then((data) => {
          return data.json()
        }).then((y) => {
          // console.log(y)
          setTrainData(y)
        })
      })
    }
    call()
  }, [])



  return (
    <>
      <ul>
        {trainData.map(item => {
          var { trainName } = item
          console.log(trainName)
          return <li>{
            trainName
          }</li>;
        })}
      </ul>
    </>
  );
}

export default App;
