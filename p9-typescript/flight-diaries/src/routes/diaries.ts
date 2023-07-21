/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import diaryService from "../services/diaryService";
import utils from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
    res.send(diaryService.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
    const diary = diaryService.findById(Number(req.params.id));
    if(diary){
        res.send(diary);
    } else {
        res.status(404);
    }
});


router.post('/', (req, res) => {
    try {
        const newDiaryEntry = utils.toNewDiaryEntry(req.body);
        const addedEntry = diaryService.addDiary(newDiaryEntry);    res.json(addedEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;