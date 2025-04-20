import mongoose from "mongoose";

const setSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    cards: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Card",
        },
    ],
});

const Set = mongoose.model("Set", setSchema);
export default Set;