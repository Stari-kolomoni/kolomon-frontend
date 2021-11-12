import React, { ChangeEvent, FormEvent, ReactNode } from "react";
import { getClassNameString } from "../../core/utilities";

interface FormProps {
    children?: ReactNode,
    onSubmit?: (event: FormEvent<HTMLFormElement>) => void,
    className?: string,
}

const Form = ({ children, onSubmit, className }: FormProps): JSX.Element => (
    <form onSubmit={onSubmit} className={getClassNameString("km-form", className)}>
        {children}
    </form>
);

Form.defaultProps = {
    children: null,
    className: "",
    onSubmit: () => null,
};


interface FormTextInputProps {
    label?: string,
    placeholder?: string,
    id: string,
    classNameContainer?: string,
    classNameLabel?: string,
    classNameInput?: string,
    value: string,
    onChange: ((event: ChangeEvent<HTMLInputElement>) => void),
}

const FormTextInput = (
    {
        label, placeholder, id,
        classNameContainer,
        classNameLabel, classNameInput,
        value, onChange,
    }: FormTextInputProps,
): JSX.Element => (
    <div className={getClassNameString("km-input-label-container", classNameContainer)}>
        <label
            htmlFor={id}
            className={getClassNameString("km-label", classNameLabel)}
        >
            {label}
        </label>
        <input
            className={getClassNameString("km-input", classNameInput)}
            id={id}
            value={value}
            onChange={onChange}
            type="text"
            placeholder={placeholder}
        />
    </div>
);

FormTextInput.defaultProps = {
    label: "",
    placeholder: "",
    classNameContainer: null,
    classNameLabel: null,
    classNameInput: null,
};

interface FormTextInputNoLabelProps {
    placeholder?: string,
    id: string,
    classNameInput?: string,
    value: string,
    onChange: ((event: ChangeEvent<HTMLInputElement>) => void),
}

const FormTextInputNoLabel = (
    {
        placeholder, onChange, id,
        value, classNameInput,
    }: FormTextInputNoLabelProps,
): JSX.Element => (
    <input
        className={getClassNameString("km-input", classNameInput)}
        id={id}
        value={value}
        onChange={onChange}
        type="text"
        placeholder={placeholder}
    />
);

FormTextInputNoLabel.defaultProps = {
    placeholder: "",
    classNameInput: "",
};

export {
    Form,
    FormTextInput,
    FormTextInputNoLabel,
};
