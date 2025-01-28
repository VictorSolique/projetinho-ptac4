import Link from "next/link";

export default function Header() {
    return (
        <header data-bs-theme="dark">
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Restaurante Delícias</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav me-auto mb-2 mb-md-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href={"/login"}>Cardápio</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" href={"/login"}>Reservas</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" href={"/cadastro"}>Cadastrar</Link>
                            </li>
                        </ul>
                        <div className="d-flex" role="search">
                            <Link href={"/login"} className="btn btn-outline-success">Fazer login</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}