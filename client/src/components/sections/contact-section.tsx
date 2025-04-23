import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLanguage } from "@/hooks/use-language";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaLinkedinIn
} from "react-icons/fa";
import {
  COMPANY_ADDRESS,
  PHONE_NUMBER,
  OFFICE_HOURS,
  EMAIL_CONTACT,
  PROJECTS_EMAIL,
  CONTACT_SERVICE_OPTIONS,
  SOCIAL_LINKS
} from "@/lib/constants";

// Form schema for validation
const formSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  phone: z.string().min(7, "Phone number is too short"),
  email: z.string().email("Invalid email address"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message is too short")
});

type ContactFormValues = z.infer<typeof formSchema>;

export const ContactSection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize the form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: "",
      message: ""
    }
  });
  
  // Handle form submission
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      await apiRequest('POST', '/api/contact', data);
      
      toast({
        title: "Success!",
        description: t("contact.form.success"),
      });
      
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/contact'] });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="contacto" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{t("contact.title")}</h2>
          <div className="w-16 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-lg text-neutral-dark">
            {t("contact.subtitle")}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("contact.form.name")}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("contact.form.phone")}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("contact.form.email")}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("contact.form.service")}</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("contact.form.serviceSelect.default")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CONTACT_SERVICE_OPTIONS.map((option) => (
                            <SelectItem 
                              key={option.value || "empty"} 
                              value={option.value || "default"}
                            >
                              {t(option.label)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("contact.form.message")}</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          rows={5} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold py-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : t("contact.form.submit")}
                </Button>
              </form>
            </Form>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="h-full flex flex-col">
              <div className="mb-10">
                <h3 className="text-2xl font-display font-bold mb-6">{t("contact.info.title")}</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mr-4">
                      <FaMapMarkerAlt className="text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{t("contact.info.address")}</h4>
                      <p className="text-neutral-dark">{COMPANY_ADDRESS.street}</p>
                      <p className="text-neutral-dark">{COMPANY_ADDRESS.colonia}</p>
                      <p className="text-neutral-dark">{COMPANY_ADDRESS.city}, {COMPANY_ADDRESS.zipCode}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mr-4">
                      <FaPhoneAlt className="text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{t("contact.info.phone")}</h4>
                      <p className="text-neutral-dark">{PHONE_NUMBER}</p>
                      <p className="text-neutral-dark">{OFFICE_HOURS}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mr-4">
                      <FaEnvelope className="text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{t("contact.info.email")}</h4>
                      <p className="text-neutral-dark">{EMAIL_CONTACT}</p>
                      <p className="text-neutral-dark">{PROJECTS_EMAIL}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto">
                <h3 className="text-2xl font-display font-bold mb-6">{t("contact.social.title")}</h3>
                <div className="flex space-x-4">
                  <motion.a 
                    href={SOCIAL_LINKS.facebook} 
                    className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaFacebookF />
                  </motion.a>
                  <motion.a 
                    href={SOCIAL_LINKS.instagram} 
                    className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaInstagram />
                  </motion.a>
                  <motion.a 
                    href={SOCIAL_LINKS.pinterest} 
                    className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaPinterestP />
                  </motion.a>
                  <motion.a 
                    href={SOCIAL_LINKS.linkedin} 
                    className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaLinkedinIn />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
