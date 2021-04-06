import React from 'react'

export default function FormInput({onValidityChange,inputRef,...props}){

    const [state, setState] = React.useState('');

    const validation = () => {
        setState({
            valid: inputRef.current.validity.valid,
            msg: inputRef.current.validationMessage,
            value: inputRef.current.value
        });
        onValidityChange(state);
    }

    return(
        <input 
        className={props.className} 
        value={props.value}
        onClick={validation}
        onChange={validation}
        onBlur={validation}
        ref={inputRef}
        type={props.type}
        minLength={props.minLength||""}
        maxLength={props.maxLength||""}
        required={props.required}
        ></input>
    )
}