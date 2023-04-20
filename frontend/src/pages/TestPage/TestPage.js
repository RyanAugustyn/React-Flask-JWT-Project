import React from "react";
import AddReview from "../../components/AddReview/AddReview";

const TestPage = () => {
  const test_books = [
    {
      id: "aJQILlLxRmAC",
      image:
        "http://books.google.com/books/content?id=aJQILlLxRmAC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE71mBJudLPA6TygOGs0y21qMQTe6amlmsYJmrLiSswz_jDUzVnwb6MQIOAS1d5z8dDR5YFh8V_m89eSItXR8eFrJAtpKbw9M9gSiJSdLCD1ABz6iCMyZYu0kWgH-bzeX2L84S9DL&source=gbs_api",
      title: "Python Programming",
      pageCount: 517,
      subTitle: "An Introduction to Computer Science",
      priceCurrency: "$",
      priceAmount: null,
      author: "John M. Zelle",
      description:
        "This book is suitable for use in a university-level first course in computing (CS1), as well as the increasingly popular course known as CS0. It is difficult for many students to master basic concepts in computer science and programming. A large portion of the confusion can be blamed on the complexity of the tools and materials that are traditionally used to teach CS1 and CS2. This textbook was written with a single overarching goal: to present the core concepts of computer science as simply as possible without being simplistic.",
    },
    {
      id: "aErDoAEACAAJ",
      image: null,
      title: "Programming Python, 3/E",
      pageCount: 1552,
      subTitle: "",
      priceCurrency: "$",
      priceAmount: null,
      author: "Mark Lutz",
      description:
        "Whether you're a novice or an advanced practitioner, you'll find this refreshed book more than lives up to its reputation. Programming Python, Third Edition teaches you the right way to code. It explains Python language syntax and programming techniques in a clear and concise manner, with numerous examples that illustrate both correct usage and common idioms. By reading this comprehensive guide, you'll learn how to apply Python in real-world problem domains such as:",
    },
  ];
  return <AddReview book_id="aJQILlLxRmAC" />;
};

export default TestPage;
