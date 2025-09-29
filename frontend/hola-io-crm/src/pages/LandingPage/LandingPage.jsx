import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle, Smartphone, Users, Wrench, BarChart3, Shield, Zap } from "lucide-react";
import Header from "../../components/landing/Header";

const LandingPage = () => {
  return (
    <>
      <div className="w-full min-h-full bg-gray-50">
        {/* Blur background effect */}
        <div className="w-[500px] h-[500px] bg-cyan-200/20 blur-[65px] absolute top-0 left-0 z-0"></div>

        {/* Use existing Header */}
        <Header />

        {/* Hero Section */}
        <div className="relative z-10 py-12 md:py-20 px-4 h-[100vh] flex items-center">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <Badge className="mb-4 inline-flex items-center gap-2 text-xs md:text-[13px] text-cyan-700 font-semibold bg-cyan-100 px-3 py-1 rounded-full border border-cyan-300">
                  <Zap className="w-3 h-3 md:w-4 md:h-4" /> Mobile Repair CRM Solution
                </Badge>
                <h1 className="text-3xl md:text-4xl lg:text-5xl mb-6 font-medium text-slate-900 leading-tight">
                  Streamline Your <br />
                  <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,from-cyan-700,via-emerald-500,to-cyan-600)] bg-[length:200%_200%] animate-text-shine font-semibold">
                    Mobile Repair Business
                  </span>
                </h1>
              </div>

              <div className="w-full lg:w-1/2">
                <p className="text-base md:text-[17px] text-slate-600 mb-6 text-center lg:text-left max-w-lg mx-auto lg:mx-0">
                  Complete CRM solution designed specifically for mobile repair shops. Manage customers, track repairs,
                  handle inventory, and grow your business with ease.
                </p>
                <div className="flex justify-center lg:justify-start">
                  <Link to="/signup">
                    <Button className="bg-slate-900 text-xs md:text-sm font-semibold text-white px-6 md:px-7 py-2 md:py-2.5 rounded-full hover:bg-cyan-100 hover:text-slate-900 border border-cyan-50 hover:border-cyan-300 transition-colors cursor-pointer">
                      Start Free Trial
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="bg-white w-full py-12 md:py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl text-center font-semibold text-slate-900 mb-4">
              Features That Help You Grow
            </h2>
            <p className="text-center text-slate-600 mb-8 md:mb-12 max-w-2xl mx-auto text-sm md:text-base">
              From customer management to repair tracking, Hola IO CRM has all the tools your repair business needs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  title: "Smart Dashboard",
                  desc: "Real-time insights into your business with analytics and reporting.",
                  icon: <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-cyan-600" />,
                },
                {
                  title: "Customer Management",
                  desc: "Profiles, repair history, and communication logs in one place.",
                  icon: <Users className="w-5 h-5 md:w-6 md:h-6 text-cyan-600" />,
                },
                {
                  title: "Job Sheet Creation",
                  desc: "Detailed job sheets with device info, issues, and repairs.",
                  icon: <Wrench className="w-5 h-5 md:w-6 md:h-6 text-cyan-600" />,
                },
                {
                  title: "Repair Tracking",
                  desc: "Track repair status and keep customers informed.",
                  icon: <Smartphone className="w-5 h-5 md:w-6 md:h-6 text-cyan-600" />,
                },
                {
                  title: "Inventory Management",
                  desc: "Track stock, manage parts, and automate reorders.",
                  icon: <Shield className="w-5 h-5 md:w-6 md:h-6 text-cyan-600" />,
                },
                {
                  title: "Billing & Invoicing",
                  desc: "Professional invoices, payment tracking, and seamless billing.",
                  icon: <Zap className="w-5 h-5 md:w-6 md:h-6 text-cyan-600" />,
                },
              ].map((item, i) => (
                <Card
                  key={i}
                  className="bg-[#F8FEFF] p-4 md:p-6 rounded-xl shadow-xs hover:shadow-md shadow-cyan-100 border border-cyan-100 transition"
                >
                  <CardHeader className="p-0">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-cyan-100 to-emerald-100 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                      {item.icon}
                    </div>
                    <CardTitle className="text-base md:text-lg text-slate-900 font-semibold mb-2">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-slate-600 text-sm md:text-base">{item.desc}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <div className="relative z-10 py-12 md:py-20 px-4 bg-gradient-to-br from-slate-900 to-cyan-950 text-white">
          <div className="container mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-medium mb-4">Why Choose Hola IO CRM?</h2>
              <p className="text-sm md:text-[17px] text-cyan-100 max-w-2xl mx-auto">
                Built specifically for mobile repair businesses with features that matter most to your success.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                "Increase efficiency by 40%",
                "Reduce paperwork by 80%",
                "Improve customer satisfaction",
                "Scale your business faster",
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 flex-shrink-0" />
                  <span className="text-sm md:text-[17px]">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative z-10 py-12 md:py-20 px-4 bg-white">
          <div className="container mx-auto text-center">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-medium mb-4 text-slate-900">
              Ready to Transform Your Repair Business?
            </h2>
            <p className="text-sm md:text-[17px] text-slate-600 mb-6 max-w-2xl mx-auto">
              Join thousands of repair shops already using Hola IO CRM to streamline their operations and grow their
              business.
            </p>
            <Link to="/signup">
              <Button className="bg-slate-900 text-xs md:text-sm font-semibold text-white px-6 md:px-7 py-2 md:py-2.5 rounded-full hover:bg-cyan-100 hover:text-slate-900 border border-cyan-50 hover:border-cyan-300 transition-colors cursor-pointer">
                Get Started Today - Free Trial
              </Button>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-slate-900 text-white py-8 md:py-12 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 text-center md:text-left">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-cyan-400 mb-4">Hola IO</h3>
                <p className="text-xs md:text-sm text-cyan-100">
                  The ultimate CRM solution for mobile repair businesses. Streamline operations, manage customers, and
                  grow with ease.
                </p>
              </div>

              <div className="hidden md:block"></div>

              <div>
                <h4 className="text-sm md:text-base font-semibold text-white mb-4">Connect With Us</h4>
                <div className="flex justify-center md:justify-start space-x-6 mb-4">
                  <a
                    href="https://x.com/holaiocrm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-100 hover:text-cyan-400 transition"
                  >
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com/company/holaiocrm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-100 hover:text-cyan-400 transition"
                  >
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  </a>
                </div>
                <p className="text-xs md:text-sm text-cyan-100 mb-1">
                  Email:{" "}
                  <a href="mailto:support@holaiocrm.com" className="hover:text-cyan-400 transition">
                    support@holaiocrm.com
                  </a>
                </p>
                <p className="text-xs md:text-sm text-cyan-100">
                  Phone:{" "}
                  <a href="tel:+1234567890" className="hover:text-cyan-400 transition">
                    +1 (234) 567-890
                  </a>
                </p>
              </div>
            </div>
            <div className="mt-8 md:mt-10 text-center border-t border-slate-700 pt-6">
              <p className="text-xs md:text-sm text-cyan-100">© 2025 Hola IO. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
