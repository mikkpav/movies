import { v4 as uuidv4 } from 'uuid';

export const getUserId = (): string => {
    const USER_ID_KEY = 'user_id';

    let id = localStorage.getItem(USER_ID_KEY);
    if (!id) {
        id = uuidv4();
        localStorage.setItem(USER_ID_KEY, id);
    }
    return id;
};