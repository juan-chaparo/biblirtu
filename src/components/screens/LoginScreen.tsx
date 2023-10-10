"use client";
import { saveUser } from "@/redux/features/reviewSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import myApi from "@/utils/front/axiosConfig";
import { message } from "antd";
import React from "react";
import { useForm } from "react-hook-form";

interface loginForm {
  email: string;
  password: string;
}

function LoginScreen() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginForm>({ mode: "all" });
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userSlice);
  const onSubmit = async (data: loginForm) => {
    try {
      const loginPost = await myApi.post("auth/login", { ...data });
      dispatch(saveUser(loginPost.data));
      message.success(loginPost.data.message);
    } catch (error: any) {
      message.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#252831] grid grid-cols-1 lg:grid-cols-2">
      <div className="text-white flex flex-col items-center justify-center gap-8 p-8 max-w-lg mx-auto">
        <div className="flex flex-col gap-1 w-full">
          <h1 className="text-4xl font-medium">Iniciar sesión</h1>
          <p className="text-gray-400">
            Ingresa al sistema con tus credenciales
          </p>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
                  message: "La contraseña debe tener entre 6 y 20 caracteres.",
                },
              })}
              type="password"
              autoComplete="off"
              className="w-full py-2 px-4 bg-transparent border rounded-full mt-2 outline-none focus:border-indigo-400"
              placeholder="Ingresa tu contraseña"
            />
            {errors.password ? <p>{errors.password.message}</p> : null}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 order-2 md:order-1">
            <span className="text-gray-400">
              ¿No tienes cuenta?{" "}
              <a
                href="/register/user"
                className="text-indigo-400 hover:text-indigo-500 transition-colors"
              >
                Registrate
              </a>
            </span>
          </div>
          <div className="mt-4 order-1 md:order-2">
            <button
              type="submit"
              className="w-full bg-indigo-700 p-2 rounded-full hover:bg-indigo-800 transition-colors"
            >
              Iniciar sesión
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
  );
}

export default LoginScreen;
