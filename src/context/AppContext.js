import React, { createContext, useReducer, useState,useContext } from 'react';
import { FaClosedCaptioning, FaCog } from 'react-icons/fa';

// 5. The reducer - this is used to update the state, based on the action
export const AppReducer = (state, action) => {
    
    let new_expenses = [];
    switch (action.type) {
       
        case 'INCREMENT':
            state.Spent=0;
            state.expenses.map((expense)=>{
               if(state.Spent+action.payload.allocated_budget>expense.budget){
                    alert("Budget OverFlow!.\nNot Possible");
               }
               else{
                    if(expense.name===action.payload.name ){
                        expense.allocated_budget=expense.allocated_budget+action.payload.allocated_budget;
                    
                    }
                    state.Spent=state.Spent+expense.allocated_budget;
                    new_expenses.push(expense);
                    return true;
               }
            });
            state.expenses=new_expenses;
            action.type="DONE";
            return{
                ...state,
            }

            case 'DECREMENT':
                state.Spent=0;
                state.expenses.map((expense)=>{
                    if(state.Spent-action.payload.allocated_budget<0){
                        alert("Not Possible!!!");
                   }
                   else{
                        if(expense.name===action.payload.name){
                            expense.allocated_budget=expense.allocated_budget-action.payload.allocated_budget;
                        
                        }
                        new_expenses.push(expense);
                        state.Spent=state.Spent+expense.allocated_budget;
                        return expense.allocated_budget;
                   }
                    
                });
                state.expenses=new_expenses;
               
                action.type="DONE";
                return{
                    ...state,
                }
    
        case 'INCREMENT_BY10':
            state.Spent=0;
            state.expenses.map((expense)=>{
                if(state.Spent+10>expense.budget){
                    alert("Budget OverFlow!.\nNot Possible");
               }
               else{
                    if(expense.name===action.payload.name){
                        expense.allocated_budget=expense.allocated_budget+10;
                    }
                    new_expenses.push(expense);
                    state.Spent=state.Spent+expense.allocated_budget;
                    return expense.allocated_budget;
               }
                
            });
            state.expenses=new_expenses;
           
            action.type="DONE";
            return{
                ...state,
            }
        case 'DECREMENT_BY10':
            state.Spent=0;
            state.expenses.map((expense)=>{
                if(state.Spent-10>expense.budget){
                    alert("Not Possible!!!");
               }
               else{
                    if(expense.name===action.payload.name){
                        expense.allocated_budget=expense.allocated_budget-10;
                    }
                    new_expenses.push(expense);
                    state.Spent=state.Spent+expense.allocated_budget;
                    return expense.allocated_budget;
               }
                
            });
            state.expenses=new_expenses;
           
            action.type="DONE";
            return{
                ...state,
            }
        
        case 'DELETE_ITEM':
            state.Spent=0;
            state.expenses.map((expense)=>{
                if(state.Spent+action.payload.allocated_budget>expense.budget){
                    alert("Budget OverFlow!!!");
               }
               else{
                    if(expense.name === action.payload.name) {
                        expense.allocated_budget= 0;
                    }
                    new_expenses.push(expense);
                    state.Spent=state.Spent+expense.allocated_budget;
                    return expense.allocated_budget;
               }
               
            })
            state.expenses = new_expenses;
         
            action.type = "DONE";
            return {
                ...state,
            };
        
            case 'CHG_LOCATION':
                action.type = "DONE";
                state.Location = action.payload;
                return {
                    ...state
                }
    
        default:
            return state;
    }
};



// 1. Creates the context this is the thing our components import and use to get the state
export const AppContext = createContext();

// 2. Provider component - wraps the components we want to give access to the state
// Accepts the children, which are the nested(wrapped) components
export const AppProvider = (props) => {
    

     // this to set/store inputvalue as global
     const[valueOfBuget,setValueOfBudget]=useState(0);
     const[valueOfRemainingBudget,setValueOfRemainingBudget]=useState(0);
     

    // 3. Sets the initial state when the app loads
    const initialState = {
        expenses: [
            { id: "Marketing", name: 'Marketing', allocated_budget:0,budget:setValueOfBudget },
            { id: "Finance", name: 'Finance',allocated_budget:0 ,budget:setValueOfBudget },
            { id: "Sales", name: 'Sales',allocated_budget:0 ,budget:setValueOfBudget},
            { id: "Human Resources", name: 'Human Resources',allocated_budget:0 ,budget:setValueOfBudget},
            { id: "IT", name: 'IT',allocated_budget:0,budget:setValueOfBudget},
        ],
        Location: '£',
        Spent:0,
    
    };

    // 4. Sets up the app state. takes a reducer, and an initial state
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const totalExpenses = state.expenses.reduce((total, item) => {
        return (total = total + (item.unitprice*item.quantity));
    }, 0);

    state.CartValue = totalExpenses;
     
    return (
        <AppContext.Provider
            value={{
                expenses: state.expenses,
                CartValue: state.CartValue,
                Spent:state.Spent,
                dispatch,
                Location: state.Location,
                valueOfBuget,setValueOfBudget,
                valueOfRemainingBudget,setValueOfRemainingBudget,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};