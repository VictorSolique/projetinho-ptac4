import styles from "./page.module.css"
import Link from "next/link";
import Button from "./components/Button";
import MyInput from "./components/Input";

export default function Home() {
  return (
    <div className={styles.main}>
<<<<<<< HEAD
        <h1>Login Necessário</h1>
        <p>Realize o login para poder acessar o site</p>
        <Button name="Otavio" numero={10} />
        <MyInput value="nkljfd"/>
        <Link href={"/login"} className={styles.link}>Ir para login</Link>
=======
        <h1>Atividade 2 - PTAC4</h1>
        <p>Três Interfaces</p>
        <Link href={"/perfil"} className={styles.link}>Ir para página Perfil</Link>
>>>>>>> 3e0646a56b0bdd77fc5e358e47da96eb8fa89868
        <p style={{fontSize: "12px"}}>Dupla: Anabela e Victor Solique</p>
    </div>

  );
}
