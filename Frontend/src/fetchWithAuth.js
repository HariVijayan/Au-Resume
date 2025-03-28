const fetchWithAuth = async (url, options = {}) => {
    const response = await fetch(url, {
        ...options,
        credentials: 'include',  // Ensures cookies are sent with the request
    });

    if (response.status === 401) {
        console.log('Access token expired. Refreshing...');

        // Call refresh token API to get new access token
        await fetch('http://localhost:5000/tokenRequest/refresh-token', {
            method: 'POST',
            credentials: 'include', // Ensures cookies are sent
        });

        // Retry original request
        return fetch(url, {
            ...options,
            credentials: 'include',
        });
    }

    return response;
};

export default fetchWithAuth;
