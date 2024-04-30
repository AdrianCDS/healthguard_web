function RenderCerere({ email, nume, prenume }) {
  return (
    <div className=" w-3/4 h-min flex flex-row justify-between p-2 border border-solid border-blue-500 rounded-lg bg-blue-100 overflow-hidden">
      <p>{email}</p>
      <p>{nume}</p>
      <p>{prenume}</p>

      <div className="relative w-1/3 h-10 flex flex-row items-center gap-4">
        <button className=" w-full h-full hover:bg-blue-700  hover:text-white border border-solid border-blue-500 rounded-lg bg-blue-300 ">
          <p>Accepta</p>
        </button>

        <button className="w-full h-full hover:bg-blue-700  hover:text-white  border border-solid border-blue-500 rounded-lg bg-blue-300 ">
          <p>Respinge</p>
        </button>
      </div>
    </div>
  );
}

export default RenderCerere;
