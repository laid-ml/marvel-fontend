import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
const Comics = ({ setInputVisible }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-marvel--y5mtbvcp7vlv.code.run/comics/${id}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    setInputVisible(false);
    fetchData();
  }, []);
  return isLoading ? (
    <p>chargement</p>
  ) : (
    <main>
      <div className="container">
        <section>
          <img
            src={`${data.thumbnail.path}/portrait_xlarge.${data.thumbnail.extension}`}
            alt="comics"
          />
          <h2 className="title">{data.name}</h2>
        </section>
        {data.comics.map((comic) => {
          return (
            <section key={comic._id} className="charac">
              <img
                src={`${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`}
                alt="comics"
              />
              <h2>{comic.title}</h2>
              <p>{comic.description}</p>
            </section>
          );
        })}
      </div>
    </main>
  );
};

export default Comics;
