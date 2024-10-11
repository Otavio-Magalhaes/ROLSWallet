import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Wallet from "../pages/Wallet/Wallet";
import Login from "../pages/Login/Login"
import Home from "../pages/Home/Home"

export default function AppRoutes(){

    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/wallet" element={<Wallet/>}/>
            </Routes>
        </Router>
    )
}