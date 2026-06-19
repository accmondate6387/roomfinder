"use client";

import { useActionState, useState, useRef } from "react";
import { createPropertyAction } from "@/features/properties/actions";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Home, MapPin, IndianRupee, Wifi, Wind,
  Shield, Car, Zap, Droplets, Coffee,
  Bath, BookOpen, Image as ImageIcon, X, Upload,
  CheckCircle, Sparkles, ArrowLeft, Info
} from "lucide-react";
import Link from "next/link";

const AREAS = [
  "civil-lines", "katra", "allahpur", "george-town", "jhusi",
  "tagore-town", "naini", "phaphamau", "kareli",
];

const AMENITIES = [
  { key: "ac", label: "AC", icon: Wind },
  { key: "wifi", label: "WiFi", icon: Wifi },
  { key: "furnished", label: "Furnished", icon: Home },
  { key: "foodAvailable", label: "Food Included", icon: Coffee },
  { key: "attachedBathroom", label: "Attached Bathroom", icon: Bath },
  { key: "laundry", label: "Laundry", icon: Droplets },
  { key: "parking", label: "Parking", icon: Car },
  { key: "powerBackup", label: "Power Backup", icon: Zap },
  { key: "cctv", label: "CCTV", icon: Shield },
  { key: "waterPurifier", label: "Water Purifier", icon: Droplets },
  { key: "studyRoom", label: "Study Room", icon: BookOpen },
  { key: "hotWater", label: "Hot Water", icon: Droplets },
];

interface UploadedPhoto {
  url: string;
  publicId: string;
}

