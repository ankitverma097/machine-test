const Address = ({ title, data, setData }) => {
  return (
    <div className="child-address-input-div">
      <div className="child-residential-heading">
           <h3>{title}</h3>
      </div>
     

      <div className="child-residential-address-input-div">
        <input
          placeholder="Street 1"
          className="input-field"
          value={data.street1}
          onChange={(e) =>
            setData({ ...data, street1: e.target.value })
          }
        />

        <input
          placeholder="Street 2"
          className="input-field"
          value={data.street2}
          onChange={(e) =>
            setData({ ...data, street2: e.target.value })
          }
        />
      </div>
    </div>
  );
};

export default Address;