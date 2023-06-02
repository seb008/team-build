import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";

import "./list.scss";

const List = ({ info }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState();
  const { data, loading, error } = useFetch(`/${path}`);

  useEffect(() => {
    if (data) {
      setList(data);
    }
  }, [data]);

  return (
    <>
      {list?.map((item) => (
        <div className="list" key={item._id}>
          {info.map((field) => (
            <Link
              to={`/${path}/${item._id}`}
              key={field.field}
              className="card-link"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className={`card-field ${field.field === "name" ? "bold" : ""}`}>
                {typeof field.field === "string" ? (
                  item[field.field]
                ) : (
                  <span className="icon-container">{field.field}</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      ))}
    </>
  );
};

export default List;
