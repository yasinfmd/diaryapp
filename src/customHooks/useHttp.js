import React, {useState} from "react";
import axios from "axios"

const useHttp = (url, options, method, data) => {
    const [response, setResponse] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    React.useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                let res;
                switch (method) {
                    case "POST":
                        res = await axios.post(url, data, options)
                        return
                    case "GET":
                        res = await axios.get(url, options)
                        console.log("get")
                        console.log(res)
                        return
                    case "PUT":
                        res = await axios.put(url, data, options)
                        return
                    case "DELETE":
                        res = await axios.delete(url, options)
                        return
                }
                console.log("setres",res)
                setIsLoading(false)
                setResponse(res);
            } catch (error) {
                setIsLoading(false)
                setError(error);
            }
        };
        fetchData();
    }, []);
    console.log("returnedilen",response)
    return {response, error, isLoading};
};
export default useHttp
