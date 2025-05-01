import React from "react";
import { ChevronDown } from "lucide-react";

const Faq = () => {
  return (
    <div>
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-[#464646] mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {[
            {
              question: "How long does the battery last?",
              answer:
                "The Digital Food Storage Monitor uses a rechargeable lithium-ion battery that lasts up to 12 months on a single charge with normal use. Battery life may vary depending on environmental conditions and reporting frequency.",
            },
            {
              question: "Is this device weatherproof?",
              answer:
                "Yes, our Digital Food Storage Monitor has an IP65 rating, making it dust-tight and protected against water jets from any direction. It's designed to withstand various agricultural environments, including humid storage facilities and mild outdoor conditions.",
            },
            {
              question: "Can I access data when I'm away from the farm?",
              answer:
                "Absolutely! All data is securely stored in the cloud and can be accessed from anywhere using our mobile app or web dashboard. You'll receive real-time alerts and can check conditions remotely.",
            },
            {
              question: "How many sensors can I connect to one account?",
              answer:
                "Our standard plan allows connection of up to 5 monitoring devices to a single account. For larger operations, our Premium and Enterprise plans offer unlimited device connections to suit your needs.",
            },
          ].map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100"
            >
              <details className="group">
                <summary className="flex justify-between items-center font-semibold cursor-pointer p-5">
                  <span>{faq.question}</span>
                  <ChevronDown className="h-5 w-5 transition group-open:rotate-180" />
                </summary>
                <p className="p-5 pt-0 leading-relaxed">{faq.answer}</p>
              </details>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
