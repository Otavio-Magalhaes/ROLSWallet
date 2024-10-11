import "./Home.css"
import Botao from "../../components/Botao/Botao";
import logo from "../../assets/logo.png"
import { useNavigate } from "react-router-dom";

export default function Home(){
    const navigate = useNavigate()
    
    return(
        <section className="home">
            <img src={logo} className="home-logo"/>
            <Botao label="Começar" onClick={() => navigate('/login')} type="none"/>
        </section>
    )
}