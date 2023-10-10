import { prisma } from "@/lib/prismaLib/prismaInstance";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

interface RegisterUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userTypeId: number;
}

export async function POST(request: NextRequest) {
  const data: RegisterUserRequest = await request.json();
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  if (
    !data.email ||
    !data.lastName ||
    !data.firstName ||
    !data.password ||
    !data.userTypeId ||
    !emailRegex.test(data.email) ||
    !passwordRegex.test(data.password)
  ) {
    return NextResponse.json(
      { message: "Información incorrecta o incompleta" },
      { status: 400 }
    );
  }
  const salt = 11;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (user) {
      return NextResponse.json(
        { message: "Usuario ya esta registrado" },
        { status: 406 }
      );
    }

    const passwordHash = bcrypt.hashSync(data.password, salt);

    const newUser = await prisma.user.create({
      data: { ...data, password: passwordHash },
    });
    return NextResponse.json(
      { message: "Usuario registrado" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
