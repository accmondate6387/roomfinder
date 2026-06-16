import { FavoritesRepository } from "./favorites.repository";
import { PropertyCardDTO } from "@/types";

export class FavoritesService {
  static async toggleFavorite(userId: string, propertyId: string) {
    const isFav = await FavoritesRepository.isFavorite(userId, propertyId);
    
    if (isFav) {
      await FavoritesRepository.removeFavorite(userId, propertyId);
      return { status: "removed" };
    } else {
      await FavoritesRepository.addFavorite(userId, propertyId);
      return { status: "added" };
    }
  }

  static async checkIsFavorite(userId: string, propertyId: string) {
    return await FavoritesRepository.isFavorite(userId, propertyId);
  }

  static async getUserFavorites(
    userId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{ properties: PropertyCardDTO[]; total: number; totalPages: number }> {
    const { favorites, total } = await FavoritesRepository.getUserFavorites(userId, page, limit);

    const properties: PropertyCardDTO[] = favorites.map((fav: any) => {
      const p = fav.property;
      return {
        _id: p._id.toString(),
        title: p.title,
        slug: p.slug,
        price: p.price,
        area: p.area,
        city: p.city,
        address: p.address,
        propertyType: p.propertyType,
        roomType: p.roomType,
        genderPreference: p.genderPreference,
        availability: p.availability,
        photos: p.photos.map((photo: any) => ({ url: photo.url, alt: photo.alt })),
        amenities: p.amenities || {},
        stats: {
          avgRating: p.stats?.avgRating || 0,
          reviewCount: p.stats?.reviewCount || 0,
        },
        isVerified: p.isVerified,
        isFeatured: p.isFeatured,
        createdAt: p.createdAt.toISOString(),
      };
    });

    return {
      properties,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }
}
