import React from "react";
import "./style.css";
import {useState , useEffect} from 'react';
import liff from '@line/liff';

function App() {//LINE_UserID	pictureUrl	displayname	os	language	email	phone
  const [userId, setUserId] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [os, setOS] = useState('');
  const [lang, setLang] = useState('');
  const [email , setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [sel1, setSel1] = useState('');//subject
  const [desc, setDesc] = useState('');
  //phone
  const [kemail , setKEmail] = useState('');
  const [whocall , setWhoCall] = useState('');
  const [sel3, setSel3] = useState('');//plant or warehouse location

  const [postIncident , setpostIncident] = useState('postIncident');

  const initLine = () => {
    liff.init({ liffId : "1656730001-Gv2VMYDo"}, () => {
      if (liff.isLoggedIn() ){
        runApp();
      }else{
        liff.login();
      }
    }, err => console.error(err));
  }

  const runApp = () =>{
    liff.getProfile().then(profile => {
      setDisplayName(profile.displayName);
      setPictureUrl(profile.pictureUrl);
      setUserId(profile.userId);
      setEmail(liff.getDecodedIDToken().email);
      setOS(liff.getOS());
      setLang(liff.getLanguage());
    }).catch(err => console.error(err));
  }

  useEffect(() => {
    initLine();
  },  []);

  function postData(){
    setpostIncident({"events": [{
        "type": "postIncident",
      }]
    });

    let data = {postIncident , userId , pictureUrl , displayName ,os , lang ,email , phone , sel1 , desc , kemail , whocall , sel3 }
    fetch("https://script.google.com/macros/s/AKfycbwiwxU_4a1pyN8O6LEDINFbcWch1jbdOrVpwwANgjjCEQAb1Dg/exec",{
      method: "POST",
      body: JSON.stringify(data)
    }).then(liff.closeWindow())
    //console.warn(phone , email , notes , userId);
  }

  return(
    <div className="App">
      <div class="card ">
        <div class="card-header">
          <div class="row">
            <div class="col-4"><img className="profile" src={pictureUrl} /></div>
            <div class="col-8"><p class="input-group mb-3">{displayName}</p>
    <p class="input-group mb-3">{email}</p></div>
          </div>
        </div>
        <div class="card-body">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="inputGroupSelect01">*ปัญหาด้านใด</label>
            </div>
            
            <select class="custom-select" id="inputGroupSelect01" required value={sel1} onChange={e=>setSel1(e.target.value)}>
              <option selected disabled value="">เลือก...</option>
              <option value="MoLogCanNotAccess">โปรแกรม MoLog เปิดใช้งานไม่ได้</option>
              <option value="MoLogCanNotPrint">โปรแกรม MoLog ปริ้นไม่ได้</option>
              <option value="MoLogIncorrectLogic">โปรแกรม MoLog แสดงข้อมูลผิดพลาด</option>
              <option value="MoLogNeedModReport">ปรับปรุงหน้าตารายงาน MoLog ให้หน่อย</option>
              <option value="MoLogElse">อื่นๆ</option>
              
            </select>
          </div>

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">อธิบายปัญหา</span>
            </div>
            <input type="text" value={desc} class="form-control" placeholder="อธิบายเพื่อให้เราเข้าใจปัญหา" aria-describedby="basic-addon1" onChange={(e) =>{setDesc(e.target.value)} }/>
          </div> 

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon2">*เบอร์โทรศัพท์</span>
            </div>
            <input type="tel" required value= {phone} class="form-control" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder="0812345678" aria-describedby="basic-addon2" onChange={(e) =>{setPhone(e.target.value)} }/>
          </div> 

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon3">ชื่อผู้แจ้ง</span>
            </div>
            <input type="text" value={whocall} class="form-control" placeholder="ชื่อเล่นชื่อจริงได้หมด" aria-describedby="basic-addon3" onChange={(e) =>{setWhoCall(e.target.value)} }/>
          </div> 

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon4">อีเมล์เพื่อติดต่อ</span>
            </div>
            <input type="email" value={kemail} class="form-control" placeholder="ที่เป็น kerrylogistics.com นะ" aria-describedby="basic-addon4" onChange={(e) =>{setKEmail(e.target.value)} }/>
          </div> 

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="inputGroupSelect03">*สำนักงานที่แจ้ง</label>
            </div>
            <select class="custom-select" id="inputGroupSelect03" required value={sel3} onChange={e=>setSel3(e.target.value)}>
              <option selected disabled value="">เลือก...</option>
              <option value="KLCLC">KLCLC</option>
              <option value="KRLC">KRLC</option>
              <option value="KELLOGG_ONSITE">Kerry ที่ Kellogg</option>
            </select>
          </div>




      





          <button type="button" class="btn btn-success" onClick={postData} >ส่งข้อมูล</button>
        </div> 
      </div>
    </div>
  );

}

 export default App;