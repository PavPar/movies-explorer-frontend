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
                {...props.required}
                ref={inputRef}
                onChange={
                    validation
                }
                onBlur={
                    validation
                }
            ></input>
            <p className="form__errorfield">{errorMsg}</p>
        </div>
    )
}
