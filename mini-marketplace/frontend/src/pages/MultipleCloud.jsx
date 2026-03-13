import { useNavigate } from "react-router-dom";

const MultipleCloud = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default MultipleCloud;
