const BASE_URL = "http://localhost:8080/crud";
const RESOURSE_URL = `${BASE_URL}/movie`;

const baseRequest = async({ urlPath = "", method = "GET", body = null }) => {
    try {
        const requestParams = {
            method,
            headers: {
                "Content-Type": "application/json",
            },
        };

        if (body) {
            requestParams.body = JSON.stringify(body);
        }

        return await fetch(`${RESOURSE_URL}${urlPath}`, requestParams);
    } catch (error) {
        console.error("HTTP ERROR: ", error);
    }
};


export const getAllMovies = async() => {
    const rawResponse = await baseRequest({ method: "GET" });

    return await rawResponse.json();
};

export const postMovie = (body) => baseRequest({ method: "POST", body });

export const updateMovie = (id, body) =>
    baseRequest({ urlPath: `/${id}`, method: "PUT", body });

export const deleteMovie = (id) =>
    baseRequest({ urlPath: `/${id}`, method: "DELETE" });