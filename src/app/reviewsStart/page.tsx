import React from "react";
import ReviewScreen from "@/components/screens/ReviewScreen";
import myApi from "@/utils/front/axiosConfig";

const getReview = async () => {
  try {
    const reviews = await myApi.get("/reviews");
    return reviews.data;
  } catch (error) {
    return [];
  }
};

async function ReviewsStartPage() {
  const review = await getReview();
  return (
    <>
      <ReviewScreen books={review} />
    </>
  );
}

export default ReviewsStartPage;
