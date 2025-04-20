import express from 'express';
import User from '../models/user.js';
import Card from '../models/card.js';


const cardRouter = express.Router();

// Create a new card
cardRouter.post('/', async (req, res) => {
    const { recto, verso } = req.body;
    try {
        const newCard = new Card({ recto, verso });
        await newCard.save();
        res.status(201).json(newCard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all cards
cardRouter.get('/', async (req, res) => {
    try {
        const cards = await Card.find();
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a card by ID
cardRouter.get('/:id', async (req, res) => {
    try {
        const card = await Card.findById(req.params.id);
        if (!card) return res.status(404).json({ message: 'Card not found' });
        res.status(200).json(card);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a card by ID
cardRouter.put('/:id', async (req, res) => {
    const { recto, verso } = req.body;
    try {
        const updatedCard = await Card.findByIdAndUpdate(
            req.params.id,
            { recto, verso },
            { new: true }
        );
        if (!updatedCard) return res.status(404).json({ message: 'Card not found' });
        res.status(200).json(updatedCard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a card by ID
cardRouter.delete('/:id', async (req, res) => {
    try {
        const deletedCard = await Card.findByIdAndDelete(req.params.id);
        if (!deletedCard) return res.status(404).json({ message: 'Card not found' });
        res.status(200).json("Card deleted successfully");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default cardRouter;