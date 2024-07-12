// import { cookies } from "next/headers";
// import { jwtDecode } from "jwt-decode";

// export const auth = async () => {
//   try {
//     const cookiesList = cookies();

//     const hasCookies = cookiesList.has("token");
//     if (hasCookies) {
//       const token = cookiesList.get("token")?.value;
//       const decodedToken: any = jwtDecode(token!);
//       const data = decodedToken?.data;
//       return data;
//     } else return null;
//   } catch (error: any) {
//     console.log(error.message);
//     return error;
//   }
// };
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export const auth = async () => {
  try {
    const cookiesList = cookies();
    const token = cookiesList.get("token")?.value;
    console.log("Token:", token); // Log the token for debugging

    if (!token) return null;

    const decodedToken: any = jwtDecode(token);
    console.log("Decoded Token:", decodedToken); // Log the decoded token for debugging

    return decodedToken;
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
};
