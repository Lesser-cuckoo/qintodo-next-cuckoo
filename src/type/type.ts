export type OutLineProps =
  | "outline-today"
  | "outline-tomorrow"
  | "outline-other";

export type DayProps = "today" | "tomorrow" | "other";
export type HeaderProps = "今日する" | "明日する" | "今度する";
export type ColorProps = "text-today" | "text-tomorrow" | "text-other";
export type BgColorProps =
  | "checked:bg-today"
  | "checked:bg-tomorrow"
  | "checked:bg-other";

export type TaskElement = {
  id: number;
  header: HeaderProps;
  color: ColorProps;
  bgColor: BgColorProps;
  outlineColor: OutLineProps;
  day: DayProps;
};
