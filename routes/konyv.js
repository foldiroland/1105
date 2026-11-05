import express from 'express';
import db from '../config/db.js';
const router = express.Router();

// 2. 
router.get('/', async (req, res)=>{
    try {
        const [result] = await db.query(`SELECT * FROM konyv`);
        res.json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal server error."})
    }
})

// 6.
router.post('/', async (req, res)=>{
    try {
        const {cim, szerzo, mufaj} = req.body;
        const [result] = await db.query(`INSERT INTO konyv (cim, szerzo, mufaj) VALUES (?,?,?)`, [cim, szerzo, mufaj]);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error."})
    }
})

// 7. 
router.delete('/:id', async (req, res)=>{
    try {
        const {id} = req.params;
        const [result] = await db.query(`DELETE FROM konyv WHERE id = ?`, [id]);
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal server error."})
    }
})





export default router;