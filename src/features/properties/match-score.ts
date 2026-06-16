import { PropertyCardDTO, PropertyFilters } from "@/types";

/**
 * Calculate Match Score for a property based on active filters
 * The score is out of 100%.
 */
export function calculateMatchScore(
  property: any,
  filters: PropertyFilters
): number {
  if (!filters || Object.keys(filters).length === 0) return 0; // No filters = no match score context

  let score = 0;
  let maxScore = 0;

  // 1. Budget Match (Max 30 points)
  if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
    maxScore += 30;
    const min = filters.priceMin || 0;
    const max = filters.priceMax || 100000;
    
    if (property.price >= min && property.price <= max) {
      score += 30; // Perfect match
    } else {
      // Partial match if slightly outside
      const overBy = Math.max(0, property.price - max);
      const underBy = Math.max(0, min - property.price);
      const diff = Math.max(overBy, underBy);
      const percentageOff = diff / property.price;
      
      if (percentageOff <= 0.1) score += 15;
      else if (percentageOff <= 0.2) score += 5;
    }
  }

  // 2. Location/Area Match (Max 25 points)
  if (filters.area) {
    maxScore += 25;
    if (property.area === filters.area) {
      score += 25;
    }
  } else if (filters.city) {
    // If only city is specified and it matches, give a base score
    maxScore += 10;
    if (property.city === filters.city) {
      score += 10;
    }
  }

  // 3. Property Type Match (Max 15 points)
  if (filters.propertyType) {
    maxScore += 15;
    if (property.propertyType === filters.propertyType) {
      score += 15;
    }
  }

  // 4. Room Type Match (Max 10 points)
  if (filters.roomType) {
    maxScore += 10;
    if (property.roomType === filters.roomType) {
      score += 10;
    }
  }

  // 5. Gender Preference (Must Match, otherwise heavily penalize)
  if (filters.gender) {
    maxScore += 10;
    if (property.genderPreference === filters.gender || property.genderPreference === "co-ed") {
      score += 10;
    } else {
      // Dealbreaker
      return 0; 
    }
  }

  // 6. Amenities Match (Max 10 points)
  if (filters.amenities && filters.amenities.length > 0) {
    maxScore += 10;
    const requestedAmenities: string[] = Array.isArray(filters.amenities) ? filters.amenities : typeof filters.amenities === 'string' ? (filters.amenities as string).split(',') : [];
    let matchCount = 0;
    
    requestedAmenities.forEach((amenity: string) => {
      if (property.amenities && property.amenities[amenity]) {
        matchCount++;
      }
    });

    const amenityScore = (matchCount / requestedAmenities.length) * 10;
    score += amenityScore;
  }

  if (maxScore === 0) return 0;

  const percentage = Math.round((score / maxScore) * 100);
  return percentage;
}
