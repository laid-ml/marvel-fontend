import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Favoris = ({ setInputVisible }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [change, setChange] = useState();

  const [keysFavoris, setKeysFavoris] = useState(Object.keys(Cookies.get()));
  const cookiesFavoris = Cookies.get();

  useEffect(() => {
    const fetchData = async () => {
      const newtab = [];

      for (let i = 0; i < keysFavoris.length; i++) {
        if (keysFavoris[i].indexOf("charac") !== -1) {
          try {
            const response = await axios.get(
              `https://site--backend-marvel--y5mtbvcp7vlv.code.run/comics/${
                cookiesFavoris[keysFavoris[i]]
              }`
            );
            newtab.push(response.data);
          } catch (error) {
            console.log(error);
          }
        } else if (keysFavoris[i].indexOf("comic") !== -1) {
          try {
            const response = await axios.get(
              `https://site--backend-marvel--y5mtbvcp7vlv.code.run/comic/${
                cookiesFavoris[keysFavoris[i]]
              }`
            );
            newtab.push(response.data);
          } catch (error) {
            console.log(error);
          }
        } else {
          newtab.push({});
        }
      }
      setData(newtab);
      console.log(data);
      console.log(newtab);
      setIsLoading(false);
    };

    if (keysFavoris.length > 0) {
      fetchData();
    } else {
      setIsLoading(false);
    }
    setInputVisible(false);
  }, [keysFavoris]);

  return isLoading ? (
    <p>en cours</p>
  ) : (
    <main>
      <div className="container">
        {keysFavoris.map((elem, index) => {
          return (
            <div key={index}>
              {console.log(elem.indexOf("charac"))}
              {console.log(elem)}
              {elem.indexOf("charac") !== -1 ? (
                <section className="charac">
                  <img
                    src={`${data[index].thumbnail.path}/portrait_xlarge.${data[index].thumbnail.extension}`}
                    alt="characters"
                  />
                  <h2>{data[index].name}</h2>
                  <p>{data[index].description}</p>
                  <button
                    onClick={() => {
                      let cookies = Cookies.get(`charac${data[index].name}`);

                      if (!cookies) {
                        Cookies.set(
                          `charac${data[index].name}`,
                          data[index]._id,
                          {
                            expires: 8,
                          }
                        );
                        setChange(!change);
                        const l = change;
                      } else {
                        Cookies.remove(`charac${data[index].name}`);
                        setChange(!change);
                        const l = change;
                      }
                    }}
                  >
                    {Cookies.get(`charac${data[index].name}`) ? (
                      <FontAwesomeIcon icon={faHeart} color="red" size="2x" />
                    ) : (
                      <FontAwesomeIcon icon={faHeart} color="white" size="2x" />
                    )}
                  </button>
                </section>
              ) : null}
              {elem.indexOf("comic") !== -1 ? (
                <section className="charac">
                  <img
                    src={`${data[index].thumbnail.path}/portrait_xlarge.${data[index].thumbnail.extension}`}
                    alt="characters"
                  />
                  <h2>{data[index].title}</h2>
                  <p>{data[index].description}</p>
                  <button
                    onClick={() => {
                      let cookies = Cookies.get(`comic${data[index]._id}`);
                      if (!cookies) {
                        Cookies.set(
                          `comic${data[index]._id}`,
                          data[index]._id,
                          {
                            expires: 8,
                          }
                        );
                        setChange(true);
                        const l = change;
                      } else {
                        Cookies.remove(`comic${data[index]._id}`);
                        setChange(false);
                        const l = change;
                      }
                    }}
                  >
                    {Cookies.get(`comic${data[index]._id}`) ? (
                      <FontAwesomeIcon icon={faHeart} color="red" size="2x" />
                    ) : (
                      <FontAwesomeIcon icon={faHeart} color="white" size="2x" />
                    )}
                  </button>
                </section>
              ) : null}
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Favoris;
