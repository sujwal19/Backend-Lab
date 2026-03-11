import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const saved = localStorage.getItem("loggedInUser");
    return saved;
  });
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");

    setLoggedInUser(null);
    handleSuccess("Logging out..");

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:8080/products";
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      setProducts(result);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Hey {loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <ol>
        {products.map((item, idx) => {
          return (
            <li key={idx}>
              <span>{item.name} :</span>
              <span> {item.price}</span>
            </li>
          );
        })}
      </ol>
      <ToastContainer />
    </div>
  );
};

export default Home;
