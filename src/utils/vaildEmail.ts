const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const validEmail = (email: string): boolean => {
	return !emailRegex.test(email);
};
