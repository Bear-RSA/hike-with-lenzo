import { difficultyLabel, type Difficulty } from "@/lib/trails";

type Props = {
  level: Difficulty;
  /** "dark" for navy backgrounds */
  tone?: "light" | "dark";
  showLabel?: boolean;
  className?: string;
};

export function DifficultyPips({ level, tone = "light", showLabel = true, className = "" }: Props) {
  const off = tone === "dark" ? "bg-white/20" : "bg-stone";
  return (
    <span
      className={`inline-flex items-center gap-2 ${className}`}
      aria-label={`Difficulty ${level} of 5: ${difficultyLabel[level]}`}
      title={difficultyLabel[level]}
    >
      <span className="flex items-center gap-[3px]" aria-hidden>
        {([1, 2, 3, 4, 5] as const).map((i) => (
          <span
            key={i}
            className={`h-1.5 w-3 rounded-full ${i <= level ? "bg-gold" : off}`}
          />
        ))}
      </span>
      {showLabel && (
        <span className={`text-xs font-medium ${tone === "dark" ? "text-stone" : "text-slate"}`}>
          {difficultyLabel[level]}
        </span>
      )}
    </span>
  );
}
