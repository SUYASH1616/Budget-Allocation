import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const CartValue = () => {
    const {  Location, expenses} = useContext(AppContext);

    // this to set/store inputvalue as global
    const{ valueOfBuget,setValueOfBudget}=useContext(AppContext);
    // to store remaining budget
    const {valueOfRemainingBudget,setValueOfRemainingBudget}=useContext(AppContext);
   

    const handleonChange=(value)=>{
        setValueOfBudget(value);
        setValueOfRemainingBudget(value);
    }
    return (
    
        <div className='alert alert-primary '>
            <span>Budget: {Location}<input type="number" onChange={(e)=>handleonChange(e.target.value)}></input></span>
        </div>
  
    );
};

export default CartValue;