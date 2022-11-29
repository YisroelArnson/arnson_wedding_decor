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
    props.addLinen(props.index, {
      index: props.index,
      name: select,
      count: count,
    });
  }, [select, count]);

  return (
    <div index={props.index}>
      <select onChange={(event) => onSelect(event)}>
        <option value="">None</option>
        {props.linenList?.slice(1).map((option) => (
          <option value={option[1]}>{option[0]}</option>
        ))}
      </select>
      <input
        index={props.index}
        onChange={(event) => onCountChange(event)}
        className="linen-input"
      ></input>
    </div>
  );
}

export default LinenInput;
