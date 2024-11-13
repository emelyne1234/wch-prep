import React from 'react'
import { joinCard } from './constant'
import ProjectCard from './card/ProjectCard'

const Join = () => {
  return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {joinCard.map((item) => (
                <ProjectCard key={item.id} items={item} isJoin={true}/>
            ))}
        </div>
  )
}

export default Join