function get(endpoint) {
    return fetch(`http://localhost:3000/${endpoint}`)
        .then(response => response.json())
        .catch(error => console.error('Error al obtener los datos:', error));
}

export { get };