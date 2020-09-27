import React from "react";
import { Group } from "@vx/group";
import { scaleLinear, scaleOrdinal } from "@vx/scale";
import { AxisLeft, AxisBottom } from "@vx/axis";
import { LinePath } from "@vx/shape";
import { curveLinear } from "@vx/curve";
import { GridColumns } from "@vx/grid";
import { LegendOrdinal } from "@vx/legend";
import { localPoint } from "@vx/event";
import { useTooltip, TooltipWithBounds } from "@vx/tooltip";
import { LinearGradient } from "@vx/gradient";
// accessors
const x = (d) => d.age;
const y = (d) => d.percent;

const Statistics = ({ data = [], screenWidth, screenHeight }) => {
  const height = Math.min(400, 0.4 * screenHeight);
  const width = Math.min(600, 0.75 * screenWidth);
  let ticks = 15;
  if (screenWidth < 400) ticks = 7;

  const {
    showTooltip,
    hideTooltip,
    tooltipOpen,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip({
    // initial tooltip state
    tooltipOpen: true,
    tooltipLeft: width / 3,
    tooltipTop: height / 3,
    tooltipData: "",
  });

  function handleMouseOver(d, event) {
    const coords = localPoint(event.target.ownerSVGElement, event);
    showTooltip({
      tooltipLeft: coords.x - 20,
      tooltipTop: coords.y + 50,
      tooltipData: Math.round(d) + "% difference",
    });
  }
  function handleMouseLeave() {
    hideTooltip();
  }

  // bounds
  const xMax = width - 80;
  const yMax = height - 50;

  const xScale = scaleLinear({
    range: [0, xMax],
    domain: [18, 34],
  });

  const yScale = scaleLinear({
    range: [0, yMax],
    domain: [100, 0],
  });

  const legendScale = scaleOrdinal({
    domain: ["1997", "2017"],
    range: ["#FFBF81", "#D81E5B"],
  });

  const joinData = data.past.map((key, index) => {
    return {
      age: key.age,
      percentages: [key.percent, data.present[index].percent],
    };
  });

  function JoinLines() {
    const datum = joinData.map((point, index) => {
      const diff = point.percentages[1] - point.percentages[0];
      return (
        <LinePath
          key={index}
          data={[
            {
              age: point.age,
              percent: point.percentages[0],
            },
            {
              age: point.age,
              percent: point.percentages[1],
            },
          ]}
          x={x}
          y={y}
          curve={curveLinear}
          x={(d) => xScale(x(d))}
          y={(d) => yScale(y(d))}
          stroke="#222222"
          strokeWidth={3}
          onMouseMove={(e) => handleMouseOver(diff, e)}
          onMouseOut={() => handleMouseLeave()}
        />
      );
    });
    return datum;
  }
  return (
    <div className="bg-white max-w-max-content relative relative m-auto mb-20 mt-20">
      <h3 className="sm:text:sm text-xl">
        Percentage of people in the UK living with their parents by Age
      </h3>
      <p className="text-xs">
        Source:{" "}
        <a
          target="_blank"
          href="https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/populationestimates/articles/milestonesjourneyingintoadulthood/2019-02-18"
        >
          ONS
        </a>
      </p>
      <LegendOrdinal
        scale={legendScale}
        shape="circle"
        shapeHeight={5}
        direction="row"
        itemMargin={5}
      />
      {tooltipOpen && (
        <TooltipWithBounds
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
        >
          {tooltipData}
        </TooltipWithBounds>
      )}
      <svg width={width} height={height}>
        <Group top={10} left={60}>
          <LinearGradient
            id="area-fill"
            from="#b1ede8"
            to="#b1ede8"
            fromOpacity={0.1}
            toOpacity={0.5}
            vertical={true}
          />

          <rect width={xMax} height={yMax} fill="url(#area-fill)" />
          <AxisLeft
            scale={yScale}
            numTicks={8}
            hideAxisLine
            label="Percentile"
          />
          <AxisBottom
            scale={xScale}
            label="Age"
            numTicks={ticks}
            top={yMax}
            hideAxisLine
          />
          <GridColumns
            scale={xScale}
            height={yMax}
            numTicks={15}
            stroke="#222222"
            fill="#222222"
            strokeDasharray="4,4"
            strokeOpacity="0.4"
          />
          <JoinLines />
          {data.past.map((point, pointIndex) => (
            <circle
              key={pointIndex}
              r={5}
              cx={xScale(x(point))}
              cy={yScale(y(point))}
              stroke="#222222"
              fill="#FFBF81"
            />
          ))}
          {data.present.map((point, pointIndex) => (
            <circle
              key={pointIndex}
              r={5}
              cx={xScale(x(point))}
              cy={yScale(y(point))}
              stroke="#222222"
              fill="#D81E5B"
            />
          ))}
        </Group>
      </svg>
      <p className="max-w-2xl m-auto">
        In 1997 the most common living arrangement for young adults (18-34) was
        as a couple with one or more children (29%), whereas in 2017 it was
        living with parents at 32% of the same age group. The report suggested
        that rising costs of both buying and renting property, coupled with an
        increase in the average age to have children and marry may play a part.
        Theres no doubt here however, that this causes stress for the aspiring
        young adult, especially when cultural norms suggest moving out is of the
        highest priority.
      </p>
    </div>
  );
};

export default Statistics;
