const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/pet`;

const index = async () => {

    try {
        const res = await fetch(BASE_URL)
        const pets = await res.json()

        return pets
    } catch (error) {
        console.log(error)
    }
}

const create = async (formData) => {
    try {
        const res = await fetch(BASE_URL, {
            // We specify that this is a 'POST' request
            method: 'POST',
            // We're sending JSON data, so we attach a Content-Type header
            // and specify that the data being sent is type 'application/json'
            headers: {
                'Content-Type': 'application/json',
            },
            // The formData, converted to JSON, is sent as the body
            // This will be received on the backend as req.body
            body: JSON.stringify(formData),
        });
        return res.json();
    } catch (err) {
        console.log(err);
    }
};

const update = async (id, formData) => {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            // We specify that this is a 'POST' request
            method: 'PUT',
            // We're sending JSON data, so we attach a Content-Type header
            // and specify that the data being sent is type 'application/json'
            headers: {
                'Content-Type': 'application/json',
            },
            // The formData, converted to JSON, is sent as the body
            // This will be received on the backend as req.body
            body: JSON.stringify(formData),
        });
        return res.json();
    } catch (err) {
        console.log(err);
    }
}


const deletePet = async (id) => {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            // We specify that this is a 'DELETE' request
            method: 'DELETE',
            // We're sending JSON data, so we attach a Content-Type header
            // and specify that the data being sent is type 'application/json'
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return res.json();
    } catch (err) {
        console.log(err);
    }
}


export {
    index,
    create,
    deletePet,
    update,
}