import express from 'express';
import Set from '../models/set.js';
import Card from '../models/card.js';

const setRouter = express.Router();

// Create a new set
setRouter.post('/', async (req, res) => {
    const { name, description, user } = req.body;
    try {
        const newSet = new Set({ name, description, user });
        await newSet.save();
        res.status(201).json(newSet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all sets
setRouter.get('/', async (req, res) => {
    try {
        const sets = await Set.find().populate('cards');
        res.status(200).json(sets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a set by ID
setRouter.get('/:id', async (req, res) => {
    try {
        const set = await Set.findById(req.params.id).populate('cards');
        if (!set) return res.status(404).json({ message: 'Set not found' });
        res.status(200).json(set);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a set by ID
setRouter.put('/:id', async (req, res) => {
    const { name, description } = req.body;
    try {
        const updatedSet = await Set.findByIdAndUpdate(
            req.params.id,
            { name, description },
            { new: true }
        );
        if (!updatedSet) return res.status(404).json({ message: 'Set not found' });
        res.status(200).json(updatedSet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a set by ID
setRouter.delete('/:id', async (req, res) => {
    try {
        const deletedSet = await Set.findByIdAndDelete(req.params.id);
        if (!deletedSet) return res.status(404).json({ message: 'Set not found' });
        res.status(200).json({ message: 'Set deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a card to a set
setRouter.post('/:setId/card', async (req, res) => {
    const { recto, verso } = req.body;
    try {
        const newCard = new Card({ recto, verso });
        await newCard.save();

        const set = await Set.findById(req.params.setId);
        if (!set) return res.status(404).json({ message: 'Set not found' });

        set.cards.push(newCard._id);
        await set.save();

        res.status(201).json(newCard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default setRouter;