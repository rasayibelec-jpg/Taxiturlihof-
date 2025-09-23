import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Reviews from "./Reviews";

const ReviewsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-20">
        <Reviews />
      </div>
      <Footer />
    </div>
  );
};

export default ReviewsPage;