export default function NewListingPage() {
  const [state, formAction, pending] = useActionState(createPropertyAction, undefined);
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState<Record<string, boolean>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleAmenity = (key: string) => {
    setSelectedAmenities((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    if (photos.length + files.length > 8) {
      setUploadError("Maximum 8 photos allowed.");
      return;
    }

    setUploadError("");
    setUploadingPhoto(true);

    try {
      // Get upload signature from our API
      const sigRes = await fetch("/api/upload/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder: "roomfinder/properties" }),
      });

      if (!sigRes.ok) {
        throw new Error("Failed to get upload signature. Check Cloudinary config.");
      }

      const { timestamp, signature, cloudName, apiKey, folder } = await sigRes.json();

      const uploaded: UploadedPhoto[] = [];

      for (const file of files) {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("api_key", apiKey);
        fd.append("timestamp", String(timestamp));
        fd.append("signature", signature);
        fd.append("folder", folder);

        const uploadRes = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          { method: "POST", body: fd }
        );

        if (!uploadRes.ok) throw new Error("Upload failed for " + file.name);

        const data = await uploadRes.json();
        uploaded.push({ url: data.secure_url, publicId: data.public_id });
      }

      setPhotos((prev) => [...prev, ...uploaded]);
    } catch (err: any) {
      setUploadError(err.message || "Upload failed. Please try again.");
    } finally {
      setUploadingPhoto(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removePhoto = (idx: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <Link
          href="/dashboard/listings"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-violet-600 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Listings
        </Link>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Add New Listing</h1>
        </div>
        <p className="text-slate-500 text-sm font-medium ml-[52px]">
          Fill in the details. Your listing will go live after admin approval.
        </p>
      </div>

      {/* Global error */}
      {state?.message && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-sm font-bold flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
          {state.message}
        </div>
      )}

      <form action={formAction} className="space-y-6">
        {/* Hidden: photos JSON */}
        <input type="hidden" name="photosJson" value={JSON.stringify(photos)} />

        {/* Hidden: amenity checkboxes (controlled by JS state) */}
        {AMENITIES.map(({ key }) =>
          selectedAmenities[key] ? (
            <input key={key} type="hidden" name={`amenities.${key}`} value="on" />
          ) : null
        )}

        {/* ── Basic Info ── */}
        <section className="bg-white rounded-3xl border border-violet-100 p-6 shadow-sm space-y-5">
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Home className="w-4 h-4 text-violet-500" /> Basic Information
          </h2>

          <Input
            label="Property Title *"
            name="title"
            placeholder="e.g. Cozy PG near Civil Lines Coaching Hub"
            error={state?.errors?.title?.[0]}
            required
          />

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">
              Description *
            </label>
            <textarea
              name="description"
              rows={4}
              placeholder="Describe the property, nearby facilities, house rules, etc."
              className="block w-full rounded-2xl border-2 border-slate-200 px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-violet-400 focus:ring-violet-200 transition-all text-sm font-medium resize-none"
              required
            />
            {state?.errors?.description?.[0] && (
              <p className="mt-1.5 text-xs font-bold text-rose-600">{state.errors.description[0]}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                Property Type *
              </label>
              <select
                name="propertyType"
                className="block w-full rounded-2xl border-2 border-slate-200 px-4 py-3.5 text-slate-900 focus:outline-none focus:ring-2 focus:border-violet-400 focus:ring-violet-200 transition-all text-sm font-medium bg-white"
                required
              >
                <option value="">Select type</option>
                <option value="room">Single Room</option>
                <option value="pg">PG</option>
                <option value="hostel">Hostel</option>
                <option value="shared-room">Shared Room</option>
                <option value="flat">Flat</option>
              </select>
              {state?.errors?.propertyType?.[0] && (
                <p className="mt-1.5 text-xs font-bold text-rose-600">{state.errors.propertyType[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                Room Type *
              </label>
              <select
                name="roomType"
                className="block w-full rounded-2xl border-2 border-slate-200 px-4 py-3.5 text-slate-900 focus:outline-none focus:ring-2 focus:border-violet-400 focus:ring-violet-200 transition-all text-sm font-medium bg-white"
                required
              >
                <option value="">Select room type</option>
                <option value="single">Single</option>
                <option value="double">Double Sharing</option>
                <option value="triple">Triple Sharing</option>
                <option value="dormitory">Dormitory</option>
              </select>
              {state?.errors?.roomType?.[0] && (
                <p className="mt-1.5 text-xs font-bold text-rose-600">{state.errors.roomType[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                Gender Preference *
              </label>
              <select
                name="genderPreference"
                className="block w-full rounded-2xl border-2 border-slate-200 px-4 py-3.5 text-slate-900 focus:outline-none focus:ring-2 focus:border-violet-400 focus:ring-violet-200 transition-all text-sm font-medium bg-white"
                required
              >
                <option value="">Select preference</option>
                <option value="boys">Boys Only</option>
                <option value="girls">Girls Only</option>
                <option value="co-ed">Co-ed</option>
              </select>
              {state?.errors?.genderPreference?.[0] && (
                <p className="mt-1.5 text-xs font-bold text-rose-600">{state.errors.genderPreference[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                Availability *
              </label>
              <select
                name="availability"
                className="block w-full rounded-2xl border-2 border-slate-200 px-4 py-3.5 text-slate-900 focus:outline-none focus:ring-2 focus:border-violet-400 focus:ring-violet-200 transition-all text-sm font-medium bg-white"
                required
              >
                <option value="">Select status</option>
                <option value="available-now">Available Now</option>
                <option value="available-next-month">Available Next Month</option>
                <option value="occupied">Currently Occupied</option>
              </select>
              {state?.errors?.availability?.[0] && (
                <p className="mt-1.5 text-xs font-bold text-rose-600">{state.errors.availability[0]}</p>
              )}
            </div>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section className="bg-white rounded-3xl border border-violet-100 p-6 shadow-sm space-y-5">
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-violet-500" /> Pricing
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Monthly Rent (₹) *"
              name="price"
              type="number"
              min={500}
              max={100000}
              placeholder="e.g. 6000"
              error={state?.errors?.price?.[0]}
              icon={<IndianRupee className="w-4 h-4" />}
              required
            />
            <Input
              label="Security Deposit (₹)"
              name="securityDeposit"
              type="number"
              min={0}
              placeholder="e.g. 10000"
              error={state?.errors?.securityDeposit?.[0]}
              icon={<IndianRupee className="w-4 h-4" />}
            />
          </div>
        </section>

        {/* ── Location ── */}
        <section className="bg-white rounded-3xl border border-violet-100 p-6 shadow-sm space-y-5">
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-violet-500" /> Location
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Area *</label>
              <select
                name="area"
                className="block w-full rounded-2xl border-2 border-slate-200 px-4 py-3.5 text-slate-900 focus:outline-none focus:ring-2 focus:border-violet-400 focus:ring-violet-200 transition-all text-sm font-medium bg-white"
                required
              >
                <option value="">Select area</option>
                {AREAS.map((a) => (
                  <option key={a} value={a}>
                    {a.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </option>
                ))}
              </select>
              {state?.errors?.area?.[0] && (
                <p className="mt-1.5 text-xs font-bold text-rose-600">{state.errors.area[0]}</p>
              )}
            </div>

            <Input
              label="Full Address *"
              name="address"
              placeholder="e.g. 12/5 Muir Road, Civil Lines"
              error={state?.errors?.address?.[0]}
              icon={<MapPin className="w-4 h-4" />}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Latitude *"
              name="latitude"
              type="number"
              step="any"
              placeholder="e.g. 25.4358"
              error={state?.errors?.latitude?.[0]}
              helperText="Find on Google Maps → right-click → copy coordinates"
              required
            />
            <Input
              label="Longitude *"
              name="longitude"
              type="number"
              step="any"
              placeholder="e.g. 81.8463"
              error={state?.errors?.longitude?.[0]}
              required
            />
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-700 font-medium">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            To get coordinates: open Google Maps, right-click on your property location, and click the coordinates shown at the top.
          </div>
        </section>

        {/* ── Amenities ── */}
        <section className="bg-white rounded-3xl border border-violet-100 p-6 shadow-sm space-y-4">
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-violet-500" /> Amenities
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {AMENITIES.map(({ key, label, icon: Icon }) => {
              const active = !!selectedAmenities[key];
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleAmenity(key)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border-2 text-sm font-bold transition-all ${
                    active
                      ? "border-violet-500 bg-violet-50 text-violet-700"
                      : "border-slate-200 bg-white text-slate-600 hover:border-violet-300 hover:bg-violet-50/50"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${active ? "text-violet-500" : "text-slate-400"}`} />
                  {label}
                </button>
              );
            })}
          </div>
        </section>

        {/* ── Photos ── */}
        <section className="bg-white rounded-3xl border border-violet-100 p-6 shadow-sm space-y-4">
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-violet-500" /> Photos
            <span className="text-xs font-medium text-slate-400 ml-1">({photos.length}/8)</span>
          </h2>

          {uploadError && (
            <p className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-3 py-2">
              {uploadError}
            </p>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {photos.map((photo, idx) => (
              <div key={idx} className="relative group aspect-square rounded-2xl overflow-hidden border-2 border-violet-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.url} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removePhoto(idx)}
                  className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                {idx === 0 && (
                  <span className="absolute bottom-1.5 left-1.5 text-[10px] font-extrabold bg-violet-600 text-white px-1.5 py-0.5 rounded-lg">
                    Cover
                  </span>
                )}
              </div>
            ))}

            {photos.length < 8 && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingPhoto}
                className="aspect-square rounded-2xl border-2 border-dashed border-violet-300 bg-violet-50/50 flex flex-col items-center justify-center gap-2 text-violet-400 hover:border-violet-400 hover:bg-violet-50 transition-all disabled:opacity-50"
              >
                {uploadingPhoto ? (
                  <div className="w-5 h-5 border-2 border-violet-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    <span className="text-xs font-bold">Add Photo</span>
                  </>
                )}
              </button>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            className="hidden"
            onChange={handlePhotoUpload}
          />

          {photos.length === 0 && (
            <p className="text-xs font-medium text-slate-400">
              At least 1 photo required. First photo will be the cover image.
            </p>
          )}
        </section>

        {/* ── Submit ── */}
        <div className="flex items-center justify-between gap-4 pt-2">
          <Link href="/dashboard/listings">
            <Button type="button" variant="outline" className="rounded-2xl">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            isLoading={pending}
            disabled={pending || photos.length === 0}
            size="lg"
            className="rounded-2xl px-8"
          >
            Submit for Approval
          </Button>
        </div>

        {photos.length === 0 && (
          <p className="text-center text-xs font-bold text-amber-600">
            ⚠ Please upload at least one photo before submitting.
          </p>
        )}
      </form>
    </div>
  );
}
