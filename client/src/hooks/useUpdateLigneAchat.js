import axios from "axios";
import {useState} from "react";

const useUpdateLigneAchat = (ligneAchatId) => {
    const url = `/lignesAchat/${ligneAchatId}`
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const execute = async ({ title, amount, file }) => {
        setLoading(true);

        const formData = new FormData();
        formData.append('titleLigneAchat', title);
        formData.append('montantLigneAchat', amount);
        formData.append('invoice', file);

        try {
            const result = await axios.put(url, formData, { headers: {"Content-Type": "multipart/form-data" }});
            setLoading(false);
            return result;
        } catch(err) {
            setError(err);
            setLoading(false);
        }
    }

    return { execute, loading, error }
}

export default useUpdateLigneAchat;