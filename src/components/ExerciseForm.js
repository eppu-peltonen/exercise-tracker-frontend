import React, {useState} from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css
import 'react-datepicker/dist/react-datepicker-cssmodules.css';



const listOfSports = [
  "Running",
  "Walking",
  "Cycling"
]

const SportList = ({sport, setSport}) => {
  return (
    <div className="flex">
      <div className="mb-3 xl:w-96">
          <select
            onChange={(e) => setSport(e.target.value)}
            value={sport}
            className="form-select appearance-none block w-full px-3 py-1.5 text-base font-medium
            bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0
            focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
            aria-label="Default select example"
          >
            <option>Select sport</option>
            {listOfSports.map(sport => (
              <option key={sport}>{sport}</option>
            ))}
          </select>
      </div>
    </div>
  )
}

const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
  <button type="button" className="bg-green-600 hover:bg-green-700 text-white font-bold px-2 py-1 rounded focus:outline-none focus:shadow-outline" onClick={onClick} ref={ref}>
    {value}
  </button>
));

const ExerciseForm = ({createExercise}) => {

  const [sport, setSport] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')
  const [distance, setDistance] = useState(0)
  const [avgHR, setAvgHR] = useState(0)

  const addExercise = (event) => {
    event.preventDefault()

    const duration = hours + ':' + minutes + ':' + seconds
    
    createExercise({
      sport: sport,
      start_time: startDate,
      duration: duration,
      distance: distance,
      avg_hr: avgHR
    })
    setSport('')
    setHours(0)
    setMinutes(0)
    setSeconds(0)
    setDistance(0)
    setAvgHR(0)
    window.location.reload()
  }

  return (
    <div className="w-full">
      <form onSubmit={addExercise} className="bg-white shadow-md rounded p-8 mb-4">
        <h2 className= "text-3xl md:text-4xl mb-3 text-green-600 font-normal">Add new exercise</h2>
        <div className="mb-6">
          <label className="block text-gray-700 text-base font-bold mb-2" htmlFor="sport">
            Sport
          </label>
          <SportList sport={sport} setSport={setSport} />
        </div>
        <div className='mb-6'>
          <label className="block text-gray-700 text-base font-bold mb-2" htmlFor="date">
            Start date and time
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date, event) => setStartDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            customInput={<ExampleCustomInput/>}
            withPortal
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-base font-bold mb-2" htmlFor="duration">
            Duration
          </label>
            <div className='flex flex-row'>
              <div>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='hours'>hours</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id='hours'
                  type='text'
                  min={0}
                  value={hours}
                  onChange={(event) => {setHours(event.target.value)}}
                  placeholder='(hh)'
                />
              </div>
              <div>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='minutes'>minutes</label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id='minutes'
                    type='text'
                    min={0}
                    max={59}
                    value={minutes}
                    onChange={(event) => {setMinutes(event.target.value)}}
                    placeholder='(mm)'
                  />
              </div>
              <div>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='seconds'>seconds</label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id='seconds'
                    type='text'
                    min={0}
                    max={59}
                    value={seconds}
                    onChange={(event) => {setSeconds(event.target.value)}}
                    placeholder='(ss)'
                  />
              </div>
            </div>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-base font-bold mb-2" htmlFor="distance">
            Distance (km)
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="distance"
            type="number"
            min={0}
            value={distance}
            onChange={(event) => {setDistance(event.target.value)}}
            placeholder="distance"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-base font-bold mb-2" htmlFor="avg_hr">
            Average heart rate
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="avg_hr"
            type="number"
            min={0}
            value={avgHR}
            onChange={(event) => {setAvgHR(event.target.value)}}
            placeholder="avg_hr"
          />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Save exercise
          </button> 
        </div>
      </form>
    </div>
  )
}

export default ExerciseForm