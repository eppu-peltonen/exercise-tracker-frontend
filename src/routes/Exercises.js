import ExerciseList from '../components/ExerciseList'
import Divider from '../components/Divider'
import Charts from '../components/Charts'
import Notification from '../components/Notification'

const Exercises = ({ exercises, setExercises, user }) => {
  return (
    <div className="">
      <Notification />
      <ExerciseList
        exercises={exercises}
        setExercises={setExercises}
        user={user}
      />
      <Divider />
      <Charts exercises={exercises} user={user} />
    </div>
  )
}

export default Exercises
