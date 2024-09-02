import {GoogleLogin} from "@react-oauth/google";
import apiService from "../apiService";
import {useNavigate} from "react-router-dom";


export default function LoginViaGoogle({setIsAuthenticated}) {
    let navigate = useNavigate()
    return <GoogleLogin onSuccess={rsp => apiService.googleLogin(rsp.credential, setIsAuthenticated, navigate)}/>
}