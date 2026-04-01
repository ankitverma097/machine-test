const InputField = ({ label, value, onChange, type = "text"}) => {
  return (
    <div className="child-input-div">
      <label>{label} *</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="input-field"
      />
    </div>
  );
};

export default InputField;