import styles from "./Projects.module.scss";
import useAnimateUponView from "../../hooks/useAnimateUponView";
import Featured from "./Featured";

const Projects = () => {
  // animate lines once they are in view
  useAnimateUponView(styles["header-line-left"], styles["animation"]);
  useAnimateUponView(styles["header-line-right"], styles["animation"]);

  return (
    <div className={styles.container}>
      {/* header */}
      <div className={styles["header"]}>
        <div className={styles["header-line-left"]}></div>
        <h3 className={styles["header-number"]}>02.</h3>
        <h3 className={styles["header-title"]} id="projects">
          projects
        </h3>
        <div className={styles["header-line-right"]}></div>
      </div>

      {/* content */}
      <div className={styles["content"]}>
        <Featured />
      </div>
    </div>
  );
};

export default Projects;
