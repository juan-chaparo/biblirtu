"use client";
import React, { useEffect, useState } from "react";
import {
  DownOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Layout, { Content, Footer, Header } from "antd/es/layout/layout";
import type { MenuProps } from "antd";
import { Divider, Dropdown, Space } from "antd";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logoutUser } from "@/redux/features/reviewSlice";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
  idUser: number;
}

const items: MenuProps["items"] = [
  {
    label: <a href="/register/books">Libros</a>,
    key: "0",
    icon: <LogoutOutlined />,
  },
  {
    label: <a href="/register/reviews">Reseñas</a>,
    key: "1",
    icon: <LogoutOutlined />,
  },
];

function NavBar({ children, idUser }: Props) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userSlice);
  const navigation = useRouter();

  const handleLogout = (e: any) => {
    e.preventDefault();
    dispatch(logoutUser());
    navigation.push("/logout");
  };

  return (
    <Layout>
      <Header
        style={{
          padding: 0,
          position: "relative",
          height: "auto",
        }}
      >
        <div className="w-full bg-white p-4 flex md:flex-row flex-col items-center justify-center">
          <h1 className="flex-1 flex justify-center md:justify-start font-bold cursor-pointer text-3xl">
            <Link href="/reviewsStart">Biblirtu</Link>
          </h1>
          <nav className="flex-1 flex items-center gap-4 justify-center">
            <a
              href="/reviewsStart"
              className="xl:py-1 xl:px-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Reseñas
            </a>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <a className="xl:py-1 xl:px-2 rounded-lg hover:bg-gray-100 transition-colors">
                Registro <DownOutlined />
              </a>
            </Dropdown>
          </nav>
          <div className="flex-1 flex items-center justify-center md:justify-end">
            <div className="flex hover:bg-gray-100 transition-colors items-center gap-2">
              <img
                src={""}
                className="w-6 h-6 object-cover rounded-full ring-2 ring-gray-300"
                alt="Perfil"
              />
              usuario
            </div>
            <Divider type="vertical" />
            <a
              href="/logout"
              className="flex hover:bg-gray-100 transition-colors items-center gap-2"
              onClick={handleLogout}
            >
              <LogoutOutlined />
              Salir
            </a>
            <Divider type="vertical" />
            <a
              href="/login"
              className="flex hover:bg-gray-100 transition-colors items-center gap-2"
            >
              <LoginOutlined /> Iniciar session
            </a>
          </div>
        </div>
      </Header>
      <Content>{children}</Content>
      <Footer className="bg-white">
        <div className="bg-white flex flex-col xl:flex-row justify-center items-center gap-4 xl:gap-0 xl:justify-between w-full p-4">
          <div>
            <p className="text-gray-800 text-center md:text-left">
              <span className="text-gray-900 font-bold">BPT.</span> Prueba Crud
            </p>
          </div>
          <div className="flex flex-col xl:flex-row items-center gap-2">
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Terminos y condiciones
            </a>
            <span className="hidden xl:flex">|</span>
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              Política de privacidad
            </a>
          </div>
        </div>
      </Footer>
    </Layout>
  );
}

export default NavBar;
