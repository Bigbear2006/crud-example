import {GoogleLogin} from "@react-oauth/google";
import apiService from "../apiService";


export default function LoginViaGoogle() {
    return <GoogleLogin onSuccess={rsp => apiService.googleLogin(rsp.credential)}/>
}