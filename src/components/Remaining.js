import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const  Remaining= () => {
    const {  Location,Spent } = useContext(AppContext);

    // this to set/store inputvalue as global
    const{ valueOfBuget,setValueOfBudget}=useContext(AppContext);
  
    return (     
            <div className='alert alert-success '>
                <span>Remaining: {Location}{valueOfBuget-Spent}</span>
            </div>  
    );
};
export default Remaining;