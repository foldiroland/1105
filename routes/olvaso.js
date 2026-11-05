import express from 'express';
import db from '../config/db.js';
const router = express.Router();

// 1. 
router.get('/', async (req, res)=>{
    try {
        const [result] = await db.query(`SELECT * FROM olvaso`);
        res.json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal server error."})
    }
})

// 6.
router.post('/', async (req, res)=>{
    try {
        const {nev, tagsag_kezdete, kor} = req.body;
        const [result] = await db.query(`INSERT INTO olvaso (nev, tagsag_kezdete, kor) VALUES (?,?,?)`, [nev, tagsag_kezdete, kor]);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error."})
    }
})

// 7. 
router.delete('/:id', async (req, res)=>{
    try {
        const {id} = req.params;
        const [result] = await db.query(`DELETE FROM olvaso WHERE id = ?`, [id]);
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal server error."})
    }
})

// 13.
router.put('/:id', async (req, res)=>{
    try {
        const {id} = req.params;
        const {nev, kor} = req.body;
        const result = await db.query(`UPDATE olvaso SET nev = ?, kor = ?`, [nev, kor])
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal server error."})
    }
})


export default router;