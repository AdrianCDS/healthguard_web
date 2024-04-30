function Alerts({ nume, prenume, puls, tensiune }) {
  return (
    <div className="border border-blue-100 border-4  rounded-lg text-center bg-blue-300 flex flex-col w-3/4">
      <div className="flex flex-row justify-center">
        <span>{nume} </span>
        <span className="1px"></span>
        <span>{prenume}</span>
      </div>
      <div>
        <span>Puls: {puls}</span>
      </div>
      <div>
        <span>Tensiune: {tensiune}</span>
      </div>
    </div>
  );
}

export default Alerts;
