import React, { use } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function AddCard() {

    const { id } = useParams()
    const [cards, setCards] = useState([])
    const [set, setSet] = useState({})
    const [recto, setRecto] = useState("")
    const [verso, setVerso] = useState("")
    const [editCardId, setEditCardId] = useState(null)

    useEffect(() => {
        axios.get("http://localhost:5000/set/" + id)
            .then((response) => {
                setSet(response.data)
                setCards(response.data.cards || [])
            })
            .catch((error) => {
                console.error("Error fetching sets:", error);
            });
    }
    , [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const newCard = {
            recto,
            verso,
        }

        if (editCardId) {
            // Update existing card
            axios.put(`http://localhost:5000/card/${editCardId}`, newCard)
                .then((response) => {
                    setCards(cards.map(card => card._id === editCardId ? response.data : card))
                    setRecto("")
                    setVerso("")
                    setEditCardId(null)
                })
                .catch((error) => {
                    console.error("Error updating card:", error)
                })
        } else {
            // Add new card
            axios.post("http://localhost:5000/set/" + id + "/card", newCard)
                .then((response) => {
                    setCards([...cards, response.data])
                    setRecto("")
                    setVerso("")
                })
                .catch((error) => {
                    console.error("Error creating card:", error)
                })
        }
    }

    const handleDelete = (cardId) => {
        axios.delete(`http://localhost:5000/card/${cardId}`)
            .then(() => {
                setCards(cards.filter(card => card._id !== cardId))
            })
            .catch((error) => {
                console.error("Error deleting card:", error)
            })
    }

    const handleEdit = (card) => {
        setRecto(card.recto)
        setVerso(card.verso)
        setEditCardId(card._id)
    }

    const play = () => {
        if (cards.length === 0) {
            alert("No cards in the set to play.");
            return;
        }
        else {
            window.location.href = `/game/${id}`;
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="recto">Recto:</label>
                <input
                    type="text"
                    id="recto"
                    value={recto}
                    onChange={(e) => setRecto(e.target.value)}
                    required
                />

                <label htmlFor="verso">Verso:</label>
                <input
                    type="text"
                    id="verso"
                    value={verso}
                    onChange={(e) => setVerso(e.target.value)}
                    required
                />

                <button type="submit">{editCardId ? "Update Card" : "Add Card"}</button>
            </form>

            <h2>Cards in Set: {set.name}</h2>
            <ul>
                {cards.map((card) => (
                    <li key={card._id}>
                        <strong>{card.recto}</strong> - {card.verso}
                        <button onClick={() => handleEdit(card)}>Edit</button>
                        <button onClick={() => handleDelete(card._id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <button onClick={play}>Play Set</button>
            <a onClick={() => window.location.href = "/addset"}>Home</a>
        </div>
    )
}

export default AddCard
