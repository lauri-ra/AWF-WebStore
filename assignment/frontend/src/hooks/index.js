import { useState } from 'react';

/**
 *
 * @param {string} type
 * @returns Simple hook to simplify the use of forms.
 * Sets the type and value dynamically for any variable that the hook is used on.
 */
export const useField = (type) => {
	const [value, setValue] = useState('');

	const onChange = (event) => {
		setValue(event.target.value);
	};

	return {
		type,
		value,
		onChange,
	};
};
