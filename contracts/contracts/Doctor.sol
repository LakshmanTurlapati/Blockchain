// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Patient.sol";

contract Doctor {
    mapping(address=>DoctorData) public allDoctors;
    address[] allDoctorAddress;
    address public owner = msg.sender;


  Patient patient;

  function getDoctorId(uint i) public view returns (address) {
    return allDoctorAddress[i];
  }
  
    function addDoctor(address dId,string memory name,string memory age,string memory gender,string memory bloodGrp,string memory hosp,string memory addr) public returns(address){
      DoctorData memory Ddata=DoctorData(dId,name,age,gender,bloodGrp,addr,hosp,1);
      allDoctors[dId]=Ddata;
      allDoctorAddress.push(dId);
      return dId;
  }

    function getDoctor(address  patId) public view returns ( address ,string memory  ,string memory ,string memory ,string memory ,string memory ,string memory ,uint) {
     DoctorData memory Ddata=allDoctors[patId];
     return ( Ddata._id,Ddata.doctorName,Ddata.age,Ddata.gender,Ddata.bloodGroup,Ddata.Address,Ddata.hospital,Ddata.role);
 }

  function totalDoctorLength()public view returns (uint ){
     return  allDoctorAddress.length;
 }

 function isDoctorValid(address docId) public view returns (bool){
   if(allDoctorAddress.length==0) return false;
   DoctorData memory data=allDoctors[docId];
     if(data._id==docId)return true;
     else return false;
 }
 
 
}


struct DoctorData {
    address _id;
    string doctorName;
    string age;
    string gender;
    string bloodGroup;
    string Address;
    string hospital;
    uint role;
}

/* 

1001:[
    {
        uint _id;
    string patientName;
    string age;
    string gender;
    string bloodGroup;
    string Address;
    string hospital;
    string device_id;
        }
]

*/