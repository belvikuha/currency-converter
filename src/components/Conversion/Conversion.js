import { useState, useEffect, useMemo } from "react"

import './conversion.css'
import change from './images/icon-change.png'

const Conversion = ({currencies}) =>{
    const [firstCurr, setFirstCurr] = useState(1)
    const [secondCurr, setSecondCurr] = useState(1)
    const [firstCurrSumm, setFirstCurrSumm] = useState()
    const [secondCurrSumm, setSecondCurrSumm] = useState()


    // useEffect(()=>{
    //     // changeFirstValues(secondCurrSumm)
    //     changeSecondValues(firstCurrSumm)
    //  },[secondCurr])

     useEffect(()=>{
        changeSecondValues(firstCurrSumm)
     },[firstCurr, secondCurr])

    const changeFirstValues = (sum)=>{
        setFirstCurrSumm(sum * (secondCurr/firstCurr))
    }
    const changeSecondValues =(sum)=>{
        setSecondCurrSumm(sum * (firstCurr/secondCurr)) 
    }
    const changeSides = ()=>{
        // setFirstCurrSumm(secondCurrSumm)
        // setSecondCurrSumm(firstCurrSumm)
        setFirstCurr(secondCurr)
        setSecondCurr(firstCurr)
        document.getElementById('change-icon').classList.toggle('mirror');
    }
    console.log('MAIN RENDER ' +firstCurr)
    // var classNames = ''
    return (
        <>
            <div className="curr_conteiner">
                <div>
                    <Input 
                        type="number" 
                        placeholder="перша валюта"
                        setValue={setFirstCurrSumm}
                        changeValue={changeSecondValues}
                        value={firstCurrSumm}
                        /> <br/>
                    <Select name='first_curr' setValue={setFirstCurr} values={currencies} value={firstCurr}/>
                </div>
                <div> <img id="change-icon" src={change} alt="replace" onClick={changeSides} ></img></div>
               <div> 
                    <Input 
                        type="number" 
                        placeholder="друга валюта"
                        setValue={setSecondCurrSumm}
                        changeValue={changeFirstValues}
                        value={secondCurrSumm}
                        /><br/>
                    <Select name='second_curr'  setValue={setSecondCurr} values={currencies} value={secondCurr}/>
                </div>
            </div>
        </>
    )
}

const Select =({name, setValue, values, value})=>{
    const [checked, setChecked] = useState(value)

    useEffect(()=>{
        setChecked(value)
    },[value])
    // const options = useMemo(()=>values.map((value, i)=>{
    //     return(
    //         <option value={value.sale} 
    //                 key={i} 
    //                 style={{backgroundImage: `url('${require(`./images/${value.ccy}.png`)}')`}}
    //                 selected={(checked === value.sale) ? true: false}
    //                 >
    //             {value.ccy}         
    //         </option>)
    // }),[])

    
    const options = values.map((v, i)=>{
        console.log('cycle')
        return(
            <option value={v.sale} 
                    key={i} 
                    style={{backgroundImage: `url('${require(`./images/${v.ccy}.png`)}')`}}
                    selected={(checked === +v.sale) ? true: false}
                    >
                {v.ccy}         
            </option>)
    })

    console.log("rerender" + value + " " + checked)
    return(
        <select name={name}
                id={name} 
                size={4} 
                onChange={(event)=> {
                    setValue(parseFloat(event.target.value));
                    setChecked(parseFloat(event.target.value))
                }  }>
            <option value={1} 
                    selected={(checked === 1) ? true: false}
                    style={{backgroundImage: `url('${require(`./images/UAH.png`)}')`}}>UAH</option>
            {options}
        </select>
    )  
}
const Input = (props) => {
    return (
        <input onChange={(event)=>{props.setValue(parseFloat(event.target.value));
            props.changeValue(parseFloat(event.target.value))
        } } 
        // [^a-zA-Z] (/\D/g, '').replace(/[a-z]/gi, '')
               value={props.value}
               type={props.type}
               placeholder={props.placeholder}
			   className="input100"/>
    );
};
export default Conversion