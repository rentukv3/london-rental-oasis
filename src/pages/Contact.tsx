
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission with a timeout
    setTimeout(() => {
      console.log('Form submitted:', formData);
      toast({
        title: 'Message Sent',
        description: "Thank you for your message. We'll get back to you shortly.",
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
            <p className="text-gray-600 mb-8">We're here to help with all your renting needs in London</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="col-span-1 lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h2 className="text-xl font-semibold mb-6">Send us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          required
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Your email address"
                          required
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Your phone number"
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        required
                        className="w-full resize-none border rounded-md border-input p-3 focus:outline-none focus:ring-2 focus:ring-rent-blue focus:border-transparent"
                      ></textarea>
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-rent-blue hover:bg-rent-blue-light text-white px-6 py-3"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </div>
              </div>
              
              <div>
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <MapPin className="h-6 w-6 text-rent-blue flex-shrink-0 mt-1" />
                      <div className="ml-4">
                        <p className="font-medium text-gray-900">Our Office</p>
                        <p className="text-gray-600 mt-1">
                          123 Rental Street<br />
                          Kensington<br />
                          London, W8 6EF<br />
                          United Kingdom
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="h-6 w-6 text-rent-blue flex-shrink-0 mt-1" />
                      <div className="ml-4">
                        <p className="font-medium text-gray-900">Phone</p>
                        <p className="text-gray-600 mt-1">+44 20 1234 5678</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Mail className="h-6 w-6 text-rent-blue flex-shrink-0 mt-1" />
                      <div className="ml-4">
                        <p className="font-medium text-gray-900">Email</p>
                        <p className="text-gray-600 mt-1">contact@rentinlondon.com</p>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <p className="font-medium text-gray-900">Office Hours</p>
                      <p className="text-gray-600 mt-2">
                        Monday - Friday: 9am - 6pm<br />
                        Saturday: 10am - 4pm<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
