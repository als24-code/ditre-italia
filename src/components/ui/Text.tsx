import { Fragment, type ElementType, type ReactNode } from "react";
import { cx } from "@/lib/cx";


interface AccentOptions {
  first?: boolean;
  letters?: string;
}

function renderAccent(text: string, { first, letters }: AccentOptions): ReactNode[] {
  const nodes: ReactNode[] = [];
  let buffer = "";

  const flush = () => {
    if (buffer) {
      nodes.push(buffer);
      buffer = "";
    }
  };

  Array.from(text).forEach((char, index) => {
    const isAccent =
      (first && index === 0) || (letters !== undefined && letters.includes(char));
    if (isAccent) {
      flush();
      nodes.push(
        <span key={`${char}-${index}`} className="accent">
          {char}
        </span>,
      );
    } else {
      buffer += char;
    }
  });
  flush();
  return nodes;
}

interface AccentTextProps extends AccentOptions {
  text: string;
}

export function AccentText({ text, first, letters }: AccentTextProps) {
  return <>{renderAccent(text, { first, letters })}</>;
}

interface SplitTextProps extends AccentOptions {
  text: string;
}

export function SplitText({ text, first, letters }: SplitTextProps) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="split__word">
            <span className="split__inner">
              {renderAccent(word, { first: first && i === 0, letters })}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}


type Indent = "none" | "sm" | "md" | "lg";
type RevealMode = "words" | "scrub" | "none";

interface StatementProps extends AccentOptions {
  children: string;
  as?: ElementType;
  indent?: Indent;
  reveal?: RevealMode;
  tone?: "dark" | "light";
  className?: string;
}

export function Statement({
  children,
  as: Tag = "p",
  indent = "md",
  reveal = "words",
  tone = "dark",
  first,
  letters,
  className,
}: StatementProps) {
  return (
    <Tag
      className={cx(
        "statement",
        
        tone === "light" && "statement--light",
        className,
      )}
      data-reveal={reveal === "none" ? undefined : reveal}
    >
      <SplitText text={children} first={first} letters={letters} />
    </Tag>
  );
}


interface SmallTextProps {
  children: ReactNode;
  as?: ElementType;
  reveal?: boolean;
  className?: string;
}

export function SmallText({
  children,
  as: Tag = "p",
  reveal = true,
  className,
}: SmallTextProps) {
  return (
    <Tag
      className={cx("small", className)}
      data-reveal={reveal ? "fade" : undefined}
    >
      {children}
    </Tag>
  );
}

export function Mark({ className }: { className?: string }) {
  return (
    <span className={cx("mark", className)} aria-hidden="true">
      O
    </span>
  );
}
