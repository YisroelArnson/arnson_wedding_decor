import { useState, useEffect } from "react";
function LinenInput(props) {
  const [select, setSelect] = useState("");
  const [count, setCount] = useState(0);

  const onSelect = (event) => {
    setSelect(event.target.value);
  };
  const onCountChange = (event) => {
    setCount(event.target.value);
  };

  useEffect(() => {
    props.addNapkins(props.index, {
      unique_id: select,
      count: count,
    });
  }, [select, count]);

  return (
    <div index={props.index}>
      <select onChange={(event) => onSelect(event)}>
        <option value="">None</option>
        {props.napkinsList?.slice(1).map((option) => (
          <option value={option[1]}>{option[0]}</option>
        ))}
      </select>
      <input
        index={props.index}
        onChange={(event) => onCountChange(event)}
        className="napkin-input"
      ></input>
    </div>
  );
}

export default LinenInput;
