import { useState, useEffect } from 'react';

//Hook 사용은 함수처리 안에서는 사용 불가능함
function useFatch(uri) {
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!uri) return;

        fetch(uri)
            .then(response => response.json())
            .then(setData)
            .then(setLoading(false))
            .catch(setError);
    }, [uri]);
    return { loading, data, error };
}

export { useFatch };
