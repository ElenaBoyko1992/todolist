import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {IconButton, TextField} from "@material-ui/core";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = memo((props: AddItemFormPropsType) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) setError(false)
        setTitle(e.currentTarget.value)
    }
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addItem()
    }
    const addItem = () => {
        let trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }

    const userMessage =
        error
            ? <div style={{color: "hotpink"}}>Title is required!</div>
            : <div>Please, create list item`s title</div>

    return (
        <div>

            <TextField
                variant={"outlined"}
                value={title}
                onChange={changeTitle}
                onKeyDown={onKeyDownAddTask}
                error={error}
                size={"small"}
                label={"Title"}
                helperText={error && "Title is required!"}
            />
            <IconButton onClick={addItem}>
                <AddCircleIcon style={{color: 'hotpink'}}/>
            </IconButton>
            {/*            {userMessage}*/}

        </div>
    );
})

export default AddItemForm;