function AlertCard({ first_name, last_name, bpm, temperature, humidity }) {
  return (
    <div className="border border-blue-100 border-4 rounded-lg text-center bg-white flex flex-col items-center p-4">
      <div className="flex text-lg font-bold items-center space-x-2 text-white">
        <p className="text-blue-500">{first_name}</p>
        <p className="text-blue-500">{last_name}</p>
      </div>
      <div className="flex justify-between items-start space-x-4">
        <div>
          <p className="font-semibold text-blue-500">
            BPM: <span className="font-bold text-red-500">{bpm}</span>
          </p>
        </div>
        <div>
          <p className="font-semibold text-blue-500">
            Temperature:{" "}
            <span className="font-bold text-red-500">{temperature} C</span>
          </p>
        </div>
        <div>
          <p className="font-semibold text-blue-500">
            Humidity:{" "}
            <span className="font-bold text-red-500">{humidity}%</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AlertCard;
