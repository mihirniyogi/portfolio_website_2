import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["info"]}>
        <span>{"designed & developed by Mihir Niyogi"}</span>
        <span>{"© 2024"}</span>
      </div>
    </div>
  );
};

export default Footer;
