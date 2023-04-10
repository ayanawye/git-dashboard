import React, { useEffect, useState } from 'react'
import './CardRep.scss'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Header from '../Header/Header'

const CardRep = () => {
  const [repInfo, setRepInfo] = useState(null)
  const [language, setLanguage] = useState([])
  const [getContributers, setGetContributers] = useState(null)
  const {id} = useParams()

  useEffect(() => {
    const repositoryInfo = async () => {
      const resp = await axios.get(`https://api.github.com/repositories/${id}`)
      const data = await resp.data
      setRepInfo(data)

      const languages = await axios.get(`https://api.github.com/repos/${data.full_name}/languages`)
      const dataLanguages = await languages.data
      setLanguage(Object.keys(dataLanguages))


      const contributers = await axios.get(`https://api.github.com/repos/${data.full_name}/contributors?per_page=10`)
      const dataContributer = await contributers.data
      setGetContributers(dataContributer)
    }
    repositoryInfo()
  }, [id])

  return (
    <div className='card'>
      <Header/>
      {repInfo && (
        <div className="card__container">
          <div className="card__header">
            <div className="card__header-top flex justify-between">
              <h2 className="card__name">{repInfo.full_name}</h2>
              <p className="card__lastCommit">Updated {repInfo.updated_at.slice(0,10)}</p>
            </div>
            <div className="card__header-bottom flex">
              <div className="card__statistics flex">
                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="octicon octicon-star">
                    <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path>
                </svg>
                <p className="card__statistics center">{repInfo.stargazers_count}</p>
              </div>
              <div className="card__statistics flex">
                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="octicon octicon-repo-forked mr-2">
                  <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
                </svg>
                <p className="card__statistics">{repInfo.forks_count}</p>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="content__left">
              <div className="owner flex">
                <div className="owner__img">
                  <img src={repInfo.owner.avatar_url} alt="avatar"/>
                </div>
                <div className="owner__content">
                  <h3 className="owner__login">{repInfo.owner.login}</h3>
                  <p className='owner__type'>Type: {repInfo.owner.type}</p>
                  <p className='owner__type'>Followers: {repInfo.subscribers_count}</p>
                  <a href={repInfo.owner.html_url}>{repInfo.owner.html_url}</a>
                </div>
              </div>
              <div className="contributor">
                <h3 className='title'>Contributors</h3>
                {getContributers ? getContributers.map(el => (
                  <div key={el.id} className="contributor__card flex aling-center">
                    <div className="contributor__image">
                      <img src={el.avatar_url} alt="" />
                    </div>
                    <div className="contributor__content">
                      <h4 className="contributor__name">{el.login}</h4>
                      <p className="contributor__count">Contributions: {el.contributions}</p>
                    </div>
                  </div>
                ))
                :
                <div>Not Found!</div>
                }
              </div>
            </div>
            <div className="content__right">
              <h3 className='content__name'>About </h3>
              <div className="about">
                {language.length > 0 ? language.map((el, index) => (
                  <li className='about__lang' key={index}>{el}</li>
                  )) :
                  <p style={{textAlign: "center", marginBottom: "10px"}}>языки не найдены...</p>
                }
              </div>
              <p className='about__span'>Description: </p>
              <p className="about__desc">{repInfo.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
)}

export default CardRep