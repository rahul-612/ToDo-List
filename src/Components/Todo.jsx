import React, { useState, useEffect } from 'react'
import '../App.css';
import logo from '../Images/logo.png';


// to get the data from LS

const getLocalItmes = () => {
    let list = localStorage.getItem('lists');
    // console.log(list);

    if (list) {
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return [];
    }
}

const Todo = () => {


    const [inputData, setInputData] = useState()
    const [items, setItems] = useState(getLocalItmes());
    // const [items,setItems]=useState([]);

    const [toggleSubmit,setToggleSubmit]=useState(true);
    const [isEditItem,setIsEditItem]=useState(null);

    const addItem = () => {
        if (!inputData) {
            alert(`Sorry you have to fill the input!`)
        }
        else if(inputData&&!toggleSubmit){
            setItems(
                items.map((elem)=>{
                    if(elem.id===isEditItem){
                        return{...elem,name:inputData}
                    }
                    return elem;
                })
            )
            setToggleSubmit(true);
            setInputData('');
            setIsEditItem(null);
        }
        else {
            
            const allInputData = { id: new Date().getTime().toString(), name: inputData };
            setItems([...items, allInputData]);
            setInputData('');
        }
    }

    //delete Items
    const deleteItem = (index) => {
        const updatedItems = items.filter((elem) => {
            return index !== elem.id;  
        });
        setItems(updatedItems);
    };

    const removeAll = () => {
        setItems([]);
    }

    // add data to localStorage
    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items))
    }, [items]);

    //Edit Items
    //     When user clikc on edit button 
// 1: get the id and name of the data which user clicked to edit
// 2: set the toggle mode to change the submit button into edit button
// 3: Now update the value of the setInput with the new updated value to edit. 
// 4: To pass the current element Id to new state variable for reference 
    const editItem=(id)=>{
        let newEditItem=items.find((elem)=>{
            return elem.id===id;        //first step
        })
        setToggleSubmit(false);         //second step
        setInputData(newEditItem.name)  //third step
        setIsEditItem(id);              //fourth step
    }


    return (
        <>
            <div className='main-div'>
                <div className='child-div'>
                    <figure>
                        <img src={logo} alt="logo" />
                        <figcaption>Add Your List Here ⏳</figcaption>
                    </figure>

                    <div className="addItems">
                        <input type="text" placeholder="✍️ Add items..." value={inputData} onChange={(event) => {
                            setInputData(event.target.value)
                        }} />
                        {
                            toggleSubmit?
                        <i className="fa fa-plus add-btn" title="Add Item" onClick={addItem}></i>:
                        <i className="far fa-edit add-btn" title="Update Item" onClick={addItem}></i>
                        }
                    </div>

                    <div className="showItems">
                        {
                            items.map((elem) => {
                                return (
                                    <div className="eachItem" key={elem.id}>
                                        <h3>{elem.name}</h3>
                                        <div className="todo-btn">

                                        <i className="far fa-edit add-btn" title="Edit Item" onClick={() => editItem(elem.id)}></i>
                                        <i className="far fa-trash-alt add-btn" title="Delete Item" onClick={() => deleteItem(elem.id)}></i>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    {/* Clear All Button aur data-sm-link-text se hume jo hover krne p mil rha h wo h */}

                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span>CHECK LIST</span></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo
