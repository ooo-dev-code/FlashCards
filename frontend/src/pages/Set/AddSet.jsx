import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";

function AddSet() {
    const { user } = useAuthContext();
    const [sets, setSets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [setName, setSetName] = useState("");
    const [description, setDescription] = useState("");
    const [editingSetId, setEditingSetId] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/set")
            .then((response) => {
                setSets(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error fetching sets:", error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newSet = {
            name: setName,
            description,
            user: user.user._id,
        };

        if (editingSetId) {
            // Update existing set
            axios.put(`http://localhost:5000/set/${editingSetId}`, newSet)
                .then((response) => {
                    console.log("Set updated:", response.data);
                    setSets(sets.map((set) => (set._id === editingSetId ? response.data : set)));
                    setSetName("");
                    setDescription("");
                    setEditingSetId(null);
                })
                .catch((error) => {
                    console.error("Error updating set:", error);
                });
        } else {
            // Create new set
            axios.post("http://localhost:5000/set", newSet)
                .then((response) => {
                    console.log("Set created:", response.data);
                    setSets([...sets, response.data]);
                    setSetName("");
                    setDescription("");
                })
                .catch((error) => {
                    console.error("Error creating set:", error);
                });
        }
    };

    const handleEdit = (set) => {
        setSetName(set.name);
        setDescription(set.description);
        setEditingSetId(set._id);
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/set/${id}`)
            .then(() => {
                console.log("Set deleted");
                setSets(sets.filter((set) => set._id !== id));
            })
            .catch((error) => {
                console.error("Error deleting set:", error);
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="setName">Set Name:</label>
                <input
                    type="text"
                    id="setName"
                    value={setName}
                    onChange={(e) => setSetName(e.target.value)}
                    required
                />

                <br />
                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <br />

                <button type="submit">{editingSetId ? "Update Set" : "Create Set"}</button>
            </form>

            <h1>Sets Created</h1>
            <ul>
                {sets.map((set) => (
                    <>
                    
                    <li key={set._id} className="set-card">
                        <div>
                            <button onClick={() => handleEdit(set)}>Edit</button>
                            <button onClick={() => handleDelete(set._id)}>Delete</button>
                        </div>
                    
                    
                        {set.name.length >= 40 ? <h3>{set.name.substring(0, 40)}...</h3> : <h3>{set.name}</h3>}

                        {set.description.length >= 40 ? <p>{set.description.substring(0, 40)}...</p> : <p>{set.description}</p>}
                        <a href={`/addcard/${set._id}`}><button>Add Cards / Play</button></a>

                    </li>
                    </>
                ))}
            </ul>
        </div>
    );
}

export default AddSet;
