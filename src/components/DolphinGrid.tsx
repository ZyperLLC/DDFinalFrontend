export default function DolphinGrid({
  dolphins,
  onDolphinClick,
}: {
  dolphins: string[];
  onDolphinClick: (index: number) => void;
}) {
  return (
    <>
      <h2 className="dolphin-header">Choose Your Dolphin</h2>
      <div className="dolphin-grid">
        {dolphins.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Dolphin ${i + 1}`}
            className="dolphin"
            onClick={() => onDolphinClick(i)}
          />
        ))}
      </div>
    </>
  );
}