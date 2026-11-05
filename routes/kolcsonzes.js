import express from 'express';
import db from '../config/db.js';
const router = express.Router();

// 3. 
router.get('/:olvaso_id', async (req, res)=>{
    try {
        const {id} = req.params;
        const [result] = await db.query(`SELECT * FROM kolcsonzes WHERE olvaso_id = ?`, [olvaso_id]);
        res.json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal server error."})
    }
})

// 4.
router.get('/atlag/:olvaso_id', async (req, res)=>{
    try {
        const {id} = req.params;
        const [result] = await db.query(`SELECT AVG(ertekeles) FROM kolcsonzes WHERE olvaso_id = ?`, [olvaso_id]);
        res.json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal server error."})
    }
})

// 5.
router.get('/atlag/:olvaso_id/:mufaj', async (req, res)=>{
    try {
        const {id} = req.params;
        const {mufaj} = req.params;
        const [result] = await db.query(`SELECT AVG(ertekeles) FROM kolcsonzes
             INNER JOIN konyv ON kolcsonzes.konyv_id = konyv.id 
             WHERE olvaso_id = ? AND konyv.mufaj = ?`, [olvaso_id, mufaj]);
        res.json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal server error."})
    }
})

// 6. 
router.post('/', async (req, res)=>{
    try {
        const {konyv_id, olvaso_id, ertekeles} = req.body;
        const [result] = await db.query(`INSERT INTO kolcsonzes (konyv_id, olvaso_id, ertekeles) VALUES (?,?,?)`, [konyv_id, olvaso_id, ertekeles]);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error."})
    }
})

// 7. 
router.delete('/:id', async (req, res)=>{
    try {
        const {id} = req.params;
        const [result] = await db.query(`DELETE FROM kolsonzes WHERE id = ?`, [id]);
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal server error."})
    }
})

// 8. 
router.get('/:konyv_id', async (req, res)=>{
    try {
        const {konyv_id} = req.params;
        const [result] = await db.query(`SELECT AVG(ertekeles) FROM kolcsonzes WHERE konyv_id = ?`, [konyv_id]);
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal server error."})
    }
})

// 9.
router.get('/:mufaj', async (req, res)=>{
    try {
        const {mufaj} = req.params;
        const [result] = await db.query(`SELECT AVG(ertekeles) FROM kolcsonzes WHERE mufaj = ?`, [mufaj]);
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal server error."})
    }
})

// 10.
router.get('/aktiv', async (req, res)=>{
    try {
        const [result] = await db.query(`SELECT * FROM kolcsonzes WHERE statusz LIKE "AKTIV"`);
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal server error."})
    }
})

// 11. 
router.get('/legjobb', async (req, res)=>{
    try {
        const [result] = await db.query(`SELECT * FROM kolcsonzes ORDER BY ertekeles DESC LIMIT 3`);
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal server error."})
    }
})

// 14. 
router.put('/:id', async (req, res)=>{
    try {
        const {id} = req.params;
        const {statusz, ertekeles} = req.body;
        const result = await db.query(`UPDATE kolcsonzes SET statusz = ?, ertekeles = ?`, [statusz, ertekeles])
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal server error."})
    }
})

// 15.
router.get('/szabad', async (req, res)=>{
    try {
        const [result] = await db.query(`SELECT * FROM kolcsonzes WHERE statusz = VISSZAHOZVA`);
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal server error."})
    }
})



export default router;