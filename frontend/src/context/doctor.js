import { createContext, useContext, useReducer } from "react";
import doctorContract from "../contractEther/doctor";
import { toast } from "react-toastify";
import { doctorState, GET_ALL_DOCTORS, GET_DOCTOR } from "../actions/Doctor";
import doctorReducer from "../reducers/doctor";
import axios from "axios";

const DoctorContext = createContext(doctorState);
const DoctorContract = doctorContract();

const DoctorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(doctorReducer, doctorState);

  return (
    <DoctorContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DoctorContext.Provider>
  );
};

const useDoctor = () => useContext(DoctorContext);

const addDoctor = async (data, doctorData) => {
  try {
    const resp = await DoctorContract.addDoctor(...data);
    const registerResp = await axios.post(
      `${process.env.REACT_APP_HEALTH_API}/register`,
      {
        name: doctorData["doctorName"].value,
        publicId: doctorData["dId"].value,
        phone: doctorData["phone"].value,
        type: "doctor",
      }
    );
    const pId = resp;
    toast.success("Doctor Added Succesfully");
    return { type: GET_DOCTOR, data: { pId } };
  } catch (e) {
    toast.error("Oops ! Something Went Wrong");
  }
};

const getAllDoctors = async () => {
  try {
    const doctorsLength = await DoctorContract.totalDoctorLength();
    const doctorDataList = [];
    for (let i = 0; i < doctorsLength; i++) {
      const doctorId = await DoctorContract.getDoctorId(i);
      const patientData = await DoctorContract.getDoctor(doctorId);
      doctorDataList.push(patientData);
    }
    return { type: GET_ALL_DOCTORS, data: doctorDataList };
  } catch (e) {
    console.log(e);
  }
};

export { DoctorProvider, useDoctor, addDoctor, getAllDoctors };
