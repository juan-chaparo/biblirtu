import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prismaLib/prismaInstance";
import { message } from "antd";

export async function GET(request: NextRequest) {
  try {
    const review = await prisma.review.findMany({
      include: {
        book: {
          include: {
            authors: true,
            bookType: true,
            genre: true,
          },
        },
        user: true,
      },
    });
    return NextResponse.json(review, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "Fallo interno" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const userJWT = request.cookies.get("userAuth");
  if (!userJWT) {
    return NextResponse.json({ message: "No se creo" }, { status: 401 });
  }
  const { payload } = await jwtVerify(
    userJWT.value,
    new TextEncoder().encode(process.env.JWT_SECRET_KEY)
  );

  const { id, review, rating } = await request.json();
  try {
    const reviewUpdate = await prisma.review.update({
      where: {
        id: id,
        userId: payload.id as number,
      },
      data: {
        rating,
        comment: review,
      },
    });
    return NextResponse.json(
      { reviewUpdate, message: "Se actualizo" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "No se actualizo o no eres el propietario" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const userJWT = request.cookies.get("userAuth");
  if (!userJWT) {
    return NextResponse.json({ message: "No se creo" }, { status: 401 });
  }
  const { payload } = await jwtVerify(
    userJWT.value,
    new TextEncoder().encode(process.env.JWT_SECRET_KEY)
  );

  const { id } = await request.json();
  try {
    const reviewUpdate = await prisma.review.delete({
      where: {
        id: id,
        userId: payload.id as number,
      },
    });
    return NextResponse.json(
      { reviewUpdate, message: "Se elimino" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "No se pudo eliminar" },
      { status: 500 }
    );
  }
}
