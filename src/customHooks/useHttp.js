import React, {useState} from "react";
import axios from "axios"

const useHttp = (url, options, data) => {
    const [response, setResponse] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    React.useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                        const res = await axios.post(url,data, options)
                        setResponse(res);
                        setIsLoading(false)
                        return
            } catch (error) {
                setIsLoading(false)
                setError(error);
            }
        };
        fetchData();
    }, []);
    return {response, error, isLoading,setResponse};
};
export default useHttp
