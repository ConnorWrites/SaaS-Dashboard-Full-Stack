import styles from "./Settings.module.css";

export default function Settings() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Settings</h1>
      <p>Here you can manage your settings.</p>
    </div>
  );
}