import React, { useState } from "react";
import UserInfo from "./UserInfo";


interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

const username: string = "nguyenvana";


const quizData: QuizQuestion[] = [
  {
    question: "Tên đầy đủ của tuyến cao tốc Bắc – Nam hiện nay là gì?",
    options: [
      "Cao tốc Hồ Chí Minh – Hà Nội",
      "Cao tốc Bắc – Nam phía Đông",
      "Quốc lộ 1A mở rộng",
      "Cao tốc ven biển Việt Nam",
    ],
    answer: "Cao tốc Bắc – Nam phía Đông",
  },
  {
    question:
      "Tuyến cao tốc Bắc – Nam chủ yếu chạy song song với tuyến giao thông nào?",
    options: [
      "Đường Hồ Chí Minh",
      "Đường sắt Bắc – Nam",
      "Quốc lộ 1A",
      "Quốc lộ 14",
    ],
    answer: "Quốc lộ 1A",
  },
  {
    question:
      "Khi gặp sự cố trên cao tốc, người lái xe cần làm gì đầu tiên?",
    options: [
      "Xuống xe đứng giữa đường",
      "Dừng xe ngay làn xe chạy",
      "Bật đèn cảnh báo, đưa xe vào làn dừng khẩn cấp",
      "Gọi điện cho người thân",
    ],
    answer: "Bật đèn cảnh báo, đưa xe vào làn dừng khẩn cấp",
  },
];

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [optionSelected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);

  const question = quizData[currentQuestion];

  const handleSelectOption = (option: string) => {
    if (optionSelected) return; // khóa chọn

    setSelected(option);

    if (option === question.answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelected(null);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelected(null);
    }
  };

  return (
    <>
      <UserInfo username={username} />
      <h2>
        Câu {currentQuestion + 1}
      </h2>

      <p className="question">{question.question}</p>

      {question.options.map((option) => {
        let className = "option";

        if (optionSelected) {
          if (option === question.answer) {
            className += " correct"; 
          } else if (option === optionSelected) {
            className += " wrong";
          }
        }

        return (
          <button
            key={option}
            className={className}
            onClick={() => handleSelectOption(option)}
            disabled={!!optionSelected}
          >
            {option}
          </button>
        );
      })}

      {optionSelected && (
        <>
          <p>
            Đáp án đúng: <b>{question.answer}</b>
          </p>
          <p>
            {optionSelected === question.answer ? "Correct" : "Incorrect"}
          </p>
        </>
      )}

      <div className="nav-buttons">
        <button onClick={handlePrev} disabled={currentQuestion === 0}>
          Quay lại
        </button>
        <button
          onClick={handleNext}
          disabled={!optionSelected || currentQuestion == quizData.length - 1}
        >
          Kế tiếp
        </button>
      </div>

      <p>
        Điểm hiện tại: <b>{score}</b>
      </p>
    </>
  );
};

export default Quiz;
