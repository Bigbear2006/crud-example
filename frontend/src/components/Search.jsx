import {useState} from "react";

import Filter from "./Filter";
import apiService from "../apiService";


export default function Search({setItems, setPagesCount}) {
    let [openFilter, setOpenFilter] = useState(false)
    let [selectedCategories, setSelectedCategories] = useState([])
    let [title, setTitle] = useState('')
    let search = () => apiService.search(title, selectedCategories, setItems, setPagesCount)

    return (
        <div className="search">
            <div className="search__main">
                <input type="text" className="search__input" placeholder="Поиск..." onChange={e => setTitle(e.target.value)}/>
                <button id="open-filter" onClick={() => setOpenFilter(open => !open)}>Фильтр</button>
                <button className="search__button" onClick={search}>Искать</button>
            </div>
            <Filter
                open={openFilter}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
            />
        </div>
    )
}