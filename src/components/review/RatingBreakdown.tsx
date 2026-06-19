import { Progress } from "@/components/ui/progress";

interface RatingBreakdownProps {
  ratings: {
    cleanliness: number;
    waterSupply: number;
    electricity: number;
    wifiQuality: number;
    safety: number;
    ownerBehaviour: number;
  };
}

export function RatingBreakdown({ ratings }: RatingBreakdownProps) {
  const categories = [
    { label: "Cleanliness", value: ratings.cleanliness },
    { label: "Water Supply", value: ratings.waterSupply },
    { label: "Electricity", value: ratings.electricity },
    { label: "WiFi Quality", value: ratings.wifiQuality },
    { label: "Safety", value: ratings.safety },
    { label: "Owner Behaviour", value: ratings.ownerBehaviour },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
      {categories.map((category) => (
        <div key={category.label} className="flex items-center justify-between gap-4">
          <span className="text-sm font-bold text-slate-700 min-w-[120px]">
            {category.label}
          </span>
          <div className="flex-1 flex items-center gap-3">
            <Progress value={(category.value / 5) * 100} className="h-2" />
            <span className="text-sm font-extrabold text-violet-600 w-6 text-right">
              {category.value.toFixed(1)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
