import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
    recto: {
        type: String,
        required: true,
    },
    verso: {
        type: String,
        required: true,
    },
});

const Card = mongoose.model("Card", cardSchema);
export default Card;