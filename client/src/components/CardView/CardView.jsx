import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import "./cardView.scss";

const CardView = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState();
  const { data, loading, error } = useFetch(`/${path}`);

  useEffect(() => {
    if (data) {
      setList(data);
    }
  }, [data]);

  const handleLinkClick = (id) => {
    window.location.href = `/${path}/${id}`;
  };

  return (
    <>
      {data?.map((i) => (
        <div className="card" key={i._id}>
          <div className="left">
            <div className="file">
              <img
                src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="right">
            <div className="title">{i.name}</div>
            <div className="adress">{i.adress}</div>

            <Link>
              <button className="button" onClick={() => handleLinkClick(i._id)}>
                Ouvrir
              </button>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardView;
