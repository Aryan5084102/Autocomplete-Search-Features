import { useEffect, useState } from "react";


const Home = () => {
  const [input, setInput] = useState('')
  const [result, setResult] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [cache, setCache] = useState({});


  const fetchData = async () =>{
    if(cache[input]){
      console.log("CACHE RETURNED" , input)
      setResult(cache[input]);
      return;
    }
    console.log("API CALL" + input)
    const res = await fetch("https://dummyjson.com/recipes/search?q=" + input)
    const data = await res.json();
    setResult(data?.recipes)
    setCache(prev => ({...prev, [input]: data?.recipes}));
  }

  useEffect(() =>{
    const timer = setTimeout(fetchData, 300);

    return () =>{
      clearTimeout(timer)
    }
    
  }, [input])

  return (
        <div className='container'>
            <h1 className='title'>Autocomplete Search Functionality</h1>
            <div className='searchbar-container'>
                <input 
                  type='text' 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)} 
                  className="input-field" 
                  placeholder='Search Something' 
                  onFocus={() => setShowResult(true)}
                  onBlur={() => setShowResult(false)}
                />
            </div>
            {showResult && 
              <div className="result-container">
                {result.map((r) =>(
                  <span className="result" key={r.id}>{r.name}</span>
                ))}
              </div>
            }
        </div>
  )
}

export default Home