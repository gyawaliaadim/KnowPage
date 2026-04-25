import React from 'react'
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Invalid access of API route',
};


const API = () => {
  return (
    <div>{`Sorry, this page isn't meant to be accessed through GET Request.`}</div>
  )
}

export default API