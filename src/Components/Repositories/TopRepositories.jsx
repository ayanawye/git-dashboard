import React from 'react'
import TopRepository from './TopRepository'

const TopRepositories = ({repository}) => {
  return (
    <div>
      <div className='repos__container container'>
        {repository.map(repos => {
        return(
          <TopRepository reposit={repos} key={repos.id}/>
        )}
        )}
      </div>
    </div>
  )
}

export default TopRepositories