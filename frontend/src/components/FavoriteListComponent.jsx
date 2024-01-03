import axios from 'axios'
import { useOutletContext } from "react-router-dom"
import {useState, useEffect} from "react"
import { api } from '../utilities/ApiUtilities';

const FavoriteList = () => {
  const {favorites, setFavorites} = useOutletContext()
  


  return (
    <>

    </>
  )
}


export default FavoriteList
