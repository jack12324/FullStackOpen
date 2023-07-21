import {NewPatient, NonSensitivePatient, Patient} from "../types";
import patients from "../data/patients";
import {v4 as uuid} from "uuid";
const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

const addPatient = (patient: NewPatient):Patient=> {
   const newPatient = {
       id: uuid(),
       ...patient
   };
   patients.push(newPatient);
    return newPatient;
};

export default {getNonSensitivePatients, addPatient};