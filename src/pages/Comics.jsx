import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
const Comics = ({ research, setInputVisible }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState("");
  const [change, setChange] = useState();
  const [input, setInput] = useState("");

  //   console.log(params);
  //   setChange(false);
  //   setTitle(`&title=${research}`);
  useEffect(() => {
    // if (change === false && research) {

    // }
    const fetchData = async () => {
      try {
        setTitle(`&title=${research}`);

        const response = await axios.get(
          `https://site--backend-marvel--y5mtbvcp7vlv.code.run/comics?skip=${page}${title}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    setInputVisible(true);

    fetchData();
  }, [page, research, title]);
  return isLoading ? (
    <p>chargement</p>
  ) : (
    <main>
      <div className="container">
        {data.results.map((elem) => {
          return (
            <section key={elem._id} className="charac">
              <img
                src={`${elem.thumbnail.path}/portrait_xlarge.${elem.thumbnail.extension}`}
                alt="comics"
              />
              <h2>{elem.title}</h2>
              <p>{elem.description}</p>

              <button
                onClick={() => {
                  let cookies = Cookies.get(`comic${elem._id}`);
                  if (!cookies) {
                    Cookies.set(`comic${elem._id}`, elem._id, {
                      expires: 8,
                    });
                    setChange(!change);
                    const l = change;
                  } else {
                    Cookies.remove(`comic${elem._id}`);
                    setChange(!change);
                    const l = change;
                  }
                }}
              >
                {Cookies.get(`comic${elem._id}`) ? (
                  <FontAwesomeIcon icon={faHeart} color="red" size="2x" />
                ) : (
                  <FontAwesomeIcon icon={faHeart} color="white" size="2x" />
                )}
              </button>
            </section>
          );
        })}{" "}
        <article>
          <button
            onClick={() => {
              setPage(page - 1);
            }}
          >
            {"<"}
          </button>
          <button
            onClick={() => {
              setPage(1);
            }}
          >
            1
          </button>
          <input
            className="page"
            type="text"
            placeholder="page"
            onChange={(event) => {
              setInput(event.target.value);
            }}
            value={input}
          />
          <button
            onClick={() => {
              setPage(input);
            }}
          >
            go
          </button>

          <button
            onClick={() => {
              setPage(474);
            }}
          >
            474
          </button>

          <button
            onClick={() => {
              setPage(page + 1);
            }}
          >
            {">"}
          </button>
        </article>
      </div>{" "}
    </main>
  );
};

export default Comics;
