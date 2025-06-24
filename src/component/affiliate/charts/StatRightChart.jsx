import { Heading, Text } from "../../Text";
import ApexCharts from "./ApexCharts";
import {
  UserChartSeries,
  UserChartOptions,
  VisitorChartSeries,
  VisitorChartOptions,
  BounceChartSeries,
  BounceChartOptions,
  AverageVisitTimeChartSeries,
  AverageVisitTimeChartOptions,
} from "./ChartData";
import { IoIosTrendingDown, IoIosTrendingUp } from "react-icons/io";

function ShowChart(chartName) {
  switch (chartName) {
    case "ecosystem":
      return (
        <ApexCharts
          options={UserChartOptions}
          series={UserChartSeries}
          height={60}
          type="area"
        />
      );
    case "users":
      return (
        <ApexCharts
          options={VisitorChartOptions}
          series={VisitorChartSeries}
          height={60}
          type="area"
        />
      );
    case "support":
      return (
        <ApexCharts
          options={BounceChartOptions}
          series={BounceChartSeries}
          height={60}
          type="line"
        />
      );
    case "AverageVisitTimeChart":
      return (
        <ApexCharts
          options={AverageVisitTimeChartOptions}
          series={AverageVisitTimeChartSeries}
          height={60}
          type="area"
        />
      );
    default:
      return chartName + " chart is undefined";
  }
}

const StatRightChart = (props) => {
  const {
    title,
    value,
    summaryValue,
    summaryIcon,
    showSummaryIcon,
    classValue,
    chartName,
  } = props;

  return (
    <div
      className={`border border-gray-300 rounded-lg shadow-sm ${classValue}`}
    >
      <div className="p-4">
        <div className="grid grid-cols-1 gap-1 h-32 xl:h-28">
          {/* Title Section */}
          <div>
            <Text
              className="uppercase text-primary5"
              size="base"
              weight="font-semibold"
              lineHeight="leading-7"
            >
              {title}
            </Text>
          </div>

          {/* Value and Summary Section */}
          <div>
            <Heading
              level="1"
              className=""
              size="2xl"
              color="black"
              weight="font-bold"
              font="font-body"
              lineHeight="leading-7"
            >
              {value}
            </Heading>
            <p className={`font-semibold mt-2 mb-0`}>
              {showSummaryIcon &&
                (summaryIcon === "up" ? (
                  <IoIosTrendingUp color="green" size={20} />
                ) : (
                  <IoIosTrendingDown color="red" size={20} />
                ))}
              {summaryValue}
            </p>
          </div>

          {/* Chart Section */}
          {/* <div className="flex items-center justify-center">
            {ShowChart(chartName)}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default StatRightChart;
