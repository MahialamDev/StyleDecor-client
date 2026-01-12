import React from "react";
import { ShieldCheck, Clock, Users, CreditCard } from "lucide-react";

const FeatureSection = () => {
  const features = [
    {
      id: 1,
      icon: ShieldCheck,
      title: "Verified Professionals",
      description: "All our decorators are verified and highly professional.",
    },
    {
      id: 2,
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Book services at your preferred date and time.",
    },
    {
      id: 3,
      icon: Users,
      title: "Dedicated Support",
      description: "Our support team is available to assist you anytime.",
    },
    {
      id: 4,
      icon: CreditCard,
      title: "Secure Payments",
      description: "Pay online safely via Stripe with instant confirmation.",
    },
  ];

  return (
    <div className="py-20 px-4 bg-transparent">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-base-content mb-4 tracking-tighter uppercase italic">
          Why Choose <span className="text-primary">StyleDecor</span>
        </h2>
        <p className="text-base-content/60 max-w-2xl mx-auto font-medium">
          StyleDecor offers a modern, convenient, and trustworthy solution for 
          all your interior decoration needs.
        </p>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="group bg-base-100 border-2 border-base-300 rounded-[2rem] p-8 text-center hover:border-primary transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-primary/5"
          >
            {/* Icon Container */}
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="text-primary w-10 h-10" />
              </div>
            </div>

            {/* Content */}
            <h3 className="text-xl font-black text-base-content mb-3 uppercase tracking-tight">
              {feature.title}
            </h3>
            <p className="text-sm text-base-content/50 leading-relaxed font-medium">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;