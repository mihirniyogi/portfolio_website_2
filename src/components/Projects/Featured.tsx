import axios from "axios";
import { useEffect, useState } from "react";
import FeaturedCard from "./Card/FeaturedCard";

type Project = {
  title: string;
  description: string;
  image: string;
  githubLink: string;
  liveLink: string;
  technologies: string[];
};

const Featured = () => {
  const [featured, setFeatured] = useState<Project[]>([]);

  // to fetch from CMS
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
        const response = await axios
          .get(`${BASE_URL}/api/projects?populate=*`, options)
          .then((res) => res.data)
          .catch((err) => console.error(err));

        const projects: Project[] = response.data.map((item: any) => ({
          title: item.attributes["Title"],
          description: item.attributes["Description"],
          image: item.attributes["image"]?.data?.attributes?.url
            ? `${BASE_URL}${item.attributes["image"].data.attributes.url}`
            : "default.png",
          githubLink: item.attributes["githubLink"],
          liveLink: item.attributes["liveLink"],
          technologies: item.attributes["technologies"],
        }));

        setFeatured(projects);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return featured.map((data, index) => (
    <FeaturedCard
      key={index}
      title={data.title}
      description={data.description}
      image={data.image}
      githubLink={data.githubLink}
      liveLink={data.liveLink}
      technologies={data.technologies}
      position={index % 2 === 0 ? "left" : "right"}
    />
  ));
};

export default Featured;
