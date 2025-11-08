import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check, Zap, Crown, Rocket } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const servicesList = [
  "Web Design", "Web Development", "SEO", "Graphic Design", "Social Media Marketing",
  "E-commerce Solutions", "Mobile App Development", "Branding", "UI/UX Design",
  "Content Writing", "Photography", "Video Editing",
  // Add all 360+ services A-Z here
];

const Pricing = () => {
  const { toast } = useToast();
  const [ref] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // New state for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customData, setCustomData] = useState({
    name: "",
    email: "",
    service: "",
    otherService: "",
    requirements: "",
    budget: "",
  });

  const plans = [
    {
      name: "Starter",
      icon: Zap,
      price: "$99",
      period: "one-time",
      description: "Perfect for small businesses getting started",
      features: [
        "1 Page Responsive Website",
        "Mobile Optimization",
        "Contact Form Integration",
        "Social Media Links",
      ],
      color: "border-primary/50",
      buttonVariant: "outline" as const,
    },
    {
      name: "Professional",
      icon: Crown,
      price: "$199",
      period: "one-time ",
      description: "For growing businesses that need more",
      features: [
        "3 to 5 Page Custom Website",
        "Basic SEO Optimization",
        "Responsive Design (Mobile, Tablet, Desktop)",
        "Modern UI/UX Layout",
        "Contact Form + Google Maps Integration",
        "1 Week Support",
        "Logo Design (3 Concepts + Revisions)",
      ],
      popular: true,
      color: "border-accent shadow-glow",
      buttonVariant: "default" as const,
    },
    {
      name: "Enterprise",
      icon: Rocket,
      price: "Custom",
      period: "contact us",
      description: "Full-stack solutions for serious growth",
      features: [
        "Unlimited Pages",
        "Custom Web Application",
        "Full Digital Marketing",
        "Dedicated Account Manager",
        "Priority Support",
        "Advanced Analytics",
        "API Integrations",
        "Custom Features",
        "White-Label Solutions",
      ],
      color: "border-secondary/50",
      buttonVariant: "outline" as const,
    },
  ];

  const handleSelectPlan = (planName: string) => {
    toast({
      title: `${planName} Plan Selected! 🎉`,
      description: "We'll contact you shortly to discuss the details.",
    });
  };

  // Handle input changes for Custom Package
  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setCustomData({ ...customData, [e.target.name]: e.target.value });
  };

  // Send Custom Package via WhatsApp
  const handleCustomSubmit = () => {
    const phoneNumber = "923173712950";
    const serviceText = customData.service === "Other" ? customData.otherService : customData.service;
    const message = `Hello! I'd like a custom package.\nName: ${customData.name}\nEmail: ${customData.email}\nService: ${serviceText}\nRequirements: ${customData.requirements}\nBudget: ${customData.budget}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setIsModalOpen(false);
    setCustomData({ name: "", email: "", service: "", otherService: "", requirements: "", budget: "" });
  };

  return (
    <section id="pricing" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div ref={ref} className="text-center mb-16 space-y-4">
          <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium">
            Pricing Plans
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Choose Your Growth Path
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transparent pricing with no hidden fees. Scale as you grow.
          </p>
           <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            All listed prices represent starting packages that outline our services and value. Actual project costs may vary based on your specific requirements including pages, features, design complexity, and marketing scope as each project is custom-built, and a personalized quotation is provided after reviewing your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <div key={plan.name} className={plan.popular ? "lg:scale-105" : ""}>
              <Card className={`h-full border-2 ${plan.color} relative overflow-hidden group hover:shadow-glow hover:-translate-y-2 hover:scale-[1.03] hover:border-primary/50 transition-all duration-300 cursor-pointer`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-accent text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                    MOST POPULAR
                  </div>
                )}
                
                <CardHeader className="text-center space-y-4 pb-8 pt-8">
                  <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center ${
                    plan.popular ? "bg-gradient-accent" : "bg-gradient-primary"
                  }`}>
                    <plan.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold gradient-text">{plan.price}</div>
                    <div className="text-sm text-muted-foreground mt-1">{plan.period}</div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleSelectPlan(plan.name)}
                    variant={plan.buttonVariant}
                    className={`w-full h-12 ${
                      plan.popular ? "bg-gradient-accent hover:opacity-90" : ""
                    }`}
                  >
                    {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Custom Package CTA */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-card to-primary/5 border-2 border-primary/30">
            <CardContent className="p-8 space-y-4">
              <h3 className="text-2xl font-bold">Need a Custom Package?</h3>
              <p className="text-muted-foreground">
                Tell us your requirements and we'll create a tailored solution just for you
              </p>
              <Button
                className="bg-gradient-primary hover:opacity-90 transition-all duration-300"
                size="lg"
                onClick={() => setIsModalOpen(true)}
              >
                Build Custom Package
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Modal for Custom Package */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-xl p-6 w-full max-w-lg relative shadow-2xl"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              >
                <h3 className="text-2xl font-bold mb-4">Custom Package Request</h3>

                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={customData.name}
                  onChange={handleCustomChange}
                  className="w-full mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={customData.email}
                  onChange={handleCustomChange}
                  className="w-full mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                />

                <select
                  name="service"
                  value={customData.service}
                  onChange={handleCustomChange}
                  className="w-full mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                >
                  <option value="">Select a Service</option>
                  {servicesList.map((service, idx) => (
                    <option key={idx} value={service}>
                      {service}
                    </option>
                  ))}
                  <option value="Other">Other / Custom</option>
                </select>

                {customData.service === "Other" && (
                  <input
                    type="text"
                    name="otherService"
                    placeholder="Write your custom service here"
                    value={customData.otherService}
                    onChange={handleCustomChange}
                    className="w-full mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                  />
                )}

                <textarea
                  name="requirements"
                  placeholder="Your Requirements"
                  value={customData.requirements}
                  onChange={handleCustomChange}
                  className="w-full mb-3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                  rows={3}
                />

                <input
                  type="text"
                  name="budget"
                  placeholder="Budget (Optional)"
                  value={customData.budget}
                  onChange={handleCustomChange}
                  className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                />

                <div className="flex justify-end gap-3">
                  <Button
                    className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md transition-all duration-200"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-primary px-4 py-2 rounded-md text-white font-medium animate-pulse hover:animate-none transition-all duration-300"
                    onClick={handleCustomSubmit}
                  >
                    Send via WhatsApp
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Pricing;
