export const getItemFromLocalStorage = (key: string) => {
    try {
        const serializedState = localStorage.getItem(key);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error("Error while getting the key from Local Storage\nKey: ", key);
        return undefined;
    }
};

export const saveItemToLocalStorage = (key: string, value: any) => {
    try {
        const serializedState = JSON.stringify(value);
        localStorage.setItem(key, serializedState);
    } catch {
        console.error("Error while saving into Local Storage\nKey: ", key, "\nValue: ", value);
    }
};
