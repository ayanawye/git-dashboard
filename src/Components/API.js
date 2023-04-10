const token = localStorage.getItem("token")
export const Config = {headers: {"Authorization": `Bearer ${token}`}}