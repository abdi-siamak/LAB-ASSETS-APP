import express from 'express';
import Asset from '../models/Asset.js'

const router = express.Router(); 

// GET /api/assets?q=&page,&limit=
// page: which “page” of results you want
// limit: how many items per page you want
// skip: how many items to jump over to reach that slice
router.get('/', async (req, res, next) => {
    try {
        const { q = '', page = 1, limit = 10 } = req.query;
        const filter = q ? { name: new RegExp(q, 'i')} : {}; // i: case-insensitive
        const skip = (parseInt(page) - 1) * parseInt(limit); // ??

        const [items, total] = await Promise.all([ // promise.all: run multiple asynchronous operations in parallel
            Asset.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
            Asset.countDocuments(filter)
        ]);

        res.json({items, total, page: parseInt(page), limit: parseInt(limit)});
    } catch (err) {
        next(err); // err is passed to the error-handling middleware
    }
});

// GET /api/assets/:id
router.get('/:id', async (req, res, next) => {
    try {
        const item = await Asset.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Asset not found'});
        res.status(200).json(item); // use return, when want to stop further code execution
    } catch (err) {
        next(err);
    }
});

// POST /api/assets
router.post('/', async (req, res, next) => {
    try {
        const {name, type, location, status} = req.body;
        const duplicate = await Asset.findOne({name, type, location, status});
        if (duplicate) {
            return res.status(409).json({ message: 'Record already exists.' });
        }
        const asset = new Asset(req.body);
        const saved = await asset.save();
        res.status(201).json(saved);
    } catch (err) {
        next(err);
    }
})

// PATCH /api/assets/:id
router.patch('/:id', async (req, res, next) => { // PUT: full update – PATCH: partial update
    try {
        const {name, type, location, status} = req.body;
        const duplicate = await Asset.findOne({name, type, location, status});
        if (duplicate) {
            return res.status(409).json({ message: 'Record already exists.' });
        }
        const updated = await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true}); //new: true → Returns the updated document instead of the old one|runValidators: true → Ensures the update respects the schema’s validators.
        if (!updated) return res.status(404).json({ message: 'Asset not found' });
            res.json({ ok: true});
    } catch (err) {
        next(err);
    }
})

// DELETE /api/assets/:id
router.delete('/:id', async (req, res, next) => {
    try {
        const removed = await Asset.findByIdAndDelete(req.params.id);
        if (!removed) return res.status(404).json({ message: 'Asset not found'});
        res.json({ok: true});
    } catch (err) {
        next(err);
    }
})

export default router;

