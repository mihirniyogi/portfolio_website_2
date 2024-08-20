import styles from "./Contact.module.scss";
import { useEffect, useState } from "react";
import fetchDataFromCMS from "../../utils/fetchDataFromCMS";

// helper type
type TextChild = {
  type: "text";
  text: string;
  bold?: boolean;
};

// helper type
type Paragraph = {
  type: "paragraph";
  children: TextChild[];
};

// fetches data + parses data + returns JSX
const TextComponent = () => {
  const [textArr, setTextArr] = useState<Paragraph[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchDataFromCMS("/api/contact");
        setTextArr(response.data.attributes.text); //description
      } catch (error) {
        console.error(error);
        setTextArr([]);
      }
    }
    fetchData();
  }, []);

  return textArr.map((block: Paragraph, index: number) => (
    <p key={index}>
      {block.children.map((child: TextChild, childIndex: number) => {
        if (child.bold) {
          return (
            <span key={childIndex} className={styles["highlight"]}>
              {child.text}
            </span>
          );
        }
        return <span key={childIndex}>{child.text}</span>;
      })}
    </p>
  ));
};

export default TextComponent;
