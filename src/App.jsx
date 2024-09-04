import React,{useState,useRef,useCallback} from 'react'
import useBookSearch from './useBookSearch'

function App() {

  const [query,setQuery]=useState('')
  const [pageNumber,setPageNumber]=useState(1)
  const observe = useRef()

  const {loading,error,books,hasMore} = useBookSearch(query,pageNumber)

  const lastbookelement = useCallback((node)=>{
    if (loading) return 
    if(observe.current) observe.current.disconnect()
      observe.current=new IntersectionObserver ((entries)=>{
        if(entries[0].isIntersecting && hasMore){
          setPageNumber(prevPageNum => prevPageNum+1)
        }
    })
    if(node) observe.current.observe(node)
  },[hasMore,loading])

  function handleSearch(e){
    setQuery(e.target.value) 
    setPageNumber(1)
  }

  
  return (
    <>
    <input type='text' value={query} onChange={handleSearch}></input>
    {books.map((book ,index) => {
      if(books.length === index + 1){
        return <div ref={lastbookelement} key={book}>{book}</div>
      } else{
        return <div key={book}>{book}</div>
      }
    })}
    <div>{loading && 'Loading....'}</div>
    <div>{error && 'Error....'}</div>
    </>
  )
}

export default App
