import { useNavigate } from "react-router-dom"
import Botao from "../../components/Botao/Botao"
import Header from "../../components/Header/Header"
import "./Login.css"

export default function Login(){
    const navigate = useNavigate()
    
    
    return(
        <section>
                <Header/>

            <div className="login">
                <div className="login-container">
                    <form>
                        <div className="login-input-group">
                            <label>Usuário</label>
                            <input type="text"/>
                        </div>
                        <div className="login-input-group">
                            <label>Senha</label>
                            <input type="password"/>
                        </div>
                        <Botao label="Entrar" onClick={() => navigate('/wallet')} />
                        <p>Não tem uma conta <a className="login-criar-conta">Criar nova Conta</a></p>
                    </form>
                </div>
            </div>
        </section>
        )
}