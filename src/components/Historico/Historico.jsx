/* eslint-disable react/prop-types */
import "./Historico.css"
import { IoTrashBin } from "react-icons/io5";
import { FaCircleArrowUp, FaCircleArrowDown } from "react-icons/fa6";
import { useState } from "react"; 

export default function Historico({ transactionsGroupedByMonth, onDelete }) {
    const [selectedMonth, setSelectedMonth] = useState('');
    const meses = Object.keys(transactionsGroupedByMonth);

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    return (
        <div className="historico">

            <div className="historico-select-container">
                <div className="custom-select-wrapper">
                    <select id="mes" name="mes" value={selectedMonth} onChange={handleMonthChange}>
                        <option value="">Selecione</option>
                        {meses.map((mes, index) => (
                            <option key={index} value={mes}>{mes}</option>
                        ))}
                    </select>
                </div>
            </div>


            {selectedMonth === '' ? (
                <h1 className="historico-title-sem-registro">Nenhum registro selecionado</h1>
            ) : transactionsGroupedByMonth[selectedMonth] && transactionsGroupedByMonth[selectedMonth].length > 0 ? (
                <div className="historico-table-container">
                    <table className="historico-table">
                        <thead>
                            <tr className="historico-table-title">
                                <th>Descrição</th>
                                <th>Valor</th>
                                <th>Tipo</th>
                                <th>Data</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactionsGroupedByMonth[selectedMonth].map((data, index) => (
                                <tr key={index} className="historico-data">
                                    <td className="historico-data-item">{data.descricao}</td>
                                    <td className="historico-data-item money">{`R$: ${data.valor}`}</td>
                                    <td className="historico-data-item">
                                        {data.tipo === "entrada" ? <FaCircleArrowUp color="green" /> : <FaCircleArrowDown color="red" />}
                                    </td>
                                    <td className="historico-data-item">{data.data}</td>
                                    <td className="historico-data-item-apagar" onClick={() => onDelete(index, selectedMonth)}>
                                        <IoTrashBin className="lixeira" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}
