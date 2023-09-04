import jwtDecode from "jwt-decode";

export const validateAuth = () => {
	const token = localStorage.getItem("IdToken");
	if (token) {
		const decodedToken = jwtDecode(token);
		return decodedToken.exp * 1000 < Date.now();
	}
	return false;
}