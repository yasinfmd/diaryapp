import React from "react";

function useStickyState(defaultValue, key) {
    const [value, setValue] = React.useState(() => {
        const storage = window.localStorage.getItem(key);
        return storage !== null
            ? JSON.parse(storage)
            : defaultValue;
    });
    React.useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
}
