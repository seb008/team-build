import mongoose from 'mongoose';

const AffaireSchema = new mongoose.Schema({
    idUser: {
        type: [String],
    },
    files :{
        type: [String],
    },
    name: {
        type: String,
        require: true,
    },
    adress: {
        type: String,
        require: true,
    },
    montantTotal: {
        type: Number,
        require: true,
    },
    refAffaire: {
        type: String,
    },
    description: {
        type: String,
    },
    idBlocAffaire: {
        type: [String],
    },
    idBlocChantier: {
        type: [String],
    },
    etatAffaire: {
        type: String,
        enum: ["a compléter", "prête a éxé", "terminé"],
        default: "a compléter",
    }

},
{ timestamps: true }
);

export default mongoose.model("Affaire",AffaireSchema)