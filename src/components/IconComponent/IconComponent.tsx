import React from "react";
import SVG from "react-inlinesvg";
import style from "./IconComponent.module.scss";

const sizes = {
  small: 16,
  medium: 24,
  large: 32,
} as const;

type IconSize = keyof typeof sizes;
type IconColor = "primary" | "secondary" | "default" | "active" | "warning";

interface IconComponentProps {
  src: string;
  color?: IconColor;
  size?: IconSize;
  title?: string;
  height?: number;
  width?: number;
  loader?: boolean;
  rotate?: 0 | 45 | 90 | 135 | 180 | 225 | 270 | 315 | 360 | number;
  classname?: string;
  onClick?: () => void;
}

const IconComponent: React.FC<IconComponentProps> = ({
  src,
  color = "default",
  size,
  title,
  height = 16,
  width = 16,
  loader = true,
  rotate = 0,
  classname,
  onClick,
}) => {
  const computedWidth = sizes[size!] ?? width;
  const computedHeight = sizes[size!] ?? height;

  // Interactive element
  if (onClick)
    return (
      <button
        style={{
          width: `${computedWidth}px`,
          height: `${computedHeight}px`,
        }}
        onClick={onClick}
      >
        <SVG
          cacheRequests
          loader={
            loader && (
              <span
                className="animate-pulse rounded-sm"
                style={{
                  background: "gray",
                  width: `${computedWidth}px`,
                  height: `${computedHeight}px`,
                  rotate: `${rotate}deg`,
                }}
              ></span>
            )
          }
          src={`${src}`}
          title={title}
          width={computedWidth}
          height={computedHeight}
          className={`${classname} ${style[color]}`}
        />
      </button>
    );

  // Non-interactive element
  return (
    <SVG
      cacheRequests
      loader={
        loader && (
          <span
            className="animate-pulse rounded-sm"
            style={{
              background: "gray",
              width: `${computedWidth}px`,
              height: `${computedHeight}px`,
              rotate: `${rotate}deg`,
            }}
          ></span>
        )
      }
      src={`${src}`}
      title={title}
      width={computedWidth}
      height={computedHeight}
      className={`${classname} ${style[color]}`}
    />
  );
};

export default IconComponent;
