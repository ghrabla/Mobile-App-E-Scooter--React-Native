import Cookies from 'js-cookie';
export const token = Cookies.get('token');

export const config = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
};