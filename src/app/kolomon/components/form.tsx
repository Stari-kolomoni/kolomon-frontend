import React, { ChangeEvent, FormEvent, ReactNode } from "react";
import { getClassNameString } from "../../core/utilities";

interface FormProps {
    children?: ReactNode,
    onSubmit?: (event: FormEvent<HTMLFormElement>) => void | null,
    className?: string,
}

/**
 * Create a new form element.
 *
 * @param children Automatically passed children components.
 * @param onSubmit On submit function callback.
 * @param className Additional CSS classes to apply.
 * @constructor
 */
const Form = ({ children, onSubmit, className }: FormProps): JSX.Element => (
    <form onSubmit={onSubmit} className={getClassNameString("km-form", className)}>
        {children}
    </form>
);

Form.defaultProps = {
    children: null,
    className: "",
    onSubmit: null,
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

/**
 * Create a new form text input element.
 *
 * @param label Text input label.
 * @param placeholder Text input placeholder.
 * @param id Element ID.
 * @param classNameContainer Additional CSS classes to apply to the text input container.
 * @param classNameLabel Additional CSS classes to apply to the text input label.
 * @param classNameInput Additional CSS classes to apply to the text input itself.
 * @param value Value of the text input.
 * @param onChange On change callback of the text input.
 * @constructor
 */
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

/**
 * Create a new form text input element (but without any label).
 *
 * @param placeholder Text input placeholder.
 * @param onChange On change callback of the text input.
 * @param id Element ID.
 * @param value Value of the text input.
 * @param classNameInput Additional CSS classes to apply to the text input itself.
 * @constructor
 */
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
