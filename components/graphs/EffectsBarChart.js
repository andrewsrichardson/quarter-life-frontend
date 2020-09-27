import React from "react";
import { Bar } from "@vx/shape";
import { Group } from "@vx/group";
// import localPoint from "@vx/event/build/localPoint";
// import { withTooltip, TooltipWithBounds } from "@vx/tooltip";
import { LinearGradient } from "@vx/gradient";

import { LI_DATA } from "@/lib/constants";
import Text from "@vx/text/lib/Text";

const margin = 10;

// accessors
const x = (d) => d.label;
const y = (d) => d.percent;
const dataMax = 50;

export default function EffectsBarChart({ screenWidth }) {
  const height = 400;
  const width = Math.min(600, 0.8 * screenWidth);

  const innerWidth = width - margin;
  const innerHeight = height - margin;
  const barHeight = Math.max(10, innerHeight / LI_DATA.length / 2);
  const space = barHeight;
  return (
    <>
      <svg width={width} height={height} className="m-auto">
        <Group top={10}>
          <LinearGradient
            id="bar-fill"
            from="#D81E5B"
            to="#D81E5B"
            fromOpacity={0.2}
            toOpacity={0.9}
            vertical={false}
          />
          {LI_DATA.map((d, i) => {
            return (
              <>
                <Bar
                  key={i}
                  width={(innerWidth * d.percent) / dataMax}
                  height={barHeight}
                  x={0}
                  y={i * 2 * barHeight + space + 3}
                  stroke="#fff"
                  strokeWidth={2}
                  fill="url(#bar-fill)"
                />
                <Text
                  key={i + LI_DATA.length}
                  x={0}
                  y={i * 2 * barHeight + space}
                  fontSize={width / 30}
                >
                  {d.label}
                </Text>
                <Text
                  key={i + LI_DATA.length * 2}
                  x={(innerWidth * d.percent) / dataMax + 20}
                  y={i * 2 * barHeight + space + barHeight - 3}
                  opacity={0.5}
                >
                  {Math.round(d.percent) + "%"}
                </Text>
              </>
            );
          })}
        </Group>
      </svg>
      <p className="text-xs">
        Source:{" "}
        <a
          target="_blank"
          href="https://news.linkedin.com/2017/11/new-linkedin-research-shows-75-percent-of-25-33-year-olds-have-e"
        >
          LinkedIn
        </a>
      </p>
    </>
  );
}
