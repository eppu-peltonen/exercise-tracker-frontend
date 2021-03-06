import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
  Cell,
} from 'recharts'

import compare from '../utils/compareStartTime'

var dayjs = require('dayjs')
var duration = require('dayjs/plugin/duration')
dayjs.extend(duration)

const Charts = ({ exercises, user }) => {
  const sortedUserExercises = exercises.sort(compare)

  // Get hours from duration to use for calculation and add to all exercises
  const graphData = sortedUserExercises
  graphData.map(
    (exercise) =>
      (exercise.durationHours =
        parseFloat(exercise.duration.substring(0, 2)) +
        parseFloat(exercise.duration.substring(3, 5) / 60) +
        parseFloat(exercise.duration.substring(6, 8) / 3600))
  )

  // For some reason distance is returned as a string so parse here
  graphData.map(
    (exercise) => (exercise.distance = parseFloat(exercise.distance))
  )

  // =======================================
  // Data processing to display
  // =======================================

  const totalTimeHours = graphData.reduce(
    (acc, exercise) => acc + exercise.durationHours,
    0
  )

  // Returns time object from given hours that contains hours minutes and seconds
  const totalTimeObject = dayjs.duration(totalTimeHours, 'h')

  // Average of all average heart rates
  const avgHeartRate =
    graphData.reduce((acc, exercise) => acc + exercise.avg_hr, 0) /
    graphData.length

  const highestAvgHeartRate = graphData.reduce(
    (acc, exercise) => Math.max(acc, exercise.avg_hr),
    0
  )

  const totalDistance = graphData.reduce(
    (acc, exercise) => acc + exercise.distance,
    0
  )

  const topDistance = graphData.reduce(
    (acc, exercise) => (exercise.distance > acc ? exercise.distance : acc),
    0
  )

  // Add avg speed for all exercises (km/h)
  graphData.map(
    (exercise) =>
      (exercise.avgSpeed = exercise.distance / exercise.durationHours)
  )

  // Top avg speed from all exercises
  const topAvgSpeed = graphData.reduce(
    (acc, exercise) => Math.max(acc, exercise.avgSpeed),
    0
  )

  // How many exercises for each sport
  const sportAmount = graphData.reduce((acc, exercise) => {
    if (exercise.sport in acc) {
      acc[exercise.sport] += 1
    } else {
      acc[exercise.sport] = 1
    }
    return acc
  }, {})

  // sportAmount to array for pie chart data
  const sportDistribution = Object.keys(sportAmount).map((sport) => {
    return {
      name: sport,
      value: sportAmount[sport],
    }
  })

  // Most exercised sport
  const topSport = Object.keys(sportAmount).reduce(
    (prev, curr) => (sportAmount[prev] > sportAmount[curr] ? prev : curr),
    0
  )

  const pieChartColors = ['#4ade80', '#4ADECA', '#de4aa8', '#de804a']

  return (
    <div className="flex flex-row flex-wrap flex-grow mt-2">
      <div className="w-full md:w-1/2 xl:w-1/4 p-3">
        {/*Data Card*/}
        <div className="bg-gray-700 border-2 border-gray-500 rounded shadow">
          <div className="border-b-2 border-gray-500 p-3">
            <h5 className="font-bold uppercase text-gray-300">Total time</h5>
          </div>
          <div className="p-5 text-gray-300">
            {totalTimeObject.$d.days * 24 + totalTimeObject.$d.hours} h{' '}
            {totalTimeObject.$d.minutes} min {totalTimeObject.$d.seconds} s
          </div>
        </div>
        {/*/Data Card*/}
      </div>

      <div className="w-full md:w-1/2 xl:w-1/4 p-3">
        {/*Data Card*/}
        <div className="bg-gray-700 border-2 border-gray-500 rounded shadow">
          <div className="border-b-2 border-gray-500 p-3">
            <h5 className="font-bold uppercase text-gray-300">
              Total distance
            </h5>
          </div>
          <div className="p-5 text-gray-300">{totalDistance} km</div>
        </div>
        {/*/Data Card*/}
      </div>

      <div className="w-full md:w-1/2 xl:w-1/4 p-3">
        {/*Data Card*/}
        <div className="bg-gray-700 border-2 border-gray-500 rounded shadow">
          <div className="border-b-2 border-gray-500 p-3">
            <h5 className="font-bold uppercase text-gray-300">
              Average heart rate
            </h5>
          </div>
          <div className="p-5 text-gray-300">{avgHeartRate.toFixed(0)} bpm</div>
        </div>
        {/*/Data Card*/}
      </div>

      <div className="w-full md:w-1/2 xl:w-1/4 p-3">
        {/*Data Card*/}
        <div className="bg-gray-700 border-2 border-gray-500 rounded shadow">
          <div className="border-b-2 border-gray-500 p-3">
            <h5 className="font-bold uppercase text-gray-300">
              Highest heart rate
            </h5>
          </div>
          <div className="p-5 text-gray-300">{highestAvgHeartRate} bpm</div>
        </div>
        {/*/Data Card*/}
      </div>

      <div className="w-full md:w-1/2 xl:w-1/4 p-3">
        {/*Data Card*/}
        <div className="bg-gray-700 border-2 border-gray-500 rounded shadow">
          <div className="border-b-2 border-gray-500 p-3">
            <h5 className="font-bold uppercase text-gray-300">Top speed</h5>
          </div>
          <div className="p-5 text-gray-300">{topAvgSpeed.toFixed(2)} km/h</div>
        </div>
        {/*/Data Card*/}
      </div>

      <div className="w-full md:w-1/2 xl:w-1/4 p-3">
        {/*Data Card*/}
        <div className="bg-gray-700 border-2 border-gray-500 rounded shadow">
          <div className="border-b-2 border-gray-500 p-3">
            <h5 className="font-bold uppercase text-gray-300">Top Distance</h5>
          </div>
          <div className="p-5 text-gray-300">{topDistance.toFixed(2)} km</div>
        </div>
        {/*/Data Card*/}
      </div>

      <div className="w-full md:w-1/2 xl:w-1/4 p-3">
        {/*Data Card*/}
        <div className="bg-gray-700 border-2 border-gray-500 rounded shadow">
          <div className="border-b-2 border-gray-500 p-3">
            <h5 className="font-bold uppercase text-gray-300">Top sport</h5>
          </div>
          <div className="p-5 text-gray-300">{topSport}</div>
        </div>
        {/*Data Card*/}
      </div>

      <div className="w-full md:w-1/2 p-3">
        {/*Graph Card*/}
        <div className="bg-gray-700 border-2 border-gray-500 rounded shadow">
          <div className="border-b-2 border-gray-500 p-3">
            <h5 className="font-bold uppercase text-gray-300">
              Heart rate (bpm)
            </h5>
          </div>
          <div className="p-5">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                width={500}
                height={400}
                data={graphData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="start_time" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="avg_hr"
                  stroke="#4ade80"
                  fill="#4ade80"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/*/Graph Card*/}
      </div>

      <div className="w-full md:w-1/2 p-3">
        {/*Graph Card*/}
        <div className="bg-gray-700 border-2 border-gray-500 rounded shadow">
          <div className="border-b-2 border-gray-500 p-3">
            <h5 className="font-bold uppercase text-gray-300">Duration (h)</h5>
          </div>
          <div className="p-5">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                width={500}
                height={400}
                data={graphData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="start_time" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="durationHours"
                  stroke=" #4ADECA"
                  fill=" #4ADECA"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/*/Graph Card*/}
      </div>

      <div className="w-full md:w-1/2 p-3">
        {/*Graph Card*/}
        <div className="bg-gray-700 border-2 border-gray-500 rounded shadow">
          <div className="border-b-2 border-gray-500 p-3">
            <h5 className="font-bold uppercase text-gray-300">Distance (km)</h5>
          </div>
          <div className="p-5">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                width={500}
                height={400}
                data={graphData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="start_time" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="distance"
                  stroke=" #de4aa8"
                  fill=" #de4aa8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/*/Graph Card*/}
      </div>

      <div className="w-full md:w-1/2 p-3">
        {/*Graph Card*/}
        <div className="bg-gray-700 border-2 border-gray-500 rounded shadow">
          <div className="border-b-2 border-gray-500 p-3">
            <h5 className="font-bold uppercase text-gray-300">
              Sport distribution
            </h5>
          </div>
          <div className="p-5">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart width={400} height={400}>
                <Pie
                  data={sportDistribution}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  fill="#8884d8"
                  label
                >
                  {sportDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={pieChartColors[index % pieChartColors.length]}
                    />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/*/Graph Card*/}
      </div>
    </div>
  )
}

export default Charts
