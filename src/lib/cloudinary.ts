// ==================================================
// Cloudinary Configuration
// ==================================================

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;

/**
 * Upload an image buffer to Cloudinary.
 */
export async function uploadImage(
  buffer: Buffer,
  folder: string,
  publicId?: string
): Promise<{ url: string; publicId: string }> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `roomfinder/${folder}`,
        public_id: publicId,
        resource_type: "image",
        transformation: [
          { quality: "auto", fetch_format: "auto" },
          { width: 1200, crop: "limit" },
        ],
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error("Upload failed"));
        } else {
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
          });
        }
      }
    );
    uploadStream.end(buffer);
  });
}

/**
 * Upload a video buffer to Cloudinary.
 */
export async function uploadVideo(
  buffer: Buffer,
  folder: string,
  publicId?: string
): Promise<{ url: string; publicId: string; duration: number }> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `roomfinder/${folder}`,
        public_id: publicId,
        resource_type: "video",
        eager: [{ format: "mp4", quality: "auto" }],
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error("Upload failed"));
        } else {
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            duration: result.duration || 0,
          });
        }
      }
    );
    uploadStream.end(buffer);
  });
}

/**
 * Upload ID proof to a private Cloudinary folder with restricted access.
 */
export async function uploadPrivateDocument(
  buffer: Buffer,
  publicId?: string
): Promise<{ url: string; publicId: string }> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "roomfinder/private/id-proofs",
        public_id: publicId,
        resource_type: "image",
        type: "private",
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error("Upload failed"));
        } else {
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
          });
        }
      }
    );
    uploadStream.end(buffer);
  });
}

/**
 * Delete a resource from Cloudinary by public ID.
 */
export async function deleteResource(
  publicId: string,
  resourceType: "image" | "video" = "image"
): Promise<void> {
  await cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
  });
}

/**
 * Generate a signed URL for private resources.
 */
export function getSignedUrl(publicId: string): string {
  return cloudinary.url(publicId, {
    type: "private",
    sign_url: true,
    secure: true,
  });
}
