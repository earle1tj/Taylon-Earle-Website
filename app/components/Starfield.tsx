import type { CSSProperties } from "react";

type StarStyle = CSSProperties & Record<`--${string}`, string>;

export function Starfield() {
  const stars = Array.from({ length: 86 }, (_, index) => {
    const style: StarStyle = {
      "--x": `${(index * 37 + 7 + (index % 5) * 3) % 98}%`,
      "--y": `${(index * 53 + 5 + (index % 7) * 2) % 91}%`,
      "--size": `${0.7 + ((index * 17) % 22) / 10}px`,
      "--duration": `${2.4 + ((index * 29) % 58) / 10}s`,
      "--delay": `${-((index * 41) % 73) / 10}s`,
      "--drift": `${-4 + ((index * 13) % 9)}px`,
      "--peak": `${0.48 + ((index * 11) % 48) / 100}`,
    };
    const tone = index % 11 === 0 ? "rose" : index % 7 === 0 ? "blue" : "white";
    return <i className={`sky-star ${tone}`} style={style} key={index} />;
  });

  return (
    <div className="hero-stars" aria-hidden="true">
      {stars}
      <span className="shooting-star shooting-one" />
      <span className="shooting-star shooting-two" />
      <span className="shooting-star shooting-three" />
    </div>
  );
}
