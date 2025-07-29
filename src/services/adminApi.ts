// Mock API service for admin backend operations
// Simulates server-side data storage

// Define interfaces for all data types
import { Donor } from '@/mock/donorData';
import { GalleryImage } from '@/pages/admin/GalleryEditor';
import { NewsItem } from '@/pages/admin/AnnouncementEditor';
import { StaffMember } from '@/pages/admin/StaffEditor';

// Mock database
const mockDatabase = {
  adminPassword: '14514', // Default password
  announcements: [] as NewsItem[],
  staffMembers: [] as StaffMember[],
  galleryImages: [] as GalleryImage[],
  donors: [] as Donor[]
};

// Initialize mock database with default data if empty
const initializeDatabase = () => {
  if (mockDatabase.announcements.length === 0) {
    mockDatabase.announcements = require('@/news/mock/newsData').newsItems;
  }
  
  if (mockDatabase.staffMembers.length === 0) {
    mockDatabase.staffMembers = require('@/mock/staffData').staffMembers;
  }
  
  if (mockDatabase.galleryImages.length === 0) {
    mockDatabase.galleryImages = require('@/mock/galleryData').galleryImages;
  }
  
  if (mockDatabase.donors.length === 0) {
    mockDatabase.donors = require('@/mock/donorData').donors;
  }
};

// Simulate API delay
const apiDelay = () => new Promise(resolve => setTimeout(resolve, 300));

// Auth API
export const authApi = {
  async getPassword(): Promise<string> {
    await apiDelay();
    initializeDatabase();
    return mockDatabase.adminPassword;
  },
  
  async updatePassword(newPassword: string): Promise<boolean> {
    await apiDelay();
    mockDatabase.adminPassword = newPassword;
    return true;
  },
  
  async verifyPassword(password: string): Promise<boolean> {
    await apiDelay();
    return password === mockDatabase.adminPassword;
  }
};

// Announcements API
export const announcementsApi = {
  async getAll(): Promise<NewsItem[]> {
    await apiDelay();
    initializeDatabase();
    return [...mockDatabase.announcements];
  },
  
  async getById(id: number): Promise<NewsItem | null> {
    await apiDelay();
    initializeDatabase();
    return mockDatabase.announcements.find(item => item.id === id) || null;
  },
  
  async create(item: Omit<NewsItem, 'id'>): Promise<NewsItem> {
    await apiDelay();
    const newItem = {
      ...item,
      id: mockDatabase.announcements.length > 0 
        ? Math.max(...mockDatabase.announcements.map(i => i.id)) + 1 
        : 1
    };
    mockDatabase.announcements.unshift(newItem);
    return newItem;
  },
  
  async update(item: NewsItem): Promise<NewsItem> {
    await apiDelay();
    const index = mockDatabase.announcements.findIndex(i => i.id === item.id);
    if (index !== -1) {
      mockDatabase.announcements[index] = item;
      return item;
    }
    throw new Error('Announcement not found');
  },
  
  async delete(id: number): Promise<boolean> {
    await apiDelay();
    const initialLength = mockDatabase.announcements.length;
    mockDatabase.announcements = mockDatabase.announcements.filter(i => i.id !== id);
    return mockDatabase.announcements.length < initialLength;
  }
};

// Staff API
export const staffApi = {
  async getAll(): Promise<StaffMember[]> {
    await apiDelay();
    initializeDatabase();
    return [...mockDatabase.staffMembers];
  },
  
  async create(member: Omit<StaffMember, 'id'>): Promise<StaffMember> {
    await apiDelay();
    const newMember = {
      ...member,
      id: mockDatabase.staffMembers.length > 0 
        ? Math.max(...mockDatabase.staffMembers.map(m => m.id)) + 1 
        : 1
    };
    mockDatabase.staffMembers.push(newMember);
    return newMember;
  },
  
  async update(member: StaffMember): Promise<StaffMember> {
    await apiDelay();
    const index = mockDatabase.staffMembers.findIndex(m => m.id === member.id);
    if (index !== -1) {
      mockDatabase.staffMembers[index] = member;
      return member;
    }
    throw new Error('Staff member not found');
  },
  
  async delete(id: number): Promise<boolean> {
    await apiDelay();
    const initialLength = mockDatabase.staffMembers.length;
    mockDatabase.staffMembers = mockDatabase.staffMembers.filter(m => m.id !== id);
    return mockDatabase.staffMembers.length < initialLength;
  }
};

// Gallery API
export const galleryApi = {
  async getAll(): Promise<GalleryImage[]> {
    await apiDelay();
    initializeDatabase();
    return [...mockDatabase.galleryImages];
  },
  
  async create(image: Omit<GalleryImage, 'id'>): Promise<GalleryImage> {
    await apiDelay();
    const newImage = {
      ...image,
      id: mockDatabase.galleryImages.length > 0 
        ? Math.max(...mockDatabase.galleryImages.map(i => i.id)) + 1 
        : 1
    };
    mockDatabase.galleryImages.push(newImage);
    return newImage;
  },
  
  async update(image: GalleryImage): Promise<GalleryImage> {
    await apiDelay();
    const index = mockDatabase.galleryImages.findIndex(i => i.id === image.id);
    if (index !== -1) {
      mockDatabase.galleryImages[index] = image;
      return image;
    }
    throw new Error('Gallery image not found');
  },
  
  async delete(id: number): Promise<boolean> {
    await apiDelay();
    const initialLength = mockDatabase.galleryImages.length;
    mockDatabase.galleryImages = mockDatabase.galleryImages.filter(i => i.id !== id);
    return mockDatabase.galleryImages.length < initialLength;
  }
};

// Donors API
export const donorsApi = {
  async getAll(): Promise<Donor[]> {
    await apiDelay();
    initializeDatabase();
    return [...mockDatabase.donors];
  },
  
  async create(donor: Omit<Donor, 'id'>): Promise<Donor> {
    await apiDelay();
    const newDonor = {
      ...donor,
      id: mockDatabase.donors.length > 0 
        ? Math.max(...mockDatabase.donors.map(d => d.id)) + 1 
        : 1
    };
    mockDatabase.donors.push(newDonor);
    return newDonor;
  },
  
  async update(donor: Donor): Promise<Donor> {
    await apiDelay();
    const index = mockDatabase.donors.findIndex(d => d.id === donor.id);
    if (index !== -1) {
      mockDatabase.donors[index] = donor;
      return donor;
    }
    throw new Error('Donor not found');
  },
  
  async delete(id: number): Promise<boolean> {
    await apiDelay();
    const initialLength = mockDatabase.donors.length;
    mockDatabase.donors = mockDatabase.donors.filter(d => d.id !== id);
    return mockDatabase.donors.length < initialLength;
  }
};
