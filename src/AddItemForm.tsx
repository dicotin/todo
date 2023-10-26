import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    id:string
    addItem:(newTitle:string,id:string)=>void

}
export const AddItemForm = (props: AddItemFormPropsType) => {
    const [newItemTitle,setNewItemTitle] = useState('');
    const [error,setError] = useState<string|null>(null);
    const addItem = () =>{
        if(newItemTitle.trim() === ''){
            setError('Title is required');
            setNewItemTitle('');
            return;
        }
        props.addItem(newItemTitle.trim(),props.id);
        setNewItemTitle('');
    }
    const changeInputItemTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setNewItemTitle(e.currentTarget.value)
    };
    const setItemOnKeyPress = (e:KeyboardEvent<HTMLInputElement>) =>{
        if(e.key == "Enter"){
            addItem();
            setNewItemTitle('');
        }
    }
    return (
        <div>
            <input className={error ? 'error':''} value={newItemTitle} onChange={changeInputItemTitle} onKeyDown={setItemOnKeyPress}/>
            <button onClick={addItem}>+</button>

            {error && <div className='error-message'> {error} </div>}
        </div>
    );
}