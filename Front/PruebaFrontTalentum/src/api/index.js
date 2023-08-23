//url inicial
const urlBase = 'http://localhost:3000'

export async function Get(city){

    const url = `${urlBase}/${city}`;
    const response = await fetch(url, {
        method: "GET", // method to use *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json",
            'key': '1234',
        },
    });
    return await response.json();
}