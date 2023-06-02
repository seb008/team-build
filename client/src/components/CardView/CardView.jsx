import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./cardView.scss";

const CardView = ({ info }) => {
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
      {list?.map((item) => (
        <div className="card" key={item._id}>
          <div className="left">
            <div className="file">
              <img
                src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="right">
            {info.map((field) => (
              <div key={field.field} className="card-field">
                {item[field.field]}
              </div>
            ))}

            <Link>
              <button
                className="button"
                onClick={() => handleLinkClick(item._id)}
              >
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
