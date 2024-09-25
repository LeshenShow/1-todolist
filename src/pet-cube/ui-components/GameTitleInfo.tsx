type GameTitleInfoProps = {
  value?: number;
  title?: string;
};
export function GameTitleInfo({ title, value }: GameTitleInfoProps) {
  return (
    <div>
      <span>{title}</span>
      <span>{value}</span>
    </div>
  );
}
