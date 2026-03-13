import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="buttons">
      <button onClick={() => navigate("/local/single")}>Local Single</button>
      <button onClick={() => navigate("/local/multiple")}>
        Local Multiple
      </button>
      <button onClick={() => navigate("/cloud/single")}>Cloud Single</button>
      <button onClick={() => navigate("/cloud/multiple")}>
        Cloud Multiple
      </button>
    </div>
  );
};

export default Home;
