import "./Botao.css"

export default function Botao({label, type="submit", onClick} ){


    return(
        <div className="botao-container">
            <button className="botao-texto" onClick={onClick}>
                {label}
            </button>
        </div>
    )
}