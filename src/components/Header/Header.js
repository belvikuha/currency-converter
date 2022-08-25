import {useEffect, useState} from 'react'



const Header =({usd, eur})=>{
   

    return (
        <div className='header'>
            <p align='center'>
                ${usd}/€{eur}
            </p>
            {/* <ul>
                <li>usd : </li>
                <li>eur : </li>
            </ul> */}
        </div>
    )

}

export default Header