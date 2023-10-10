import { Select } from "antd";
import React, { useState } from "react";

const provinceData = ['Zhejiang', 'Jiangsu'];

const cityData = {
  Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
  Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
};

type CityName = keyof typeof cityData;

function RegisterReviewScreen() {
  const [cities, setCities] = useState(cityData[provinceData[0] as CityName]);
  const [secondCity, setSecondCity] = useState(cityData[provinceData[0] as CityName][0]);

  const handleProvinceChange = (value: CityName) => {
    setCities(cityData[value]);
    setSecondCity(cityData[value][0]);
  };

  const onSecondCityChange = (value: CityName) => {
    setSecondCity(value);
  return (
    <div className="flex flex-col min-h-screen rounded-lg items-center justify-center">
      <div>
        <h1 className="text-6xl text-black font-medium mb-2">
          Comparte tu opinion<span className="text-cyan-500">.</span>
        </h1>
        <form className="mt-8">
          <div className="max-w-lg mb-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <Select
              defaultValue={provinceData[0]}
              style={{ width: 120 }}
              onChange={handleProvinceChange}
              options={provinceData.map((province) => ({
                label: province,
                value: province,
              }))}
            />
            <Select
              style={{ width: 120 }}
              value={secondCity}
              onChange={onSecondCityChange}
              options={cities.map((city) => ({ label: city, value: city }))}
            />
            <input
              autoComplete="off"
              className="w-full py-3 px-4 rounded-xl outline-none bg-gray-300 text-gray-100 group"
              placeholder="Codigo del "
            />
            <input
              type="text"
              autoComplete="off"
              className="w-full py-3 px-4 rounded-xl outline-none bg-gray-300 text-gray-100 group"
              placeholder="Apellidos"
              disabled
            />
          </div>
          <div className="max-w-lg mb-4">
            <input
              type="email"
              autoComplete="off"
              className="w-full py-3 px-4 rounded-xl outline-none bg-gray-300 text-gray-100 group"
              placeholder="Correo electrónico"
            />
          </div>
          <div className="max-w-lg mb-4">
            <input
              type="password"
              autoComplete="off"
              className="w-full py-3 px-4 rounded-xl outline-none bg-gray-300 text-gray-100 group"
              placeholder="Contraseña"
            />
          </div>
          <div className="max-w-lg flex justify-center md:justify-end mb-6">
            <a
              href="#"
              className="text-gray-500 font-medium hover:text-gray-300 transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <div className="max-w-lg">
            <button className="bg-cyan-600 text-white w-full py-3 px-4 rounded-full hover:bg-cyan-700 transition-colors">
              Crear cuenta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterReviewScreen;
