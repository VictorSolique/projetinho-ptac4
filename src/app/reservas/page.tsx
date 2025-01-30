'use client';
import { ChangeEvent, useState, useEffect } from "react";
import { ApiURL } from "../config";
import MesasType from "../interfaces/mesa";
import ReservasType from "../interfaces/reserva";
import styles from "../page.module.css";
import Header from "../components/Header";
import { parseCookies } from "nookies";
import ResponseSignin from "../interfaces/response";

export default function Reservas() {
    const [mesas, setMesas] = useState<MesasType[]>([]);
    const [reserva, setReserva] = useState<ReservasType>({
        usuario_id: 0,
        mesa_id: 0,
        data: new Date,
        n_pessoas: 0,
        status: false
    })

    const [dateTables, setDateTables] = useState(getDateNow());
    const [mesaSelecionada, setMesaSelecionada] = useState<number | null>(null);
    const [msgError, setMsgError] = useState<string | null>(null);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${ApiURL}/mesa`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();
                setMesas(data.mesas);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    function getDateNow() {
        const today = new Date();
        return today.toISOString().split("T")[0];
    }
    function handleChangeDate(e: ChangeEvent<HTMLInputElement>) {
        setDateTables(e.target.value);
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { 'restaurant-token': token } = parseCookies();


        const response = await fetch(`${ApiURL}/reservas/novo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ ...reserva, mesa_id: mesaSelecionada })
        });

        setReserva((reservaAnterior) => ({
            ...reservaAnterior,
            mesa_id: Number(mesaSelecionada)
        }));

        if (response) {
            const data: ResponseSignin = await response.json();
            const { erro, mensagem, token = '' } = data;
            console.log(data)
            if (erro) {
                setMsgError(mensagem);
            } else {
                console.log('Reserva cadastrada:', reserva);
            }
        } else {
            setMsgError("Resposta não respondida");
        }
    };

    const alterarData = (novaData: string) => {

        setReserva((reservaAnterior) => ({
            ...reservaAnterior,
            data: new Date(novaData)
        }));
    }

    const alterarNumPessoas = (numPessoas: string) => {
        setReserva((reservaAnterior) => ({
            ...reservaAnterior,
            n_pessoas: Number(numPessoas)
        }));
    }

    return (
        <div>
            <Header />
            <div className="container">
                <h1 className="mb-2">Reservas de Mesas</h1>
                <hr />
                <div className="row">
                    <div className="col">
                        <input
                            type="date"
                            value={dateTables}
                            min={getDateNow()}
                            className="p-2 border rounded mb-3"
                            onChange={handleChangeDate}
                        />
                        <div className="w-full lg:w-1/4 bg-gray-100 p-4 border-t lg:border-t-0 lg:border-l">
                            {mesaSelecionada !== null && (
                                <div>
                                    <h2 className="text-xl font-bold mb-4">Reservar Mesa {mesaSelecionada}</h2>
                                    <p>Código da mesa: {mesas[mesaSelecionada-1].codigo} </p>
                                    <form className="flex flex-col space-y-4" onSubmit={onSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="dateInput" className="form-label">Data da Reserva</label>
                                            <input
                                                type="date"
                                                id="dateInput"
                                                className={`p-2 border rounded mb-3 ${styles.customDateInput}`}
                                                value={reserva.data.toISOString().split("T")[0]}
                                                onChange={(e) => alterarData(e.target.value)}
                                                min={getDateNow()}
                                            />
                                            <div className="form-text">Coloque a data que irá reservar a mesa</div>
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor="numPessoasInput" className="form-label">Número de pessoas na mesa</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="numPessoasInput"
                                                value={reserva.n_pessoas}
                                                onChange={(e) => alterarNumPessoas(e.target.value)}
                                                min={1}
                                                max={mesas[mesaSelecionada-1].n_lugares}
                                            />

                                            <div className="form-text">Coloque o número de pessoas que irão reservar a mesa ({mesas[mesaSelecionada-1].n_lugares})</div>
                                        </div>
                                        {msgError &&
                                            <div className="d-flex justify-content-center mb-2">
                                                <p className="text-danger"> {msgError} </p>
                                            </div>
                                        }
                                        <button type="submit" className="btn btn-primary">Reservar Mesa</button>
                                    </form>
                                </div>
                            )}
                            {mesaSelecionada === null && <p className="text-gray-700 text-center">Selecione uma mesa para reservar</p>}
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="row row-cols-2 d-flex justify-content-center">
                            {mesas.map(table => (
                                <div
                                    onClick={() => setMesaSelecionada(Number(table.id))}
                                    key={table.id}
                                    className={`col m-2 mb-4 p-2 ${styles.mesa} bg-light shadow`}
                                    style={{ width: "200px" }}
                                >
                                    <img
                                        src="https://png.pngtree.com/png-vector/20230318/ourmid/pngtree-restaurant-table-with-chair-design-white-background-vector-png-image_6653956.png"
                                        alt={`Mesa ${table.id}`}
                                        className="text-center img-fluid rounded"
                                    />
                                    <h4>Mesa 0{table.id} - {table.n_lugares} cadeiras</h4>

                                    <p><span className="material-symbols-outlined text-bottom">group</span> Disponível </p>
                                </div>
                            )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}