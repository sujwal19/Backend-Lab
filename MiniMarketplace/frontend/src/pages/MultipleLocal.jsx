import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { server } from "../main";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const MultipleLocal = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [file, setFile] = useState("");
  async function fetchAllImages() {
    try {
      const { data } = await axios.get(`${server}/api/multiple/local/all`);
      setData(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchAllImages();
  }, []);

  const onChangeHandler = (e) => {
    const file = Array.from(e.target.files);

    setFile(file);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    file.forEach((file, idx) => {
      formData.append("files", file);
    });

    try {
      const { data } = await axios.post(
        `${server}/api/multiple/local`,
        formData,
      );

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
          <input type="file" required multiple onChange={onChangeHandler} />
          <button>Add</button>
        </form>
      </div>
      <div className="allImages">
        <h1>All Images</h1>
        <div className="container">
          {data?.flatMap((e) =>
            e.image.map((img, i) => (
              <img
                key={i}
                src={`${server}/${img}`}
                width="200"
                height="300"
                alt=""
              />
            )),
          )}
        </div>
      </div>
    </div>
  );
};

export default MultipleLocal;
