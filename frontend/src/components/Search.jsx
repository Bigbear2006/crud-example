import {useState} from "react";
import Filter from "./Filter";
import apiService from "../apiService";


export default function Search({setItems, setPagesCount, searchParams, setSearchParams}) {
    let [openFilter, setOpenFilter] = useState(false)

    const search = () => {
        apiService.search(searchParams.title, searchParams.categories, setItems, setPagesCount)
    }
    const setTitle = e => {
        setSearchParams({title: e.target.value}, 'pushIn')
    }
    const setSelectedCategories = (func) => {
        setSearchParams(params => ({categories: func(params.categories)}), 'pushIn')
    }

    return (
        <div className="search">
            <div className="search__main">
                <input type="text" className="search__input" placeholder="Поиск..." onChange={setTitle} value={searchParams.title}/>
                <button id="open-filter" onClick={() => setOpenFilter(open => !open)}>Фильтр</button>
                <button className="search__button" onClick={search}>Искать</button>
            </div>
            <Filter
                open={openFilter}
                selectedCategories={searchParams.categories}
                setSelectedCategories={setSelectedCategories}
            />
        </div>
    )
}