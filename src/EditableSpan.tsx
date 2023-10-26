import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (title:string)=>void;
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const onEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    }
    const onViewMode = () => {
        setEditMode(false);
        props.changeTitle(title);
    }
    const onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>) =>{
        setTitle(e.currentTarget.value);
    }
    return (editMode ?
            <input value={title} autoFocus={true} onBlur={onViewMode} onChange={onChangeTitleHandler}/>
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
};