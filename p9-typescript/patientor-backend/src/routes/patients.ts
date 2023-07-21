import express from "express";
import utils from "../utils";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
    res.send(patientService.getNonSensitivePatients());
});

router.post("/", (req, res) => {
    try {
        const newPatient = utils.toNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;