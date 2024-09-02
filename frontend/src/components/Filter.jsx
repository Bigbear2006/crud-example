import {useState, useEffect} from "react";
import apiService from "../apiService";

export default function Filter({open, selectedCategories, setSelectedCategories}) {
    let [categories, setCategories] = useState([])

    useEffect(() => apiService.getCategories(setCategories), [])

    return (
        <div className="filter" style={{display: open ? 'inline-block' : 'none'}}>
            <div className="categories">
                {categories.map(elem => {
                    return (
                        <div key={elem.id} className="category">
                            <input
                                type="checkbox"
                                data-id={elem.id}
                                checked={selectedCategories.includes(+elem.id)}
                                onChange={e => {
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
                                }}
                            />
                            <p>{elem.title}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}