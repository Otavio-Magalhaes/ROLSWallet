/* eslint-disable no-unused-vars */
import "./wallet.css"
import CardValor from "../../components/CardValor/CardValor"
import FormItem from "../../components/FormItem/FormItem"
import Header from "../../components/Header/Header"
import setaRigth from "../../assets/icones/setaRigth.png"
import setaLeft from "../../assets/icones/setaLeft.png"
import Historico from "../../components/Historico/Historico"
import { MdArrowCircleUp, MdArrowCircleDown } from "react-icons/md";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { useEffect, useState } from "react"

export default function Wallet() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
 
 

  const [cards, setCards] = useState([
    {
      titulo: "Entrada",
      valor: 0,
      icone: MdArrowCircleUp,
    },
    {
      titulo: "Saida",
      valor: 0,
      icone: MdArrowCircleDown,
    },
    {
      titulo: "Total",
      valor: 0,
      icone: AiOutlineDollarCircle,
    },
  ]);

  const [groupedTransactions, setGroupedTransactions] = useState({});
  const [transactions, setTransactions] = useState([]);


  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem('historico')) || {};
    const allTransactions = Object.values(savedTransactions).flat();

    if (allTransactions.length > 0) {

      const entrada = allTransactions
        .filter((t) => t.tipo === 'entrada')
        .reduce((acc, curr) => acc + curr.valor, 0);
      
      const saida = allTransactions
        .filter((t) => t.tipo === 'saida')
        .reduce((acc, curr) => acc + curr.valor, 0);

      setCards((prevCards) => {
        const updatedCards = [...prevCards];
        updatedCards[0].valor = parseFloat(entrada.toFixed(2));
        updatedCards[1].valor = parseFloat(saida.toFixed(2));
        updatedCards[2].valor = parseFloat((entrada - saida).toFixed(2));
        return updatedCards;
      });

      setGroupedTransactions(savedTransactions);
      setTransactions(allTransactions);
    }
  }, []);



  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
 
  


  function handlePrevCard() {

    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    )
  }
  function handleNextCard() {

    setCurrentIndex((prevIndex) =>
      prevIndex === cards.length - 1 ? 0 : prevIndex + 1
    )
  }

  const handleSubmit = (descricao, newValue, type) => {
    setCards((prevCards) => {
        const updatedCards = [...prevCards];

        if (type === "entrada") {
            updatedCards[0].valor = parseFloat((updatedCards[0].valor + newValue).toFixed(2));
            updatedCards[2].valor = parseFloat((updatedCards[2].valor + newValue).toFixed(2));
        } else if (type === "saida") {
            updatedCards[1].valor = parseFloat((updatedCards[1].valor + newValue).toFixed(2));
            updatedCards[2].valor = parseFloat((updatedCards[2].valor - newValue).toFixed(2));
        }

        return updatedCards;
    });

    const newTransaction = {
        descricao: descricao,
        valor: newValue,
        tipo: type === "entrada" ? "entrada" : "saida",
        data: new Date().toLocaleDateString("pt-BR"),
    };

    const savedHistory = JSON.parse(localStorage.getItem('historico')) || {};
    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    const key = `${month} ${year}`; 

    if (!savedHistory[key]) {
        savedHistory[key] = [];
    }

    savedHistory[key].push(newTransaction);
    localStorage.setItem('historico', JSON.stringify(savedHistory));

    setGroupedTransactions(savedHistory);
    setTransactions(Object.values(savedHistory).flat());
};

const handleDelete = (index, selectedMonth) => {
    console.log(`Deleting transaction at index: ${index}, for month: ${selectedMonth}`);
    const savedHistory = JSON.parse(localStorage.getItem('historico')) || {};

    if (selectedMonth && savedHistory[selectedMonth]) {
        const transactionsForCurrentMonth = savedHistory[selectedMonth];

        if (transactionsForCurrentMonth) {
            const deletedTransaction = transactionsForCurrentMonth.splice(index, 1)[0];

            if (transactionsForCurrentMonth.length === 0) {
                delete savedHistory[selectedMonth];
            }

            localStorage.setItem('historico', JSON.stringify(savedHistory));

            setGroupedTransactions(savedHistory);
            setTransactions(Object.values(savedHistory).flat());

            const allTransactions = Object.values(savedHistory).flat();
            const entrada = allTransactions.filter((t) => t.tipo === 'entrada').reduce((acc, curr) => acc + curr.valor, 0);
            const saida = allTransactions.filter((t) => t.tipo === 'saida').reduce((acc, curr) => acc + curr.valor, 0);

            setCards((prevCards) => {
                const updatedCards = [...prevCards];
                updatedCards[0].valor = parseFloat(entrada.toFixed(2));
                updatedCards[1].valor = parseFloat(saida.toFixed(2));
                updatedCards[2].valor = parseFloat((entrada - saida).toFixed(2));
                return updatedCards;
            });
        }
    }
};








  


  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem('historico')) || {};
    const allTransactions = Object.values(savedTransactions).flat(); // Mesclar todas as transações dos meses
    
    if (allTransactions.length > 0) {
      // Atualizar os cards com base nas transações armazenadas
      const entrada = allTransactions
        .filter((t) => t.tipo === 'entrada')
        .reduce((acc, curr) => acc + curr.valor, 0);
      
      const saida = allTransactions
        .filter((t) => t.tipo === 'saida')
        .reduce((acc, curr) => acc + curr.valor, 0);

      setCards((prevCards) => {
        const updatedCards = [...prevCards];
        updatedCards[0].valor = parseFloat(entrada.toFixed(2));
        updatedCards[1].valor = parseFloat(saida.toFixed(2));
        updatedCards[2].valor = parseFloat((entrada - saida).toFixed(2));
        return updatedCards;
      });

      // Atualizar o estado das transações
      setGroupedTransactions(savedTransactions);
      setTransactions(allTransactions);
    }
  }, []);

  return (
    <section className="wallet">
      <Header isLargeScreen={isLargeScreen} />
      <div className="wallet-container-card">
        {isLargeScreen ?
          <>
            {cards.map((card, index) => (
              <CardValor
                key={index}
                titulo={card.titulo}
                valor={card.valor}
                icone={card.icone}
              />
            ))}
          </>

          : (
            <>
              <a onClick={handlePrevCard}><img src={setaLeft} /></a>
              <CardValor
                titulo={cards[currentIndex].titulo}
                valor={cards[currentIndex].valor}
                icone={cards[currentIndex].icone}
              />

              <a onClick={handleNextCard}><img src={setaRigth} /></a>
            </>
          )}
      </div>
      <FormItem onSubmit={handleSubmit} />
      <Historico transactionsGroupedByMonth={groupedTransactions} onDelete={handleDelete} />
    </section>
  )
}