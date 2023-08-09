import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  ResponsiveContainer
} from "recharts"

const AreaChartCard = ({
  data,
  className,
  dataKey,
  stroke,
  fill,
  yAxisLabel,
  Icon
}) => {
  const startDate = new Date(data[0].time)/*.getTime()*/;
  data = data.map((item) => ({
    ...item,
    time: timeConvert((new Date(item.time) - new Date(startDate)) / 1000)
  }))

  return (
    <div className="p-4 rounded-lg shadow-md bg-gray-100 text-gray-900">
      <div className="flex items-center mb-2">
        <Icon className="icon h-6 w-6 mr-2" />
        <h3>{yAxisLabel}</h3>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart
          syncId="anyId"
          className={`${className}`}
          width={500}
          height={250}
          data={data}
          margin={{ top: 5, right: 20, bottom: 5, left: 3 }}
        >
          <XAxis
            dataKey="time"
            tick={{fill: "black"}}
          />
          <YAxis
            label={{ value: yAxisLabel, angle: -90, position: "insideLeft", fill: "black"}}
            tick={{fill: "black"}}
          />
          <Tooltip />
          <Area type="monotone" dataKey={dataKey} stroke={stroke} fill={fill} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

function toHoursAndMinutes(totalSeconds) {
  const seconds = Math.floor(totalSeconds % 60)
  const minutes = Math.floor(totalSeconds / 60)
  const hours = Math.floor(minutes / 60);

  const hours_str = hours < 1 ? `` : `${hours}${"h"}`;
  const seconds_str = seconds < 10 ? `0${seconds}` : seconds
  const minutes_str = minutes < 10 ? `0${minutes}` : minutes

  return `${minutes_str}${"min"}`
}

function timeConvert(totalSeconds) {
  const minutesApprox = Math.floor(totalSeconds / 60)
  var num = minutesApprox;
  var hours = (num / 60);
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return (rhours >= 1 ? rhours + "h" : "") + rminutes + "min";
}

export default AreaChartCard
