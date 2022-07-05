// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Patient.sol";
import "./Doctor.sol";

contract Monitor {
    mapping(address=>PatientMonitor[]) allPatientData;
    mapping (string=>PatientData) allPatients;
    address public owner = msg.sender;
      uint public patientId;

  

  Patient patient;
  Doctor doctor;
  
    function addPatientData(address patId,string memory pulse,string memory spo2,string memory temp) public returns(bool) {
        PatientMonitor memory PatientMonitorData= PatientMonitor(patId,pulse,spo2,temp);
            allPatientData[patId].push(PatientMonitorData);
            return true;
        
    }

    function getAllPatientDataLength(address pid) public view returns(uint){
        return allPatientData[pid].length;
    }

    function getPatientData(address patId,uint index) public view returns(address,string memory,string memory,string memory){
          PatientMonitor memory PatientMonitorData=allPatientData[patId][index];
          return (PatientMonitorData._id,PatientMonitorData.pulse,PatientMonitorData.spo2,PatientMonitorData.temp);
          
    }
 
}


struct PatientMonitor {
    address _id;
    string pulse;
    string spo2;
    string temp;
}

