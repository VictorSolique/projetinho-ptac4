import styles from "./page.module.css"
import Link from "next/link";
import Button from "./components/Button";
import MyInput from "./components/Input";

export default function Home() {
  return (
    <div className={styles.main}>
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
