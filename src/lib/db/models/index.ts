// ==================================================
// Barrel export for all Mongoose models
// ==================================================

export { default as User } from "./User";
export { default as Property } from "./Property";
export { default as Review } from "./Review";
export { default as Favorite } from "./Favorite";
export { default as Report } from "./Report";
export { default as PropertyView } from "./PropertyView";
export { default as AuditLog } from "./AuditLog";
export { default as Notification } from "./Notification";
export { default as OwnerVerification } from "./OwnerVerification";
export { default as PropertyVerification } from "./PropertyVerification";
export { default as CoachingCenter } from "./CoachingCenter";
export { default as Essential } from "./Essential";
export { default as AreaInsight } from "./AreaInsight";

// Re-export interfaces
export type { IUser } from "./User";
export type { IProperty, IAmenities, IPropertyPhoto, IPropertyVideo, IPropertyStats } from "./Property";
export type { IReview, IRatings } from "./Review";
export type { IFavorite } from "./Favorite";
export type { IReport } from "./Report";
export type { IPropertyView } from "./PropertyView";
export type { IAuditLog } from "./AuditLog";
export type { INotification, NotificationType } from "./Notification";
export type { IOwnerVerification } from "./OwnerVerification";
export type { IPropertyVerification } from "./PropertyVerification";
export type { ICoachingCenter } from "./CoachingCenter";
export type { IEssential } from "./Essential";
export type { IAreaInsight } from "./AreaInsight";
