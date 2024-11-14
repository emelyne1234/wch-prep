
import  {infoCard}  from './constant'
import ProjectCard from './card/ProjectCard'
import { FaBullseye } from 'react-icons/fa6'
const HomeDashboard = () => {
  return (
    <div className='mt-32'>
      <h1 className='blue-gradient_text font-semibold drop-shadow-lg text-2xl lg:text-4xl mb-6'>Your Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {infoCard.map((item) => (
          <ProjectCard key={item.id} items={item} isJoin={false} />
        ))}
      </div>
    </div>
  )
}

export default HomeDashboard