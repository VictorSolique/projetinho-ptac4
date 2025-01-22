'use client'
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { parseCookies } from "nookies";
import { ApiURL } from "../config"; // Certifique-se de que essa URL está correta
import ReservasType from "../interfaces/reserva";

export default function UserProfilePage() {
    const [userProfile, setUserProfile] = useState(null);
    const [reservas, setReservas] = useState<ReservasType[]>([]);
    const { 'restaurant-token': token } = parseCookies();

    useEffect(() => {
        // Funções para buscar o perfil do usuário e reservas
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`${ApiURL}/perfil/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (!data.erro) {
                    setUserProfile(data.usuario);
                } else {
                    console.error(data.mensagem);
                }
            } catch (error) {
                console.error('Erro ao buscar perfil do usuário:', error);
            }
        };

        const fetchUserReservas = async () => {
            try {
                const response = await fetch(`${ApiURL}/reservas`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (!data.erro) {
                    setReservas(data.reservas);
                } else {
                    console.error(data.mensagem);
                }
            } catch (error) {
                console.error('Erro ao buscar reservas do usuário:', error);
            }
        };

        fetchUserProfile();
        fetchUserReservas();
    }, [token]);

    const handleUpdateProfile = async () => {
        const updatedProfile = {
            usuario: {
                nome: userProfile.nome,
                email: userProfile.email,
            }
        };

        try {
            const response = await fetch(`${ApiURL}/perfil/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updatedProfile),
            });

            const data = await response.json();
            if (!data.erro) {
                console.log(data.mensagem);
            } else {
                console.error(data.mensagem);
            }
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
        }
    };

    const handleCancelReservation = async (id) => {
        const reservationToCancel = { reservaId: id };

        try {
            const response = await fetch(`${ApiURL}/reservas`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(reservationToCancel),
            });

            const data = await response.json();
            if (!data.erro) {
                setReservas(reservas.filter(reserva => reserva.id !== id));
                console.log(`Reserva ${id} cancelada.`);
            } else {
                console.error(data.mensagem);
            }
        } catch (error) {
            console.error('Erro ao cancelar reserva:', error);
        }
    };

    if (!userProfile) {
        return <div>Carregando perfil...</div>;
    }

    return (
        <div>
            <Header />

            <main className="container mt-5">
                <h1 className="text-center mb-4" style={{ color: "#343a40" }}>Perfil do Usuário</h1>
                <div className="row">
                    {/* Coluna para Reservas */}
                    <div className="col-md-8">
                        <h3 className="text-center mb-3" style={{ color: "#007bff" }}>Minhas Reservas</h3>
                        <div className="list-group">
                            {reservas.length > 0 ? (
                                reservas.map((reserva) => (
                                    <div key={reserva.id} className="list-group-item d-flex justify-content-between align-items-center">
                                        <div>
                                            <h5 className="mb-1">Mesa {reserva.mesa_id}</h5>
                                            <p className="mb-1">Número de Pessoas: {reserva.n_pessoas}</p>
                                            <small>Data: {new Date(reserva.data).toLocaleDateString()}</small>
                                        </div>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleCancelReservation(reserva.id)}
                                        >
                                            Cancelar Reserva
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="list-group-item">Nenhuma reserva encontrada.</div>
                            )}
                        </div>
                    </div>

                    {/* Coluna para Perfil do Usuário */}
                    <div className="col-md-4">
                        <div className="card bg-light mb-4 shadow-sm">
                            <div className="card-body">
                                <h2 className="card-title" style={{ color: "#343a40" }}>{userProfile.nome}</h2>
                                <p className="card-text">Email: {userProfile.email}</p>
                                <button onClick={handleUpdateProfile} className="btn btn-primary">
                                    Atualizar Perfil
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-light text-center py-3">
                <div className="container">
                    <p className="float-end">
                        <a href="#">Voltar ao topo</a>
                    </p>
                    <p className="mb-0">&copy; 2024 Restaurante Delícias, Inc. &middot; <a href="#">Privacidade</a> &middot; <a href="#">Termos</a></p>
                </div>
            </footer>
        </div>
    );
}