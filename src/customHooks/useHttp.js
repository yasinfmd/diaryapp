import React, {useState} from "react";
import axios from "axios"

const useHttp = (url, options, method, data) => {
    const [response, setResponse] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    React.useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            debugger
            try {
                switch (method) {
                    case "GET":
                        const res = await axios.get(url, options)
                        setResponse(res);
                        setIsLoading(false)
                        return
                }
            } catch (error) {
                setIsLoading(false)
                setError(error);
            }
        };
        fetchData();
    }, []);
    return {response, error, isLoading};
};
export default useHttp
