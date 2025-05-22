import React from "react";
import {
  BookOpen,
  Users,
  LifeBuoy,
  HeadphonesIcon,
  ArrowRight,
} from "lucide-react";

const ResourcesAndSection = () => {
  const resources = [
    {
      id: 1,
      icon: <BookOpen className="h-6 w-6 text-emerald-600" />,
      title: "User Guides",
      description:
        "Download detailed manuals, setup guides, and best practices for optimal use of your monitoring devices.",
      link: "View Documents",
      bgColor: "bg-emerald-100",
      hoverColor: "group-hover:bg-emerald-200",
    },
    {
      id: 2,
      icon: <Users className="h-6 w-6 text-emerald-600" />,
      title: "Community Forum",
      description:
        "Join our active community of farmers and distributors to share insights, tips, and experiences.",
      link: "Visit Forum",
      bgColor: "bg-emerald-100",
      hoverColor: "group-hover:bg-emerald-200",
    },
    {
      id: 3,
      icon: <LifeBuoy className="h-6 w-6 text-emerald-600" />,
      title: "Technical Support",
      description:
        "Our dedicated support team is ready to help with any questions or troubleshooting needs.",
      link: "Get Help",
      bgColor: "bg-emerald-100",
      hoverColor: "group-hover:bg-emerald-200",
    },
    {
      id: 4,
      icon: <HeadphonesIcon className="h-6 w-6 text-emerald-600" />,
      title: "Customer Service",
      description:
        "Contact our friendly customer service team for account inquiries, orders, and general assistance.",
      link: "Contact Us",
      bgColor: "bg-emerald-100",
      hoverColor: "group-hover:bg-emerald-200",
    },
  ];

  return (
    <div className="mb-16 bg-gradient-to-r from-emerald-50 to-amber-50 rounded-3xl p-4 lg:p-10 text-gray-800">
      <div className="flex flex-col laptop-lg:flex-row justify-between items-start laptop-lg:items-center mb-8">
        <div>
          <h2 className="text-[clamp(1rem,8vw,1.5rem)] font-bold mb-2">
            Resources & Support
          </h2>
          <p className="text-gray-600 max-w-xl">
            Everything you need to get the most out of your food storage
            monitoring system
          </p>
        </div>
        <a
          href="#"
          className="mt-4 laptop-lg:mt-0 inline-flex items-center bg-white text-emerald-600 hover:text-emerald-700 px-4 py-2 rounded-lg border border-emerald-200 shadow-sm transition font-medium"
        >
          Support Center
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 laptop-lg:grid-cols-2 desktop-lg:grid-cols-4 gap-6">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition duration-300 group border border-gray-50"
          >
            <div
              className={`h-14 w-14 ${resource.bgColor} rounded-xl flex items-center justify-center mb-5 transition-all duration-300 ${resource.hoverColor}`}
            >
              {resource.icon}
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {resource.title}
            </h3>

            <p className="text-gray-600 mb-5 leading-relaxed">
              {resource.description}
            </p>

            <a
              href="#"
              className="inline-flex items-center text-amber-600 hover:text-amber-700 font-semibold transition group-hover:translate-x-1 duration-300"
            >
              {resource.link}
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        ))}
      </div>

      <div className="mt-10 p-6 bg-white rounded-2xl shadow-sm border border-gray-50">
        <div className="grid grid-cols-1 laptop-lg:grid-cols-3 gap-6 items-center">
          <div className="laptop-lg:col-span-2">
            <h3 className="text-xl font-semibold mb-2">
              Need personalized assistance?
            </h3>
            <p className="text-gray-600">
              Our expert team is ready to provide customized solutions for your
              specific agricultural monitoring needs.
            </p>
          </div>
          <div className="flex justify-start md:justify-end">
            <a
              href="#"
              className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-amber-500 text-white px-6 py-3 rounded-lg hover:from-emerald-600 hover:to-amber-600 transition shadow-sm font-medium"
            >
              Schedule a Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesAndSection;
