import React, { useEffect } from 'react';
import todo from './checklist.webp';
import { useState } from 'react';

const getStorage = () => {
    const store = localStorage.getItem('list');
        if (store) {
            return JSON.parse(localStorage.getItem('list'));
        }
     else {
        return [];
    }
}

const App = () => {
    const [getval, updatedVal] = useState();
    const [display, displayMap] = useState(getStorage());
    const [toggle, itemToggle] = useState(true);
    const [getid, gettingId] = useState(null);

    const addItems = () => {
        if (!getval) {
            alert('plz enter the data');
        }else if(getval && !toggle){
            displayMap(
                display.map((elem) => {
                    if (elem.id === getid) {
                        return {...elem , name:getval}
                    }
                    return elem;
                })
            )
            updatedVal('');
            itemToggle(true);
        }
         else {
            const inputItems = {id : new Date().getTime().toString(), name:getval}
            displayMap([...display, inputItems]);
            updatedVal('');
        }
    }
    const editItems = (ind) => {
        const itemFind = display.find((elem) => {
            return ind === elem.id;
        })
        updatedVal(itemFind.name);
        itemToggle(false);
        gettingId(ind);
    }
    const deleteItems = (index) => {
        displayMap((prev) => {
            return prev.filter((val) => {
                return index !== val.id;
            })
        })
    }
    const removeAll = () => {
        displayMap([])
    }

    useEffect(() => {
        return localStorage.setItem('list', JSON.stringify(display));
    }, [display])

    return (
    <div className='main'>
      <img src={todo} alt="no image" />
      <p>Add Your List Here ✌</p>
      <div className="search">
      ✍<input type="text" name="" value={getval} onChange={((e) => {updatedVal(e.target.value)})} placeholder='Add items...' />{toggle ? 
        <i className="fa fa-plus" aria-hidden="true" onClick={addItems}></i>
        : <i className="fa-solid fa-pen-to-square" id='edit_itemd' aria-hidden="true" onClick={addItems}></i>
      }
      </div>
      <ol>
      {display.map((elem) => {
        return <li className='search' id='list' key={elem.id}> <div>{elem.name} </div> <div><i className="fa-solid fa-pen-to-square" onClick={(() => {editItems(elem.id)})} title='edit item'></i> <i className="fa-regular fa-trash-can" title='delete item' onClick={(() => {deleteItems(elem.id)})}></i></div></li>
      })}
      </ol>
      <button onClick={removeAll}>check list</button>
    </div>
  )
}

export default App
