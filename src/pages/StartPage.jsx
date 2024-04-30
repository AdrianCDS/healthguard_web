import React from "react";
import calendar from "../assets/calendar.png";
import heart from "../assets/heart.png";
import Menu from "./Menu";

function StartPage() {
  return (
    <div>
      <Menu />

      <div
        className=""
        style={{ backgroundImage: "url('src/assets/login-background.PNG')" }}
      >
        <div className="flex flex-col justify-center items-start h-screen">
          {/* Mesajul de bun venit */}
          <h1 className="text-4xl font-bold text-left ml-20 pl-20">
            Bine ai venit în contul
          </h1>
          <h1 className="text-4xl font-bold mb-20 text-left ml-20 pl-20">
            HealthGuard Wear
          </h1>

          {/* Rândul pentru coloane */}
          <div className="flex flex-wrap justify-center gap-8 w-3/4">
            {/* Coloana stângă */}
            <div className="flex flex-col justify-start items-start gap-7 w-2/5">
              <div className="text-xl font-medium">Activitatea de azi</div>
              <div className="border-4 border-blue-300 rounded-lg  p-4">
                <div>Faceți mișcare minim 3km pe zi</div>
              </div>
              <div></div>
              <div></div>
              <div></div>
              <div className="text-xl font-medium">Calendarul</div>
              <img src={calendar} alt="Calendar icon" className="w-10 h-10" />
            </div>

            {/* Coloana dreaptă */}
            <div className="flex flex-col justify-start items-start gap-7">
              <div className="text-xl font-medium">Recomandările medicului</div>
              <div className="border-4 border-blue-300 rounded-lg p-4">
                <div>Consumați minim 2 litri de apă pe zi</div>
              </div>
              <div className="border-4 border-blue-300 rounded-lg p-4">
                <div>Evitați consumul uleiului de semințe</div>
              </div>
              <div className="text-xl font-medium">Ritmul cardiac</div>
              <img src={heart} alt="Heart Rate" className="w-10 h-10" />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            <div className="mt-8 flex justify-center  w-2/5">
              <div className="flex flex-col justify-start items-start gap-7"></div>
              <div className="flex flex-col justify-start items-start gap-7"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartPage;
