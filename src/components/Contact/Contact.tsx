import useAnimateUponView from "../../hooks/useAnimateUponView";
import styles from "./Contact.module.scss";

const Contact = () => {
  useAnimateUponView(styles["header-line"], styles["animation"]);

  return (
    <div className={styles["container"]}>
      {/* header */}
      <div className={styles["header"]}>
        <div className={styles["header-line"]}></div>
        <h3 className={styles["header-number"]}>03.</h3>
        <h3 className={styles["header-title"]} id="contact">
          get in touch
        </h3>
      </div>
    </div>
  );
};

export default Contact;
