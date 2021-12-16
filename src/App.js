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

  const [sel1, setSel1] = useState('');
  const [sel2, setSel2] = useState('');
  const [sel3, setSel3] = useState('');
  const [sel4, setSel4] = useState('');
  const [notes, setNotes] = useState('');
  const [appoidate , setAppoiDate] = useState('');

  const initLine = () => {
    liff.init({ liffId : "1655945045-NpP9E2aG"}, () => {
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
    let data = {userId , pictureUrl , displayName ,os , lang ,email , phone , sel1 , sel2 , sel3 , sel4, notes , appoidate}
    fetch("https://script.google.com/macros/s/AKfycbyyTEHQ_uZhQQwFwy7k9mFkWkUWlJ7KQlbdvRf5mMDXpcnxtWci/exec",{
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
              <label class="input-group-text" for="inputGroupSelect01">*รุ่นรถยนต์ของท่าน</label>
            </div>
            
            <select class="custom-select" id="inputGroupSelect01" required value={sel1} onChange={e=>setSel1(e.target.value)}>
              <option selected disabled value="">เลือก...</option>
              <option value="mazda2_sedan">Mazda 2 4 ประตู</option>
              <option value="mazda2_hatchback">Mazda 2 5 ประตู</option>
              <option value="mazda3_sedan">Mazda 3 4 ประตู</option>
              <option value="mazda3_fastback">Mazda 3 5 ประตู</option>
              <option value="bt50">BT-50</option>
              <option value="bt50_pro">BT-50 Pro</option>
              <option value="cx-3">CX-3</option>
              <option value="cx-30">CX-30</option>
              <option value="cx-5">CX-5</option>
              <option value="cx-8">CX-8</option>
              <option value="mx-5">MX-5</option>
            </select>
          </div>

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon3">*วันที่สะดวกเข้า</span>
            </div>
            <input type="date" value= {appoidate} class="form-control" placeholder="yyyy-mm-dd" aria-describedby="basic-addon3" onChange={(e) =>{setAppoiDate(e.target.value)} }/>
          </div> 

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="inputGroupSelect02">*เลขกิโลเมตรของรถ</label>
            </div>
            <select class="custom-select" id="inputGroupSelect02" required value={sel2} onChange={e=>setSel2(e.target.value)}>
              <option selected disabled value="">เลือก...</option>
              <option value="10000">0-10000</option>
              <option value="20000">10001-20000</option>
              <option value="30000">20001-30000</option>
              <option value="40000">30001-40000</option>
              <option value="50000">40001-50000</option>
              <option value="60000">50001-60000</option>
              <option value="70000">60001-70000</option>
              <option value="80000">70001-80000</option>
              <option value="90000">80001-90000</option>
              <option value="100000">90001-100000</option>
              <option value="110000">100001-110000</option>
              <option value="120000">110001-120000</option>
              <option value="130000">120001-130000</option>
              <option value="140000">130001-140000</option>
              <option value="150000">140001-150000</option>
              <option value="160000">150001-160000</option>
              <option value="170000">160001-170000</option>
              <option value="180000">170001-180000</option>
              <option value="190000">180001-190000</option>
              <option value="200000">more 200000</option>
            </select>
          </div>

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="inputGroupSelect03">*รับบริการเรื่อง</label>
            </div>
            <select class="custom-select" id="inputGroupSelect03" required value={sel3} onChange={e=>setSel3(e.target.value)}>
              <option selected disabled value="">เลือก...</option>
              <option value="Maintenance">เช็ครถตามระยะ</option>
              <option value="EngineOil">ถ่ายน้ำมันเครื่อง</option>
              <option value="TransmissionOil">ถ่ายน้ำมันเกียร์และเฟืองท้าย</option>
              <option value="Suspension">ซ่อมช่วงล่าง</option> 
              <option value="Interior">ตรวจสอบภายนอกรถ</option> 
              <option value="Exterior">ตรวจสอบภายในรถ</option>

            </select>
          </div>

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="inputGroupSelect04">เสริมด้วยเรื่อง</label>
            </div>
            <select class="custom-select" id="inputGroupSelect04" value={sel4} onChange={e=>setSel4(e.target.value)}>
              <option selected disabled value="">เลือก...</option>
              <option value="Wheels">ตรวจล้อ</option>
              <option value="Headlight">ไฟหน้าและไฟเบรค</option>
            </select>
          </div>


          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">ฝากบอกช่าง</span>
            </div>
            <input type="text" value={notes} class="form-control" placeholder="สิ่งที่อธิบายช่าง" aria-describedby="basic-addon1" onChange={(e) =>{setNotes(e.target.value)} }/>
          </div>       

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon2">*เบอร์โทรศัพท์</span>
            </div>
            <input type="tel" required value= {phone} class="form-control" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder="0812345678" aria-describedby="basic-addon2" onChange={(e) =>{setPhone(e.target.value)} }/>
          </div> 



          <button type="button" class="btn btn-success" onClick={postData} >ส่งข้อมูล</button>
        </div> 
      </div>
    </div>
  );

}

 export default App;