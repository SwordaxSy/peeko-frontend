const InputField = ({
    type,
    placeholder,
    error,
    onChangeFunction,
    value,
    passwordField,
    handlePasswordMode,
    visibilityState,
}) => {
    const inputElement = (
        <input
            type={type}
            placeholder={placeholder}
            className={`text-lg p-2.5 border-none outline-none w-full ${
                error ? "text-error" : ""
            }`}
            onChange={onChangeFunction}
            value={value}
        />
    );

    return (
        <div>
            {passwordField ? (
                <div className="flex relative">
                    {inputElement}
                    <span
                        className="material-symbols-outlined text-3xl absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-70 transition select-none"
                        onClick={handlePasswordMode}
                    >
                        {visibilityState}
                    </span>
                </div>
            ) : (
                inputElement
            )}
            <div className="w-full h-1 bg-gradient-to-r from-primary-1 to-primary-2"></div>
        </div>
    );
};

InputField.defaultProps = {
    type: "text",
    passwordField: false,
};

export default InputField;
