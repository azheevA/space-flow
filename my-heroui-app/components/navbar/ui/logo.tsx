import { IconSvgProps } from "@/types";

export const SpaceFlowLogo = ({ size = 36, ...props }: IconSvgProps) => (
  <svg viewBox="0 0 32 32" width={size} height={size} {...props}>
    <path d="M6 8h14v4H10v4h8v4h-8v8H6V8z" fill="currentColor" />
    <path
      d="M20 8v16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
