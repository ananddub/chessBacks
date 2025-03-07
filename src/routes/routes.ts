import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Backend of Chess Game');
});

export default router;
