import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const t = useTranslations("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    { question: t("q1"), answer: t("a1") },
    { question: t("q2"), answer: t("a2") },
    { question: t("q3"), answer: t("a3") },
    { question: t("q4"), answer: t("a4") },
    { question: t("q5"), answer: t("a5") },
  ];

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-surface-default py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold text-content-default mb-8 text-center">
          {t("title")}
        </h2>
        <dl className="space-y-6">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-surface-secondary rounded-lg shadow-md"
            >
              <dt className="text-lg">
                <button
                  onClick={() => toggleQuestion(index)}
                  className="flex justify-between items-center w-full text-left px-4 py-5 focus:outline-none"
                >
                  <span className="font-medium text-content-default">
                    {item.question}
                  </span>
                  <span className="ml-6 flex-shrink-0">
                    {openIndex === index ? (
                      <FaChevronUp className="h-5 w-5 text-primary-default" />
                    ) : (
                      <FaChevronDown className="h-5 w-5 text-primary-default" />
                    )}
                  </span>
                </button>
              </dt>
              {openIndex === index && (
                <dd className="mt-2 px-4 pb-5">
                  <p className="text-content-secondary">{item.answer}</p>
                </dd>
              )}
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default FAQ;
