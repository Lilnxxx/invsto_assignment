import { useState,useEffect } from "react"
import Papa from 'papaparse'
import './csvtable.css'
import Singular from "./Singluar";
// import fs from 'fs';
// const fs = require('fs');
// Singular.Setshowtable(0)
function Tablecsv(prop){
    const [parsedData, setParsedData] = useState([]);

    //State to store table Column name
    const [tableRows, setTableRows] = useState([]);

    //State to store the values
    const [values, setValues] = useState([]);
    useEffect(()=>{
        const fetchChannel=async()=>{
            if(prop.val.length<100)return
            Papa.parse(prop.val, {
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                    const rowsArray = [];
                    const valuesArray = [];
        
                    // Iterating data to get column name and their values
                    results.data.map((d) => {
                    rowsArray.push(Object.keys(d));
                    valuesArray.push(Object.values(d));
                    });
        
                    // Parsed Data Response in array format
                    setParsedData(results.data);
        
                    // Filtered Column Names
                    setTableRows(rowsArray[0]);
        
                    // Filtered Values
                    setValues(valuesArray);
                },
                });
        }
        fetchChannel()
      },[prop.val])
    // if(prop.val!==''){
    // const changeHandler = (event) => {
        // Passing file data (event.target.files[0]) to parse using Papa.parse
        
    // };

    return (
        <div className="tab">
        {/* File Uploader */}
        {/* <input
            type="file"
            name="file"
            onChange={changeHandler}
            accept=".csv"
            style={{ display: "block", margin: "10px auto" }}
        /> */}
        <br />
        <br />
        {/* Table */}
        <table>
            <thead>
            <tr>
                {tableRows.map((rows, index) => {
                return <th key={index}>{rows}</th>;
                })}
            </tr>
            </thead>
            <tbody>
            {values.map((value, index) => {
                return (
                <tr key={index}>
                    {value.map((val, i) => {
                    return <td key={i}>{val}</td>;
                    })}
                </tr>
                );
            })}
            </tbody>
        </table>
        </div>
    );
}

export default Tablecsv