import { 
  users, 
  type User, 
  type InsertUser, 
  contactFormSubmissions,
  type ContactFormSubmission,
  type InsertContactForm,
  subscribers,
  type Subscriber,
  type InsertSubscriber
} from "@shared/schema";

// Storage interface
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact form methods
  createContactFormSubmission(submission: InsertContactForm): Promise<ContactFormSubmission>;
  getContactFormSubmission(id: number): Promise<ContactFormSubmission | undefined>;
  getAllContactFormSubmissions(): Promise<ContactFormSubmission[]>;
  markContactFormSubmissionAsRead(id: number): Promise<void>;
  
  // Subscriber methods
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  getSubscriber(id: number): Promise<Subscriber | undefined>;
  getSubscriberByEmail(email: string): Promise<Subscriber | undefined>;
  updateSubscriberStatus(id: number, isActive: boolean): Promise<void>;
  getAllSubscribers(activeOnly?: boolean): Promise<Subscriber[]>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactSubmissions: Map<number, ContactFormSubmission>;
  private subscribersList: Map<number, Subscriber>;
  private userCurrentId: number;
  private contactCurrentId: number;
  private subscriberCurrentId: number;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    this.subscribersList = new Map();
    this.userCurrentId = 1;
    this.contactCurrentId = 1;
    this.subscriberCurrentId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Contact form methods
  async createContactFormSubmission(submission: InsertContactForm): Promise<ContactFormSubmission> {
    const id = this.contactCurrentId++;
    const now = new Date();
    const contactSubmission: ContactFormSubmission = { 
      ...submission, 
      id, 
      createdAt: now, 
      isRead: false 
    };
    this.contactSubmissions.set(id, contactSubmission);
    return contactSubmission;
  }
  
  async getContactFormSubmission(id: number): Promise<ContactFormSubmission | undefined> {
    return this.contactSubmissions.get(id);
  }
  
  async getAllContactFormSubmissions(): Promise<ContactFormSubmission[]> {
    return Array.from(this.contactSubmissions.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  
  async markContactFormSubmissionAsRead(id: number): Promise<void> {
    const submission = this.contactSubmissions.get(id);
    if (submission) {
      submission.isRead = true;
      this.contactSubmissions.set(id, submission);
    }
  }
  
  // Subscriber methods
  async createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber> {
    const id = this.subscriberCurrentId++;
    const now = new Date();
    const newSubscriber: Subscriber = { 
      ...subscriber, 
      id, 
      createdAt: now, 
      isActive: true 
    };
    this.subscribersList.set(id, newSubscriber);
    return newSubscriber;
  }
  
  async getSubscriber(id: number): Promise<Subscriber | undefined> {
    return this.subscribersList.get(id);
  }
  
  async getSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
    return Array.from(this.subscribersList.values()).find(
      (subscriber) => subscriber.email === email,
    );
  }
  
  async updateSubscriberStatus(id: number, isActive: boolean): Promise<void> {
    const subscriber = this.subscribersList.get(id);
    if (subscriber) {
      subscriber.isActive = isActive;
      this.subscribersList.set(id, subscriber);
    }
  }
  
  async getAllSubscribers(activeOnly: boolean = false): Promise<Subscriber[]> {
    let subscribers = Array.from(this.subscribersList.values());
    
    if (activeOnly) {
      subscribers = subscribers.filter(subscriber => subscriber.isActive);
    }
    
    return subscribers.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}

// Export singleton instance
export const storage = new MemStorage();
