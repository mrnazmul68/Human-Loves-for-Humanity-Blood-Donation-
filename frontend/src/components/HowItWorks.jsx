import { FaUserPlus, FaSearch, FaHeart } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus />,
      title: "Register",
      description:
        "Create your profile and become a registered donor in just a few minutes.",
    },
    {
      icon: <FaSearch />,
      title: "Find Donors",
      description:
        "Find matching blood groups and donors in your nearby area quickly.",
    },
    {
      icon: <FaHeart />,
      title: "Donate",
      description:
        "Your contribution can help save multiple lives in critical situations.",
    },
  ];

  return (
    <section className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-sky-200 mb-12 text-center">
          How MATOMA Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-gray-950 p-8 flex justify-center items-center flex-col rounded-2xl text-center transition-all duration-300"
            >
              <div className="text-4xl text-[#E11D48] animate-pulse mb-4 mx-auto">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-sky-200 mb-3">
                {step.title}
              </h3>
              <p className="text-red-200">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
