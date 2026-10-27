
import React from 'react';
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      company: "TechStart Inc.",
      role: "CEO",
      content: "The automation solution they built for us reduced our manual work by 85%. The team was professional, responsive, and delivered exactly what we needed.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 2,
      name: "Michael Chen",
      company: "RetailMax",
      role: "Operations Director",
      content: "Our new e-commerce platform exceeded all expectations. Sales increased 45% in the first quarter alone. Highly recommend their services!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      company: "GreenTech Solutions",
      role: "Marketing Manager",
      content: "The website they created for us is beautiful and functional. We've seen a 60% increase in lead generation since launch.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <section className="relative py-24 bg-[#040a14]">
      <div className="container-custom">
        <div className="mb-14 text-center animate-on-scroll">
          <span className="eyebrow-badge mb-5">Testimonials</span>
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle mx-auto">
            Don't just take our word for it - hear from businesses we've helped transform.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="glass-card animate-on-scroll p-7"
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div className="mb-5 flex items-center gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current text-[#33c3f0]" />
                ))}
              </div>

              <p className="mb-7 italic leading-relaxed text-[#c6d5e6]">"{testimonial.content}"</p>

              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="mr-4 h-12 w-12 rounded-full border border-white/10 object-cover"
                />
                <div>
                  <h4 className="font-display font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-[#8fa6bf]">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
