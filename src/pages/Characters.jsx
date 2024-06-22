import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
const Characters = ({ research }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [change, setChange] = useState();

  //   console.log(params);
  //   setchange(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setName(`&name=${research}`);
        const response = await axios.get(
          `https://site--backend-marvel--y5mtbvcp7vlv.code.run/characters?skip=${page}${name}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [page, research]);
  //   useEffect(() => {
  //     const fetchCookies = async () => {
  //       let charact = await Cookies.get("charac");
  //       if (!charact) {
  //         Cookies.set("charac", [], { expires: 7 });
  //       } else {
  //         await setCookiesCharac([...Cookies.get("charac")]);
  //       }
  //     };
  //     fetchCookies();
  //   }, []);

  return isLoading ? (
    <p>chargement</p>
  ) : (
    <main>
      <div className="container">
        {data.results.map((charac) => {
          return (
            <section key={charac._id} className="charac">
              <Link to={`/comics/${charac._id}`}>
                {/* {console.log(`${charac.thumbnail.path}/portrait_xlarge.jpg`)} */}
                <img
                  src={`${charac.thumbnail.path}/portrait_xlarge.${charac.thumbnail.extension}`}
                  alt="characters"
                />
                <h2>{charac.name}</h2>
                <p>{charac.description}</p>
              </Link>
              <button
                onClick={() => {
                  let cookies = Cookies.get(`charac${charac.name}`);
                  // setChange(cookies);
                  if (!cookies) {
                    Cookies.set(`charac${charac.name}`, charac._id, {
                      expires: 8,
                    });
                    setChange(!change);
                    const l = change;
                  } else {
                    Cookies.remove(`charac${charac.name}`);
                    setChange(!change);
                    const l = change;
                  }
                }}
              >
                {Cookies.get(`charac${charac.name}`) ? (
                  <FontAwesomeIcon icon={faHeart} color="red" size="2x" />
                ) : (
                  <FontAwesomeIcon icon={faHeart} color="white" size="2x" />
                )}
              </button>
            </section>
          );
        })}
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
          <button
            onClick={() => {
              setPage(15);
            }}
          >
            15
          </button>
          <button
            onClick={() => {
              setPage(page + 1);
            }}
          >
            {">"}
          </button>
        </article>
      </div>
    </main>
  );
};

export default Characters;
