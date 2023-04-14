import { useState } from 'react'

const FormInput = props => {
	const [focused, setFocused] = useState(false)
	const { label, errorMessage, onChange, id, name, ...inputProps } = props

	const handleFocus = () => setFocused(true)

	return (
		<>
			<label htmlFor={name}>{`${label}:`}</label>
			<input
				{...inputProps}
				onChange={onChange}
				onBlur={handleFocus}
				onFocus={() =>
					inputProps.name === 'confirmPassword' && setFocused(true)
				}
				focused={focused.toString()}
				name={name}
			/>
			<span className="error-message">{errorMessage}</span>
		</>
	)
}

export default FormInput
