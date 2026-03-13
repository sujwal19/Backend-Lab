import { useNavigate } from "react-router-dom";

const LocalSingle = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default LocalSingle;
