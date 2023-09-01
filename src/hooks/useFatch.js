import { useState, useEffect } from 'react';

function useFatch(uri) {
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        if (!uri) return;

        fetch(uri)
            .then(response => response.json())
            .then(setData)
            .then(setLoading(false))
            .catch(setError);
    }, [uri]);
    return {loading, data, error};
}

export {useFatch};
