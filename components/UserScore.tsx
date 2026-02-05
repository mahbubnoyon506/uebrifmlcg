interface UserScoreProps {
  score: number;
}

export function UserScore({ score }: UserScoreProps) {
  const percentage = Math.round(score * 10);
  const color =
    percentage >= 70 ? "#21d17a" : percentage >= 40 ? "#d2d531" : "#db2360";

  return (
    <div className="flex items-center gap-2 group">
      <div className="bg-[#081c22] rounded-full p-1">
        <div
          className="p-2 w-14 h-14 rounded-full flex items-center justify-center bg-[#081c22] font-bold text-white text-lg border-4"
          style={{ borderColor: color, borderLeftColor: "#204529" }}
        >
          <span className="flex items-center text-xs pb-1">
            {percentage}
            <span className="text-[10px]">%</span>
          </span>
        </div>
      </div>
      <div className=" text-sm font-bold leading-tight">
        User
        <br />
        Score
      </div>
    </div>
  );
}
