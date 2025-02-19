import { useState } from "react";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

const Help = () => {
  const [open, setOpen] = useState(null);

  const faqs = {
    "Getting Started": [
      {
        question: "What is Earnly?",
        answer:
          "Earnly is a Micro Tasking and Earning Platform where users complete small tasks to earn money. Buyers post tasks, and workers complete them to earn coins.",
      },
      {
        question: "How do I sign up?",
        answer:
          "You can sign up using your email and phone number. After verification, you can start working or posting tasks.",
      },
    ],
    "Earning & Payments": [
      {
        question: "How does the coin system work?",
        answer:
          "Buyers purchase 10 coins for $1. Workers withdraw $1 for every 20 coins. The minimum withdrawal is 200 coins ($10).",
      },
      {
        question: "What payment methods are supported?",
        answer:
          "We support Bkash, Rocket, Nagad, and other local payment methods.",
      },
      {
        question: "How long does it take to process withdrawals?",
        answer:
          "Withdrawals are processed within 24-48 hours after approval.",
      },
    ],
    "Task & Verification": [
      {
        question: "How do I complete a task?",
        answer:
          "Find a task that matches your skills, complete the required action, and submit proof. The buyer will review and approve it.",
      },
      {
        question: "What happens if my submission is rejected?",
        answer:
          "If a buyer rejects your submission unfairly, you can report the issue to our support team for review.",
      },
    ],
    "Security & Policies": [
      {
        question: "Is my personal information safe?",
        answer:
          "Yes, we use industry-standard encryption and data protection policies to keep your information secure.",
      },
      {
        question: "Can I have multiple accounts?",
        answer:
          "No, multiple accounts are strictly prohibited. Violations may lead to account suspension.",
      },
    ],
  };

  return (
    <div className="container py-8 mx-auto md:px-4 px-2 ">
      <h1 className="text-4xl font-bold text-center text-[#5f1a89] mb-6">
        Help & FAQ
      </h1>
      <TabGroup>
        <TabList className="flex space-x-2 bg-gray-100 p-2 rounded-xl">
          {Object.keys(faqs).map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                `flex-1 text-center py-2 text-lg font-medium rounded-lg transition-colors duration-300 ${
                  selected ? "bg-[#5f1a89] text-white" : "bg-white text-gray-800"
                }`
              }
            >
              {tab}
            </Tab>
          ))}
        </TabList>

        <TabPanels className="mt-4">
          {Object.keys(faqs).map((tab, index) => (
            <TabPanel key={index} className="space-y-4">
              {faqs[tab].map((faq, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-lg p-4 cursor-pointer"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-xl ">{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${
                        open === i ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {open === i && (
                    <p className="mt-2 text-base ">{faq.answer}</p>
                  )}
                </div>
              ))}
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>

      <div className="mt-8 bg-[#461564] text-white p-4 rounded-lg text-center">
        <h2 className="text-lg font-medium">Still Need Help?</h2>
        <p className="text-sm mt-1">
          Contact us at <span className="font-medium">support@earnly.com</span> or use live chat.
        </p>
      </div>
    </div>
  );
};

export default Help;
