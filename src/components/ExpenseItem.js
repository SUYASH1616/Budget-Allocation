import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { FaTimesCircle, FaPlusCircle, FaMinusCircle } from 'react-icons/fa';

const ExpenseItem = (props) => {
    const { dispatch, Location,handleRemainingBudget,expenses,Spent} = useContext(AppContext);

    // this gitto set/store inputvalue as global
    const{ valueOfBuget,setValueOfBudget}=useContext(AppContext);

    const handleDeleteItem = () => {
        const item = {
            name: props.name,
        };
        dispatch({
            type: 'DELETE_ITEM',
            payload: item,
        });
       
    };
    const handleDecrement=()=>{
        const item={
            name:props.name,
        }

        if(Spent-10<0){
            alert("Not Possible!!!");
       }
        else{
            dispatch({
                type:'DECREMENT_BY10',
                payload:item,
            })
        }
       
    }

    const handleIncrement=()=>{
        const item={
            name:props.name,
        }
        if(Spent+10>valueOfBuget){
            alert("Budget OverFlow!.\nNot Possible");
        }
        else{
            dispatch({
                type:'INCREMENT_BY10',
                payload:item,
            })
        }
        
      
    } 

    const handleRemainin =()=>{
        console.log(1);
    }
    return (
        <tr>
        <td>{props.name}</td>
        <td>{Location}{props.allocated_budget}</td>
        <td><FaPlusCircle size='2.2em' color="green" onClick={handleIncrement} /></td>
        <td><FaMinusCircle size='2.2em' color="red" onClick={handleDecrement} /></td>
        <td><FaTimesCircle size='2.2em' color="red" onClick={handleDeleteItem}></FaTimesCircle></td>
        </tr>
    );
};

export default ExpenseItem;