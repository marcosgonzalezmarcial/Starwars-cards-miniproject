export const inputs = [
	{
		id: 1,
		name: 'username',
		type: 'text',
		placeholder: 'username',
		errorMessage:
			"First name should be 3-16 characters and shouldn't include any special character!",
		label: 'username',
		pattern: '^[A-Za-z0-9]{3,16}$',
		required: true,
	},
	{
		id: 2,
		name: 'email',
		type: 'email',
		placeholder: 'email',
		errorMessage: 'It should be a valid email address!',
		label: 'Email',
		required: true,
	},
	{
		id: 3,
		name: 'password',
		type: 'password',
		placeholder: 'password',
		errorMessage:
			'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character (!@#$%^&*) !',
		label: 'Password',
		required: true,
		pattern:
			'^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$',
	},
	{
		id: 4,
		name: 'confirmPassword',
		type: 'password',
		placeholder: 'confirm password',
		errorMessage: "Passwords don't match!",
		label: 'Confirm Password',
		pattern: values => (values ? values.password : undefined),
		required: true,
	},
]
