import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactFormSchema, insertSubscriberSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes - prefix all routes with /api
  
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body against schema
      const validatedData = insertContactFormSchema.parse(req.body);
      
      // Store in database
      const submission = await storage.createContactFormSubmission(validatedData);
      
      // Return success response
      res.status(201).json({
        message: "Contact form submitted successfully",
        submissionId: submission.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Format validation errors
        const validationError = fromZodError(error).message;
        res.status(400).json({ message: validationError });
      } else {
        console.error("Error submitting contact form:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });
  
  // Newsletter subscription
  app.post("/api/subscribe", async (req, res) => {
    try {
      // Validate request body against schema
      const validatedData = insertSubscriberSchema.parse(req.body);
      
      // Check if email already exists
      const existingSubscriber = await storage.getSubscriberByEmail(validatedData.email);
      
      if (existingSubscriber) {
        if (existingSubscriber.isActive) {
          return res.status(400).json({ message: "Email is already subscribed" });
        } else {
          // Reactivate subscription
          await storage.updateSubscriberStatus(existingSubscriber.id, true);
          return res.status(200).json({ 
            message: "Subscription has been reactivated",
            subscriberId: existingSubscriber.id
          });
        }
      }
      
      // Store new subscriber
      const subscriber = await storage.createSubscriber(validatedData);
      
      // Return success response
      res.status(201).json({
        message: "Successfully subscribed to the newsletter",
        subscriberId: subscriber.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Format validation errors
        const validationError = fromZodError(error).message;
        res.status(400).json({ message: validationError });
      } else {
        console.error("Error subscribing to newsletter:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });
  
  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
