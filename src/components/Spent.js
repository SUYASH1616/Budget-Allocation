import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Spent = () => {
    const {  Location, Spent} = useContext(AppContext);

    return (     
            <div className='alert alert-danger'>
                <span>Spent: {Location}{Spent}</span>
            </div>  
    );
};

export default Spent;