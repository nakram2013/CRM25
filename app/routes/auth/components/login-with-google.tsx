import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import React from 'react';
import { apiService } from '~/api/ApiService';
import { Link, useNavigate } from "react-router";
import { toast } from 'sonner';

const LoginWithGoogle: React.FC = () => {
    const navigate = useNavigate();
    const handleLogin = async (credentialResponse: CredentialResponse) => {

        if (credentialResponse.credential) {
            try {
                const res = await apiService.post("/api/account/LoginwithSocial", {
                    token: credentialResponse.credential as string,
                    type: "Google"
                });
                if (res.token != "") {
                    localStorage.setItem("authToken", res.token);
                    navigate('/');
                } else {
                    toast.error(res.message);
                }
            } catch (error) {
                console.error("Error while sending token to server:", error);
            }
        } else {
            console.error("No credential received from Google");
        }
    };

    return (
        <GoogleLogin
            onSuccess={handleLogin}
            onError={() => console.log('Login Failed')}
        />
    );
};

export default LoginWithGoogle;
