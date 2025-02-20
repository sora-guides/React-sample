const baseUrl = "http://localhost:8000/api/v1/account/"


export async function login(email, password) {
    try {
        const response = await fetch(baseUrl + "login/", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ email, password }),
            credentials: "include",
        });
        return response;
    } catch(error) {
        throw new Error("Error during loging: ", error.message);
    }
}