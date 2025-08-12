import { useState, useEffect } from "react";
function LinenInput(props) {
  const [select, setSelect] = useState(props.linen.unique_id);
  const [count, setCount] = useState(props.linen.count);
  const onSelect = (event) => {
    setSelect(event.target.value);
  };
  const onCountChange = (event) => {
    setCount(event.target.value);
  };

  useEffect(() => {
    props.updateLinenInput(props.index, select, count);
  }, [select, count]);

  return (
    <div className="line-item-row" data-index={props.index}>
      <select
        className="line-item-select"
        onChange={(event) => onSelect(event)}
        value={select}
      >
        <option value="">Select linen…</option>
        {props.linenList?.slice(1).map((option, index) => (
          <option key={index} value={option[1]}>
            {option[0]}
          </option>
        ))}
      </select>
      <input
        type="number"
        min={0}
        className="line-item-qty"
        value={count}
        onChange={(event) => onCountChange(event)}
      />
      <button
        type="button"
        className="line-item-delete"
        onClick={() => props.removeRow?.(props.index)}
        aria-label="Remove linen row"
      >
        ×
      </button>
    </div>
  );
}

export default LinenInput;
