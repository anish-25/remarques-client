import loaderHoc from "../hoc/LoaderHoc"

//Protected
import Homepage from "../pages/protected/Homepage"

//Public
import Login from "../pages/public/Login"
import Register from "../pages/public/Register"
import VerifyOtp from "../pages/public/VerifyOtp"

//Public - With Loader
const loginWithLoader = () => loaderHoc(Login)
const RegisterLoader = () => loaderHoc(Register)
const VerifyOtpWithLoader = () => loaderHoc(VerifyOtp)

//Proteced - With Loader
const HomePagepWithLoader = () => loaderHoc(Homepage)

export const protectedRoutes =
    [
        {
            path: '/home',
            component: HomePagepWithLoader
        }
    ]


export const publicRoutes =
    [
        {
            path: "/login",
            component: loginWithLoader
        },
        {
            path: "/register",
            component: RegisterLoader
        },
        {
            path: "/verify-otp",
            component: VerifyOtpWithLoader
        }
    ]
