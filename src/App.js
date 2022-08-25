import {useEffect, useState} from 'react'
// import './App.css';
import Header from './components/Header/Header';
import Conversion from './components/Conversion/Conversion';
import useCurrencyService from './Service/CurrencyService'
function App() {

  const [usd, setUsd] = useState()
  const [eur, setEur] = useState()
  const[currMass, setCurrMass] = useState([])

  const {loading, error, getCurrencyRate} = useCurrencyService()

  useEffect(()=>{
      getCurrencyRate().then(res=>{
          setEur(res[1].sale);
          setUsd(res[0].sale)
          setCurrMass(res);
      })
  },[])

  return (
    <>
      {!loading ? 
      <div className="App">
        <Header usd={usd} eur={eur}/>
        <Conversion currencies={currMass}/>
      </div> 
       : null} 
    </>
  );
}

export default App;
