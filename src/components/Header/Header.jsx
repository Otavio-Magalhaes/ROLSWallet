import "./Header.css"
import logo from "../../assets/logo.png"
import logoA from "../../assets/logoA.png"

export default function Header({isLargeScreen}){
  

    return(
        <header className="header-container">
            {isLargeScreen ? 
                <div >
                    <img className ="logoA"src={logoA} />
                    <span>
                        <h1>ROLS Wallet</h1>
                    </span>
                </div>
                :
                <>
                    <img src= {logo} className="header-logo"/>
                </>
            }
        </header>
    )
}