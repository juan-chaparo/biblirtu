import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismaLib/prismaInstance";
import bcrypt from "bcrypt";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";

interface LoginRequest {
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  const data: LoginRequest = await request.json();
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  if (
    !data.email ||
    !data.password ||
    !emailRegex.test(data.email) ||
    !passwordRegex.test(data.password)
  ) {
    return NextResponse.json(
      { message: "Información incorrecta o incompleta" },
      { status: 400 }
    );
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      return NextResponse.json(
        {
          message: "Credenciales erroneas",
        },
        {
          status: 401,
        }
      );
    }
    const validation = bcrypt.compareSync(data.password, user.password);
    if (!validation) {
      return NextResponse.json(
        {
          message: "Credenciales erroneas",
        },
        {
          status: 401,
        }
      );
    }
    const nameUser = `${user.firstName} ${user.lastName ?? ""}`;
    const token = jwt.sign(
      {
        email: user.email,
        id: user.id,
        userType: user.userTypeId,
        nameUser,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
      },
      process.env.JWT_SECRET_KEY ?? ""
    );
    const logSerialized = serialize("userAuth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "production",
      sameSite: "strict",
      path: "/",
    });
    return NextResponse.json(
      {
        message: "Exito",
        email: user.email,
        id: user.id,
        userType: user.userTypeId,
        nameUser,
      },
      { status: 200, headers: { "Set-Cookie": logSerialized } }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
