export const appwriteConfig = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string,
  bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID as string,
  devKey: process.env.NEXT_PUBLIC_APPWRITE_DEV_KEY as string,
  apiKey: process.env.NEXT_PUBLIC_APPWRITE_API_KEY as string,
};
