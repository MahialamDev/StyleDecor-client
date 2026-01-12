import React from "react";
import { CheckCircle, ArrowRight } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Browse Packages",
    description:
      "Explore our modern interior design packages and choose the perfect one for your home or office.",
  },
  {
    id: 2,
    title: "Book Consultation",
    description:
      "Schedule a consultation or on-site service at your preferred date and time.",
  },
  {
    id: 3,
    title: "Make Secure Payment",
    description:
      "Pay online securely using Stripe and get instant confirmation of your booking.",
  },
  {
    id: 4,
    title: "Track Progress",
    description:
      "Monitor your service status in real-time through your dedicated dashboard.",
  },
];

const HowItWorks = () => {
  return (
    <div className="py-20 px-4">
      {/* Heading */}
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-black text-base-content mb-4 tracking-tighter uppercase italic">
          How It <span className="text-primary">Works</span>
        </h1>
        <p className="text-base-content/60 max-w-2xl mx-auto font-medium">
          StyleDecor makes booking interior decoration services simple and
          hassle-free. Follow these 4 easy steps to get started.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="group relative bg-base-100 border-2 border-base-300 rounded-[2.5rem] p-8 text-center hover:border-primary transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-primary/5"
          >
            {/* Step Number Badge */}
            <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary text-primary-content rounded-full flex items-center justify-center font-black italic shadow-lg">
              0{step.id}
            </div>

            {/* Icon Container */}
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary group-hover:text-primary-content transition-colors duration-300 text-primary">
                <CheckCircle className="w-10 h-10" />
              </div>
            </div>

            {/* Content */}
            <h3 className="text-xl font-black text-base-content mb-3 uppercase tracking-tight group-hover:text-primary transition-colors">
              {step.title}
            </h3>
            <p className="text-sm text-base-content/50 leading-relaxed font-medium">
              {step.description}
            </p>

            {/* Decorative arrow for large screens */}
            {index !== steps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-6 -translate-y-1/2 z-10 text-base-300 group-hover:text-primary transition-colors">
                <ArrowRight size={24} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-20 text-center">
        <a
          href="/services"
          className="btn btn-primary btn-lg rounded-full px-12 font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20"
        >
          Get Started Now
        </a>
      </div>
    </div>
  );
};

export default HowItWorks;