"use client";
import {
  Button,
  DatePicker,
  Input,
  InputRef,
  Space,
  Modal,
  message,
  Spin,
  Rate,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import Table, { ColumnsType } from "antd/es/table";
import { ColumnType, FilterConfirmProps } from "antd/es/table/interface";
import {
  CloseCircleOutlined,
  FormOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import moment from "moment";
import TextArea from "antd/es/input/TextArea";
import { Controller, useForm } from "react-hook-form";
import myApi from "@/utils/front/axiosConfig";
import { useAppSelector } from "@/redux/hooks";

export interface Review {
  id: number;
  userId: number;
  bookId: number;
  rating: number;
  comment: string;
  createdAt: string;
  book: Book;
  user: User;
}

export interface Book {
  id: number;
  name: string;
  bookTypeId: number;
  genreId: number;
  publicationDate: string;
  description: string;
  idReference: string;
  image: string;
  authors: Author[];
  bookType: BookType;
  genre: BookType;
}

export interface Author {
  id: number;
  authorId: number;
  bookId: number;
  creationDate: string;
}

export interface BookType {
  id: number;
  name: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image: null;
  createdAt: string;
  userTypeId: number;
}

interface UpdateReviewForm {
  rating: number;
  review: string;
}

type DataIndex = keyof Review;

const desc = ["No recomendado", "Terrible", "normal", "Bueno", "Excelente"];

interface Props {
  books: Review[];
}

function ReviewScreen({ books }: Props) {
  const [selectedBook, setSelectedBook] = useState<Review | null>(null);
  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<UpdateReviewForm>();
  const [showBookDetails, setShowBookDetails] = useState(false);
  const [showReviewDetails, setShowReviewDetails] = useState(false);
  const [showUpdateReview, setShowUpdateReview] = useState(false);
  const [showDeleteReview, setShowDeleteReview] = useState(false);
  const [bookState, setBookState] = useState<Review[]>(books);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedBook) {
      setValue("rating", selectedBook?.rating);
      setValue("review", selectedBook?.comment);
    }
  }, [selectedBook]);

  const viewBook = (review: Review) => {
    setSelectedBook(review);
    setShowBookDetails(true);
  };

  const viewReview = (review: Review) => {
    setSelectedBook(review);
    setShowReviewDetails(true);
  };

  const closeUpdateReview = () => {
    setShowUpdateReview(false);
  };

  const handleUpdate = (review: Review) => {
    setSelectedBook(review);
    setShowUpdateReview(true);
  };

  const handleDelete = (review: Review) => {
    setSelectedBook(review);
    setShowDeleteReview(true);
  };

  const handleDeleteButton = async () => {
    try {
      setLoading(true);
      const deleteReview = await myApi.delete("reviews", {
        data: { id: selectedBook?.id },
      });
      setBookState((reviews) =>
        reviews.filter((review) => review.id !== selectedBook?.id)
      );
      message.error(deleteReview.data.message);
      setLoading(false);
      setShowDeleteReview(false);
    } catch (error: any) {
      message.error(error.response.data.message);
    }
  };

  const onSubmit = async (data: UpdateReviewForm) => {
    try {
      setLoading(true);
      const reviewPut = await myApi.put("reviews", {
        ...data,
        id: selectedBook?.id,
      });
      message.success(reviewPut.data.message);
      setBookState((reviews) =>
        reviews.map((review) =>
          review.id === reviewPut.data.reviewUpdate.id
            ? {
                ...review,
                rating: reviewPut.data.reviewUpdate.rating,
                comment: reviewPut.data.reviewUpdate.comment,
              }
            : review
        )
      );
      setShowUpdateReview(false);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      message.error(error.response.data.message);
    }
  };

  const columns: ColumnsType<Review> = [
    {
      title: "Imagen",
      dataIndex: ["book", "image"],
      key: "image",
      width: "8%",
      render: (immg) => (
        <img
          src={immg}
          className="w-10 h-10 object-cover rounded-full ring-2 ring-gray-300"
        />
      ),
    },
    {
      title: "Referencia del libro",
      dataIndex: ["book", "id"],
      key: "idRefence",
      width: "8%",
    },
    {
      title: "Nombre del libro",
      dataIndex: ["book", "name"],
      key: "name",
      width: "11%",
      render: (titulo, record) => {
        return (
          <Button type="link" onClick={() => viewBook(record)}>
            {titulo}
          </Button>
        );
      },
    },
    {
      title: "Critico",
      dataIndex: ["user", "firstName"],
      key: "people",
      width: "14%",
      render: (empresa, record) => {
        return (
          <a href={`profile`} className="text-blue-600">
            {empresa}
          </a>
        );
      },
    },
    {
      title: "Reseña",
      dataIndex: "comment",
      key: "review",
      width: "33%",
      render: (comment, record) => {
        return (
          <Button type="link" onClick={() => viewReview(record)}>
            <p
              style={{
                whiteSpace: "pre-line",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {comment}
            </p>
          </Button>
        );
      },
    },
    {
      title: "Tipo de libro",
      dataIndex: ["book", "bookType", "name"],
      key: "bookType",
      width: "8%",
    },
    {
      title: "Genero",
      dataIndex: ["book", "genre", "name"],
      key: "gnere",
      width: "8%",
    },
    {
      title: "Fecha de publicación",
      dataIndex: ["book", "publicationDate"],
      key: "publicationDate",
      width: "14%",
      render: (value, record) => {
        return <p>{moment(value).locale("es").format("L")}</p>;
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      width: "10%",
      render: (_, record) => {
        return (
          <>
            <Button type="link" onClick={() => handleUpdate(record)}>
              <FormOutlined />
            </Button>
            <Button type="link" onClick={() => handleDelete(record)}>
              <CloseCircleOutlined />
            </Button>
          </>
        );
      },
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={bookState}
        pagination={{ position: ["bottomLeft"], pageSize: 30 }}
        scroll={{ x: 500 }}
        className="shadow-2xl m-4"
        rowKey={"id"}
      />
      <Modal
        title="Detalle del libro"
        open={showBookDetails}
        onCancel={() => setShowBookDetails(false)}
        footer={null}
      >
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-xl transition-all w-full">
          <div className="w-full flex items-center justify-center">
            <img
              src={selectedBook?.book.image}
              className="w-[150px] h-[150px] object-cover rounded-lg"
              alt=""
            />
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <a href="#" className="text-2xl font-semibold hover:underline">
              {selectedBook?.book.name}
            </a>
            <p className="text-gray-600">{selectedBook?.book.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <span>{selectedBook?.book.bookType.name}</span>
                </div>
              </div>
              <div>
                <p className="uppercase text-gray-600 text-sm">
                  {moment(selectedBook?.book.publicationDate)
                    .locale("es")
                    .format("L")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        title="Detalle de la reseña"
        open={showReviewDetails}
        onCancel={() => setShowReviewDetails(false)}
        footer={null}
      >
        <div className="bg-white max-w-2xl mx-auto py-4 px-6 rounded-lg shadow-xl">
          <div className="flex flex-col gap-2 mb-4">
            <div className="text-2xl text-gray-700 font-bold hover:underline">
              {selectedBook?.user.firstName} {selectedBook?.user.lastName}
            </div>
            <p className="text-gray-600">{selectedBook?.comment}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="transition-colors">
              {moment(selectedBook?.createdAt).locale("es").format("L")}
            </div>
            <div className="flex items-center gap-4">
              <div>
                <Rate value={selectedBook?.rating} disabled />
                <span>{selectedBook?.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        title="Actualizar la reseña"
        open={showUpdateReview}
        onCancel={() => closeUpdateReview()}
        footer={[null]}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-4 py-8 flex flex-col  md:items-center md:justify-center gap-8">
            <div className="w-full flex flex-col gap-y-2">
              <label>Calificación</label>
              <span></span>
              <Controller
                name="rating"
                control={control}
                render={({ field }) => {
                  return (
                    <>
                      <Rate tooltips={desc} {...field} />
                      {field.value ? (
                        <span className="ant-rate-text">
                          {desc[field.value - 1]}
                        </span>
                      ) : (
                        ""
                      )}
                    </>
                  );
                }}
              />
            </div>
            <div className="w-full flex flex-col gap-y-2">
              <label>Reseña</label>
              <Controller
                name="review"
                control={control}
                render={({ field }) => {
                  return (
                    <div className="relative">
                      <TextArea
                        rows={4}
                        placeholder="Reseña"
                        maxLength={333}
                        showCount
                        {...field}
                      />
                    </div>
                  );
                }}
              />
            </div>
          </div>
          <div className="flex justify-between items-center gap-2" key="footer">
            <Button
              key="back"
              type="default"
              onClick={() => closeUpdateReview()}
              className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-slate-50 rounded-xl transition-colors"
              disabled={loading}
            >
              Cancelar
            </Button>
            <button
              key="submit"
              type="submit"
              className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-slate-50 rounded-xl transition-colors p-1.5"
              disabled={loading}
            >
              {loading ? <Spin /> : "Actualizar"}
            </button>
          </div>
        </form>
      </Modal>
      <Modal
        title="Eliminar la reseña"
        open={showDeleteReview}
        onCancel={() => setShowDeleteReview(false)}
        footer={[
          <div className="flex items-center justify-between" key="footer">
            <div>Desea eliminar la reseña?</div>
            <div>
              <Button
                key="back"
                type="default"
                onClick={() => setShowDeleteReview(false)}
                className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-slate-50 rounded-xl transition-colors"
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button
                key="submit"
                type="default"
                className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-slate-50 rounded-xl transition-colors"
                onClick={() => handleDeleteButton()}
                disabled={loading}
              >
                {loading ? <Spin /> : "Eliminar"}
              </Button>
            </div>
          </div>,
        ]}
      ></Modal>
    </>
  );
}

export default ReviewScreen;
