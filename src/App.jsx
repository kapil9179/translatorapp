import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const button = useRef();
  const [option, setoption] = useState([]);
  const [from, setfrom] = useState("");
  const [to, setto] = useState("");
  const [input, setinput] = useState("");
  const [output, setoutput] = useState("");

  useEffect(() => {
    fetch("https://libretranslate.de/languages", {
      headers: { accept: "application/json" },
    })
      .then((response) => response.json())
      .then((langlist) => setoption(langlist));
  }, []);

  const translatehandler = () => {
    const params = new URLSearchParams();
    params.append("q", input);
    params.append("source", from);
    params.append("target", to);
    params.append("api_key", "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");

    axios
      .post("https://libretranslate.de/translate", params, {
        headers: { accept: "application/json" },
        "Content-type": "application/x-www-form-urlencoded",
      })
      .then((res) => setoutput(res.data.translatedText));
  };

  const inputhandler = (event) => setinput(event.target.value);

  return (
    <div className="App">
      <h3><i>Translate in Any Language</i></h3>
      <div className="dropdowns">
        <div>
          <label>From:</label>
          <select onChange={(e) => setfrom(e.target.value)}>
            {option.map((opt) => (
              <option value={opt.code} key={opt.code}>
                {opt.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>To:</label>
          <select onChange={(e) => setto(e.target.value)}>
            {option.map((opt) => (
              <option value={opt.code} key={opt.code}>
                {opt.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <textarea
        className="input-text"
        value={input}
        onChange={inputhandler}
        placeholder="Enter text here..."
      />
      <button onClick={translatehandler} ref={button}>
        Translate Text
      </button>
      <textarea
        className="output-text"
        value={output}
        readOnly
        placeholder="Translated text will appear here..."
      />
    </div>
  );
}

export default App;

