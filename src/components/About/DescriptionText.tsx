import styles from "./About.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";

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

// helper function
const parseDescription = (descArray: Paragraph[]) => {
  return descArray.map((block: Paragraph, index: number) => (
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

// actual component - takes in extension url, returns JSX
const DescriptionText = () => {
  const [description, setDescription] = useState<Paragraph[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;
        const options = {
          headers: {
            Authorization: `Bearer ${TOKEN}`, // Include the token in the headers
          },
        };
        const BASE_URL = import.meta.env.VITE_STRAPI_API_URL;
        const response = await axios.get(`${BASE_URL}/api/about`, options);

        setDescription(response.data.data.attributes.description);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch data");
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const parsed = parseDescription(description);

  return <div className={styles.description}>{parsed}</div>;
};

export default DescriptionText;
