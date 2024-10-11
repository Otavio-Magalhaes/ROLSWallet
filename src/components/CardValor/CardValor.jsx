import "./CardValor.css"

export default function CardValor({titulo, icone: Icone, valor}){
    return(
        <div className="card-valor-container">
            <div className="card-valor-container-titulo">
                <p className="card-valor-titulo">{titulo}</p>
                <Icone className="card-valor-icone"/>
            </div>
            <p className="card-valor-valor">{`R$:  ${valor}`}</p>
        </div>
    )
} 