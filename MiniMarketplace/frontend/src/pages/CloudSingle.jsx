import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "../main";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CloudSingle = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [file, setFile] = useState("");

  async function fetchAllImages() {
    try {
      const { data } = await axios.get(`${server}/api/single/cloud/all`);
      setData(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchAllImages();
  }, []);

  const onChangeHandler = (e) => {
    const file = e.target.files[0];

    setFile(file);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("file", file);

    try {
      const { data } = await axios.post(`${server}/api/single/cloud`, formData);

      toast.success(data.message);
      fetchAllImages();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div>
      <button onClick={() => navigate("/")}>
        <h5>Back to Home</h5>
      </button>
      <div className="upload">
        <form onSubmit={submitHandler}>
          <input type="file" required onChange={onChangeHandler} />
          <button>Add</button>
        </form>
      </div>
      <div className="allImages">
        <h1>All Images</h1>
        <div className="container">
          {data &&
            data.map((e, idx) => {
              return (
                <img
                  key={idx}
                  src={e.image.url}
                  style={{ width: "200px", height: "300px" }}
                  alt=""
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default CloudSingle;
