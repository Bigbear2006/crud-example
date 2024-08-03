import {useState, useEffect} from "react";
import axios from "axios";

export default function Filter({open, selectedCategories, setSelectedCategories}) {
    let [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/categories/')
            .then(rsp => setCategories(rsp.data))
    }, [])

    return (
        <div className="filter" style={{display: open ? 'inline-block' : 'none'}}>
            <div className="categories">
                {categories.map(elem => {
                    return (
                        <div key={elem.id} className="category">
                            <input type="checkbox" data-id={elem.id} onChange={e => {
                                let id = e.target.getAttribute('data-id')
                                if (e.target.checked) {
                                    setSelectedCategories(selected => {
                                        return [...selected, +id]
                                    })
                                } else {
                                    setSelectedCategories(selected => {
                                        selected.splice(selected.indexOf(+id), 1)
                                        return selected
                                    })
                                }
                            }}/>
                            <p>{elem.title}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}