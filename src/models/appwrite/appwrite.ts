// lib/AppwriteStorage.ts

import { Client, Storage, ID, Models } from "appwrite";
import { appwriteConfig } from "./appwriteConf";

class AppwriteStorageService {
  private client: Client;
  private storage: Storage;
  private bucketId: string;

  constructor() {
    this.client = new Client()
      .setEndpoint(appwriteConfig.endpoint as string)
      .setProject(appwriteConfig.projectId as string);
    if (typeof window === "undefined" && process.env.APPWRITE_API_KEY) {
      this.client.setDevKey(appwriteConfig.devKey);
    }

    this.storage = new Storage(this.client);

    // Read bucket ID from env variable here
    this.bucketId = appwriteConfig.bucketId as string;
    if (!this.bucketId) {
      throw new Error(
        "Appwrite bucket ID is not defined in environment variables."
      );
    }
  }
  /**
   * Upload a file to a bucket
   */
  async uploadFile(
    file: File,
    fileId: string = ID.unique()
  ): Promise<Models.File> {
    console.log("Uploading file to bucket:", this.bucketId);
    return await this.storage.createFile(this.bucketId, fileId, file);
  }

  /**
   * Get file details
   */
  async getFile(fileId: string): Promise<Models.File> {
    return await this.storage.getFile(this.bucketId, fileId);
  }

  /**
   * List all files in a bucket
   */
  async listFiles(queries?: string[]): Promise<Models.FileList> {
    return await this.storage.listFiles(this.bucketId, queries);
  }

  /**
   * Delete a file from a bucket
   */
  async deleteFile(fileId: string): Promise<void> {
    const response = await this.storage.deleteFile(this.bucketId, fileId);
    console.log("Delelt file response", response);
    return;
  }

  /**
   * Get a file preview URL (for images)
   */
  getFilePreview(fileId: string): string {
    return this.storage.getFilePreview(this.bucketId, fileId).toString();
  }

  /**
   * Get a file view URL
   */
  getFileView(fileId: string): string {
    return this.storage.getFileView(this.bucketId, fileId).toString();
  }

  /**
   * Get a file download URL
   */
  getFileDownload(fileId: string): string {
    return this.storage.getFileDownload(this.bucketId, fileId).toString();
  }
}

const appwriteStorage = new AppwriteStorageService();
export default appwriteStorage;
