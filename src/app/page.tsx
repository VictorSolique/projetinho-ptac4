'use client'
import styles from "./page.module.css"
import Link from "next/link";
import Button from "./components/Button";
import MyInput from "./components/Input";
import { AUTOMATIC_FONT_OPTIMIZATION_MANIFEST } from "next/dist/shared/lib/constants";

export default function Home() {
  return (
    <div>

    <div className="container">
    <nav className="navbar navbar-expand-lg bg-body-tertiary rounded" aria-label="Eleventh navbar example">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample09">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" aria-disabled="true">Disabled</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
          </ul>
          <form role="search">
            <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
          </form>
        </div>
      </div>
    </nav>

    <nav className="navbar navbar-expand-lg bg-body-tertiary rounded my-3" aria-label="Twelfth navbar example">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample10" aria-controls="navbarsExample10" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-md-center" id="navbarsExample10">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Centered nav only</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" aria-disabled="true">Disabled</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div>
      <div className="bg-body-tertiaryp-5 rounded">
        <div className="col-sm-8 mx-auto">
          <h1>Navbar examples</h1>
          <p>This example is a quick exercise to illustrate how the navbar and its contents work. Some navbars extend the width of the viewport, others are confined within a <code>.container</code>. For positioning of navbars, checkout the <a href="../examples/navbar-static/">top</a> and <a href="../examples/navbar-fixed/">fixed top</a> examples.</p>
          <p>At the smallest breakpoint, the collapse plugin is used to hide the links and show a menu button to toggle the collapsed content.</p>
          <p>
            <a className="btn btn-primary" href="../components/navbar/" role="button">View navbar docs &raquo;</a>
          </p>
        </div>
      </div>
    </div>
  </div>








        <h1>Login Necessário</h1>
        <p>Realize o login para poder acessar cadastro</p>
        <Link href={"/login"} className={styles.link}>Ir para login</Link>
        <h1>Atividade 2 - PTAC4</h1>
        <p>Três Interfaces</p>
        <Link href={"/cadastro"} className={styles.link}>Ir para página Cadastro</Link>
        <p style={{fontSize: "12px"}}>Dupla: Anabela e Victor Solique</p>
    </div>

  );
}