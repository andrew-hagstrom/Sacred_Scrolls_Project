import axios from 'axios'
import { useOutletContext } from "react-router-dom"
import {useState, useEffect} from "react"
import { api } from '../utilities/ApiUtilities';

const FavoriteList = () => {
  const {favorites, setFavorites} = useOutletContext()
  

  const getFavoriteList = async() => {
    let response = await api
    .get("favorites/")
    .catch((err) =>{
      console.log(err.response)
    })
    console.log(response)
  }


  return (
    <>

    </>
  )
}


export default FavoriteList
