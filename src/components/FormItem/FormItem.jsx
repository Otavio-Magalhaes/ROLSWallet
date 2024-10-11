import Botao from "../Botao/Botao"
import "./FormItem.css"
import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function FormItem({ onSubmit }) {

    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [tipo, setTipo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); 
    
        if (descricao && valor) {
            const newValue = parseFloat(parseFloat(valor).toFixed(2));
            onSubmit(descricao, newValue, tipo); 
    

            setDescricao("");
            setValor("");
        } else {
            alert('Preencha todos os campos!');
        }
    };



    return (
        <section className="form-item-container">
            <form onSubmit={handleSubmit}>
                <div className="login-inputs-container">
                    <div className="login-inputs-text-container">
                        <div className="login-input-group">
                            <label htmlFor="descricao" >Descrição</label>
                            <input
                                required
                                id="descricao"
                                type="text"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                            />
                        </div>
                        <div className="login-input-group">
                            <label htmlFor="valor">Valor</label>
                            <input
                                required
                                id="valor"
                                type="number"
                                value={valor}
                                onChange={(e) => setValor(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="login-input-radio-container">
                        <div className="login-input-radio">
                            <input
                                required
                                type="radio"
                                name="iten-option"
                                value="entrada"
                                checked={tipo === "entrada"}
                                id="entry"

                                onChange={(e) => setTipo(e.target.value)}
                            />
                            <label htmlFor="entry" >Entrada</label>
                        </div>
                        <div className="login-input-radio">
                            <input
                                required
                                type="radio"
                                name="iten-option"
                                value="saida"
                                checked={tipo === "saida"}
                                id="exit"
                                onChange={(e) => setTipo(e.target.value)}
                            />
                            <label htmlFor="exit">Saida</label>
                        </div>
                    </div>
                    <Botao label="Adicionar" />
                </div>
            </form>
        </section>
    )
}