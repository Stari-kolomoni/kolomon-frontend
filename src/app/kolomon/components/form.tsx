import React, { ReactNode } from "react";

interface FormProps {
    children: ReactNode,
    onSubmit?: (inputs: Record<string, any>) => void,
    className?: string,
}

const Form = ({ children, onSubmit, className }: FormProps): JSX.Element => (
    <form onSubmit={onSubmit} className={`km-form ${className}`}>
        {children}
    </form>
);

Form.defaultProps = {
    className: "",
    onSubmit: () => null,
};


interface FormTextInputProps {
    label?: string,
    placeholder?: string,
    inputId: string,
    classNameLabel?: string,
    classNameInput?: string,
}

const FormTextInput = (
    {
        label, placeholder, inputId,
        classNameLabel, classNameInput,
    }: FormTextInputProps,
): JSX.Element => (
    <label htmlFor={inputId} className={`km-form--label ${classNameLabel}`}>
        {label}
        <input
            className={`km-form--input ${classNameInput}`}
            id={inputId}
            type="text"
            placeholder={placeholder}
        />
    </label>
);

FormTextInput.defaultProps = {
    label: "",
    placeholder: "",
    classNameLabel: "",
    classNameInput: "",
};


export {
    Form,
    FormTextInput,
};
