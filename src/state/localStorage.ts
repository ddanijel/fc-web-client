export const getItemFromLocalStorage = (key: string):string => {
    try {
        const serializedState = localStorage.getItem(key);
        if (serializedState === null) {
            return "";
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error("Error while getting the key from Local Storage\nKey: ", key);
        return "";
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
