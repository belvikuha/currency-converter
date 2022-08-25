
import { useCallback, useState } from "react"

const useCurrencyService = ()=>{
    const[loading, setLoading] = useState()
    const [error, setError] = useState()

    const _apiBase = `https://bank.gov.ua/NBU_Exchange/exchange_site?`;

    const getCurrencyRate= useCallback(async(date, valcode)=>{
        setLoading(true);
        try{
            // ${_apiBase}date=${date}&valcode=${valcode}&json
            const response = await fetch(`https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5`, 
            // {
            //     method: 'GET',
            //     headers: {
            //       'Content-Type': 'application/json', 
            //       "Access-Control-Allow-Origin": "*"
            //     },
            //     // credentials: 'include',
            //     // mode: 'cors'
            // }
            );
            if(!response.ok){
                throw new Error(`Could not fetch url, status: ${response.status}`)
            }

            const data = await response.json();
            setLoading(false);
            return data;
        }
        catch(e){
            setLoading(false);
            setError(e.message);
            throw e;
        }
            
    },[]) 
    
    return {loading, error, getCurrencyRate}

}
export default useCurrencyService

// https://bank.gov.ua/NBU_Exchange/exchange_site?date=20220818&valcode=usd