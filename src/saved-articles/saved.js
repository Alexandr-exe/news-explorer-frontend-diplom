import '../styles/saved.css'

import { saved, nav, buttonLogout, main } from '../js/constants/constants'
import { defaultMainApi } from '../js/config/config'

import MainApi from "../js/api/MainApi";
import Header from "../js/components/Header";
import NewsCard from "../js/components/NewsCard";
import NewsCardList from "../js/components/NewsCardList";
import InfoArticles from '../js/components/InfoArticles'


const mainApi = new MainApi(defaultMainApi)

function createSaveArticle(article) {
  const saveArticle = new NewsCard(mainApi)
  saveArticle.createSaveArticle(article)
  saveArticle.element.querySelector('.button__delete').addEventListener('click', saveArticle._removeCard)
  return saveArticle.element
}
const infoArticles = new InfoArticles(main, mainApi.getUser, mainApi.getArticles)
const header = new Header(nav, buttonLogout, mainApi.getUser, mainApi.unlogin)
const newsCardList = new NewsCardList(saved, createSaveArticle, mainApi.getArticles)

buttonLogout.addEventListener('click', header.reLocation)

infoArticles.renderContext()
header.rename()
newsCardList.getSaveArticle()

