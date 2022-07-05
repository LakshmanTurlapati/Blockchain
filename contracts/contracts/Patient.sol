// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Patient {
    mapping  (address=>PatientData) public allPatients;
    address[] allPatientAddress;
    address public owner = msg.sender;
    uint public patientId;

  function getPatientId(uint i) public view returns (address) {
    return allPatientAddress[i];
  }
  
  function addPatient(address pId,string memory name,string memory age,string memory gender,string memory bloodGrp,string memory addr,string memory device_id,string memory hosp,address doctor) public returns(address){
      PatientData memory Pdata=PatientData(pId,name,age,gender,bloodGrp,addr,device_id,hosp,doctor,2);
      allPatients[pId]=(Pdata);
      allPatientAddress.push(pId);
      return pId;
  }

 function getPatient(address  patId) public view returns ( address ,string memory  ,string memory ,string memory ,string memory ,string memory ,string memory,address,uint,string memory ) {
     PatientData memory Pdata=allPatients[patId];
     return ( Pdata._id,Pdata.patientName,Pdata.age,Pdata.gender,Pdata.bloodGroup,Pdata.Address,Pdata.device_id,Pdata.doctorAssigned,Pdata.role,Pdata.hospital);
 }

 function totalPatientsLength()public view returns (uint ){
     return  allPatientAddress.length;
 }

 function editPatientData(address pid,address docId) public returns (bool){
     allPatients[pid].doctorAssigned=docId;
     return true;
 }

 function isValidPatient(address patId) public view returns(bool){
     if(allPatientAddress.length==0) return false;
     PatientData memory pData=allPatients[patId];
     if(pData._id==patId) return true;
     else return false;
 }
 
}


struct PatientData {
    address _id;
    string patientName;
    string age;
    string gender;
    string bloodGroup;
    string Address;
    string device_id;
    string hospital;
    address doctorAssigned;
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