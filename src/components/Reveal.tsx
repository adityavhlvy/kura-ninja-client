import { motion, type HTMLMotionProps } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/** Fades and lifts content once as it enters the viewport. */
export function Reveal({
  delay = 0,
  y = 24,
  ...props
}: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, ease, delay }}
      {...props}
    />
  );
}

// "*word*" becomes italic. Trailing punctuation after the closing star stays
// upright, so "*typed*." and "*sensor*," work too.
function emphasis(w: string) {
  const m = /^\*(.+)\*([.,;:!?]?)$/.exec(w);
  return m ? (
    <>
      <em>{m[1]}</em>
      {m[2]}
    </>
  ) : (
    w
  );
}

/** Headline whose words rise out of a mask, one after another. */
export function RiseWords({
  text,
  className,
  delay = 0,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  // Words wrapped in *asterisks* render as italic emphasis in the same family.
  const words = text.split(" ");
  return (
    <Tag className={className} aria-label={text.replace(/\*/g, "")}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true">
          <span className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease, delay: delay + i * 0.06 }}
            >
              {emphasis(w)}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}

export { ease };
