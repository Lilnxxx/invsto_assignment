import { useState } from 'react'
import './singular.css'
import Tablecsv from './Tablecsv'
import axios from 'axios'

function Singular() {
  const [filenam,Setfilenam]=useState('*Select File')
  const [filecsv,Setfilecsv]=useState('')
  const [showtable,Setshowtable]=useState(0)


    const getfunc=async()=>{
      try {
        const csfile=await axios.get('/getdata')
        Setfilecsv(csfile.data)
        // console.log('cs file type is --> ',typeof(csfile.data))
        Setshowtable(1)
      } catch (error) {
        Setshowtable(0)
        console.log('file error')
      }
    }
    const uploadfunc=async()=>{
        Setshowtable(0)
        let input = document.createElement('input');
        input.type = 'file';
        input.onchange =async()=> {
         // you can use this method to get file and perform respective operations
        let files =   Array.from(input.files);
        Setfilenam(files[0].name)
        console.log(input.files)
        await axios.post('/senddata',input.files)
        // console.log(input.files);
        };
        input.click();
    }
    return (
      <div className="jp">
        <button type='file'onClick={uploadfunc}>UPLOAD</button>
        {/* <input onClick={getfunc} type='file' accept='file' ></input> */}
        <button onClick={getfunc}>GET</button><br/>
        <label>{filenam}</label>
      {
        showtable?<Tablecsv val={filecsv}/>:<h1>No Table</h1>
      }
      {/* <Tablecsv val={filecsv}/> */}
      </div>

    );
  }
  
  export default Singular;
  