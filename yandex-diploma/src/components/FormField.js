import React from 'react';

export default function FormField({ type = "", name = "", errorMsg = "", inputRef, onValidityChange, ...props }) {
    const [state, setState] = React.useState('');

    const validation = () => {
        setState({
            valid: inputRef.current.validity.valid,
            msg: inputRef.current.validationMessage,
            value: inputRef.current.value
        });
        onValidityChange(state);
    }
    return (
        <div className="form__field">
            <p className="form__fieldname">{name}</p>
            <input
                className="form__input"
                type={type}
                required={props.required}
                ref={inputRef}
                onClick={
                    validation
                }
                onChange={
                    validation
                }
                onBlur={
                    validation
                }
                onFocus={
                    validation
                }
                minLength={props.minLength||""}
                maxLength={props.maxLength||""}
            ></input>
            <p className="form__errorfield">{state.msg || ""}</p>
        </div>
    )
}
