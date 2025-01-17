const numberRegex = /^\d*$/;

export const validNumber = (number: string): boolean => {
	return !numberRegex.test(number);
};
