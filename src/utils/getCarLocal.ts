export const getCart = () => {
    const data = localStorage.getItem("cart")
    console.log(data && JSON.parse(data));
    return data !== null ? JSON.parse(data) : [];
}