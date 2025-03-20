import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Github, Mail } from "lucide-react";
import Link from "next/link";

export default function MailPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulando envío (aquí conectarías con tu backend real)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Resetear el formulario
      setFormData({ name: "", email: "", message: "" });
      
      // Quitar el mensaje de éxito después de unos segundos
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }, 1000);
  };
  
  return (
    <Layout title="Contact | Luca Mazzarello">
      <div className="min-h-screen flex items-center justify-center px-4 py-10">
        <div className="max-w-xl w-full">
          <h1 className="text-4xl font-bold text-[#543310] text-center mb-4">
            Get In Touch
          </h1>
          
          <p className="text-center text-[#74512D] mb-8 max-w-md mx-auto">
            Interested in collaborating on a project or discussing open source contributions? Feel free to 
            reach out through any of the platforms below.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-[#543310] font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-md bg-[#F9F3E4] border border-[#AF8F6F]/30 focus:outline-none focus:ring-2 focus:ring-[#543310]/40 text-[#543310]"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-[#543310] font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-md bg-[#F9F3E4] border border-[#AF8F6F]/30 focus:outline-none focus:ring-2 focus:ring-[#543310]/40 text-[#543310]"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-[#543310] font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full p-3 rounded-md bg-[#F9F3E4] border border-[#AF8F6F]/30 focus:outline-none focus:ring-2 focus:ring-[#543310]/40 text-[#543310] resize-none"
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-6 rounded-md bg-[#543310] text-white font-medium transition-all ${
                isSubmitting ? "opacity-70" : "hover:bg-[#6B3D0F]"
              }`}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
            
            {submitSuccess && (
              <div className="p-3 bg-green-100 text-green-800 rounded-md text-center">
                Message sent successfully! I'll get back to you soon.
              </div>
            )}
          </form>
          
          <div className="mt-10 flex justify-center space-x-6">
            <Link 
              href="https://github.com/Luquish" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#543310] hover:text-[#6B3D0F] transition-colors"
            >
              <Github className="w-6 h-6" />
            </Link>
            <Link 
              href="mailto:lucamazza02@gmail.com"
              className="text-[#543310] hover:text-[#6B3D0F] transition-colors"
            >
              <Mail className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
} 