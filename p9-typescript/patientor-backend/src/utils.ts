import {Gender, NewPatient} from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};
const isGender = (gender: string): gender is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(gender);
};
const parseStringField = (field: unknown, name: string): string=> {
    if(!field || !isString(field)){
        throw new Error(`Incorrect or missing ${name}: ${field}`);
    }
    return field;
};
const parseDOB = (dob: unknown): string => {
    if(!dob || !isString(dob) || !isDate(dob)){
        throw new Error('Incorrect or missing dob: ' + dob);
    }
    return dob;
};

const parseGender= (gender: unknown):Gender => {
    if(!gender || !isString(gender) || !isGender(gender)){
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const toNewPatient = (object: unknown): NewPatient => {
    if(!object || typeof object !== 'object'){
        throw new Error('Incorrect or missing data');
    }

    if('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object){
        return {
            name: parseStringField(object.name, 'name'),
            dateOfBirth: parseDOB(object.dateOfBirth),
            ssn: parseStringField(object.ssn, 'ssn'),
            gender: parseGender(object.gender),
            occupation: parseStringField(object.occupation, 'occupation')
        };
    }

    throw new Error("Incorrect data: some fields are missing");
};

export default {toNewPatient, parseStringField};