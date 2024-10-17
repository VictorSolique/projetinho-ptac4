import styles from "./page.module.css"
import Link from "next/link";
import Button from "./components/Button";
import MyInput from "./components/Input";

export default function Home() {
  return (
    <div className={styles.main}>
        <h1>Login Necessário</h1>
        <p>Realize o login para poder acessar o site</p>
        <Button name="Otavio" numero={10} />
        <MyInput value="nkljfd"/>
        <Link href={"/login"} className={styles.link}>Ir para login</Link>
        <p style={{fontSize: "12px"}}>Dupla: Anabela e Victor Solique</p>
    </div>

  );
}
