import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import TopRepositories from '../Repositories/TopRepositories'
import './MainPage.scss'
import Cat from '../../images/364.gif'
import { Config } from '../API'
import Header from '../Header/Header'
import Pagination from '../Pagination/Pagination'

const MainPage = () => {
  const [repository, setRepository] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [repositoriesPerPage] = useState(15)

  useEffect(() => {
    if(search === ''){
      const getTopRepositories = async () => {
        setLoading(true)
        const resp = await axios.get(`https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&per_page=10`)
        const data = await resp.data.items
        setRepository(data)
        setLoading(false)
      }
      setTimeout(() => {
        getTopRepositories()
      }, 3000)
    } else{
      const getData = async () => {
        setLoading(true)
        const resp = await axios.get(`https://api.github.com/search/repositories?q=${search}&per_page=100`, Config)
        const data = await resp.data.items
        setRepository(data)
        setLoading(false)
      }
      getData()
    }
  }, [search])

  const lastRepositoryIndex = currentPage * repositoriesPerPage
  const firstRepositoryIndex = lastRepositoryIndex - repositoriesPerPage
  const currentRepository = repository.slice(firstRepositoryIndex, lastRepositoryIndex)

  const paginate = pageNumber => setCurrentPage(pageNumber)

  return (
    <div className="main container">
      <Header/>
      <div className="search">
        <div className="search__inp flex justify-center">
          <input 
            className="main__input" 
            type="text" 
            placeholder="Найти репозиторий..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <svg className="main__svg" aria-hidden="true" fill="#7d8590" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true">
              <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"></path>
          </svg>
        </div>
        {!search ? 
          <div className="list flex aling-center justify-center">
            <h2 className="list__name"> 10 самых популярных репозиториев</h2>
          </div>
        : <div className="list flex aling-center justify-center">
            <h2 className="list__name"> Поиск по названию...</h2>
        </div>
        }
      </div>
      {loading? 
        <div className="cat__svg flex aling-center justify-center">
          <img src={Cat} alt=""/> 
        </div>
        : 
        <TopRepositories repository={currentRepository}/>}
      {!loading ?
        <Pagination 
        repositoriesPerPage={repositoriesPerPage} 
        totalRepocitories={repository.length}
        paginate={paginate}
        currentPage={currentPage}/>
        :
        <div></div>
      }
    </div>
  )
}

export default MainPage