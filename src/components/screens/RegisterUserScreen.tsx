"use client";
import myApi from "@/utils/front/axiosConfig";
import { Switch, message } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

function RegisterUserScreen() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({ mode: "all" });
  const [isWriter, setIsWriter] = useState(false);
  const onSubmit = async (data: RegisterForm) => {
    const registerData = { ...data, userTypeId: 1 };
    try {
      const loginPost = await myApi.post("auth/register", { ...registerData });
      message.success(loginPost.data.message);
    } catch (error: any) {
      message.error(error.response.data.message);
    }
  };
  /* const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!name || !email || !password) {
      messageApi.open({
        type: "error",
        content: "Por favor, llena todos los campos.",
      });
      return;
    }

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      messageApi.open({
        type: "error",
        content: "Por favor, llena todos los campos.",
      });
      return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (!passwordRegex.test(password)) {
      messageApi.open({
        type: "error",
        content:
          "La contraseña debe tener entre 6 y 20 caracteres, y debe incluir al menos una letra mayúscula, una letra minúscula y un número.",
      });
      return;
    }

    const data = {
      firstName: name,
      lastName,
      email,
      password,
      userTypeId: 1,
    };

    try {
      const loginPost = await myApi.post("auth/register", { ...data });
      message.success(loginPost.data.message);
    } catch (error: any) {
      message.error(error.response.data.message);
    }

    console.log(data);
  };
 */
  return (
    <>
      <div className="min-h-screen bg-[#252831] grid grid-cols-1 lg:grid-cols-2">
        <div className="text-white flex flex-col items-center justify-center gap-8 p-8 max-w-lg mx-auto">
          <div className="flex flex-col gap-1 w-full">
            <h1 className="text-4xl font-medium">Crear cuenta</h1>
            <p className="text-gray-400">Registrate en la plataforma</p>
          </div>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label htmlFor="name" className="text-gray-200">
                Nombre *
              </label>
              <input
                {...register("firstName", {
                  required: "Es requerido el primer nombre",
                })}
                className="w-full py-2 px-4 bg-transparent border rounded-full mt-2 outline-none focus:border-indigo-400"
                placeholder="Ingresa tu nombre completo"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="text-gray-200">
                Apellido *
              </label>
              <input
                {...register("lastName")}
                className="w-full py-2 px-4 bg-transparent border rounded-full mt-2 outline-none focus:border-indigo-400"
                placeholder="Ingresa tu nombre completo"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-gray-200">
                Correo electrónico *
              </label>
              <input
                {...register("email", {
                  required: "Es necesario ingresar el correo electrónico",
                  pattern: {
                    value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                    message: "Ingrese un correo valido",
                  },
                })}
                className="w-full py-2 px-4 bg-transparent border rounded-full mt-2 outline-none focus:border-indigo-400"
                placeholder="Ingresa tu correo electrónico"
              />
              {errors.email ? <p>{errors.email.message}</p> : null}
            </div>
            <div>
              <label htmlFor="password" className="text-gray-200">
                Contraseña *
              </label>
              <input
                {...register("password", {
                  required: "Es necesario ingresar la contraseña",
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
                    message:
                      "La contraseña debe tener entre 6 y 20 caracteres.",
                  },
                })}
                type="password"
                autoComplete="off"
                className="w-full py-2 px-4 bg-transparent border rounded-full mt-2 outline-none focus:border-indigo-400"
                placeholder="Ingresa tu contraseña"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-gray-200">
                ¿Eres escritor?{" "}
              </label>
              <Switch
                className="bg-gray-600"
                checked={isWriter}
                onChange={setIsWriter}
              />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 order-2 md:order-1">
              <span className="text-gray-400">
                ¿Ya tienes cuenta?{" "}
                <a
                  href="/login"
                  className="text-indigo-400 hover:text-indigo-500 transition-colors"
                >
                  Ingresa
                </a>
              </span>
            </div>
            <div className="mt-4 order-1 md:order-2">
              <button
                type="submit"
                className="w-full bg-indigo-700 p-2 rounded-full hover:bg-indigo-800 transition-colors"
              >
                Crear cuenta
              </button>
            </div>
          </form>
        </div>
        <div
          className="bg-cover bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/foto-gratis/arreglo-libros-taza-cama_23-2148917211.jpg')",
          }}
        ></div>
      </div>
    </>
  );
}

export default RegisterUserScreen;
