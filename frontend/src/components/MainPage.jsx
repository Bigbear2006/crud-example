import Search from "./Search";
import ItemsList from "./ItemsList";
import Pagination from "./Pagination";

import {useState} from "react";
import {NumberParam, StringParam, NumericArrayParam, useQueryParams, withDefault} from "use-query-params";

export default function MainPage({isAdmin}) {
    let [searchParams, setSearchParams] = useQueryParams({
        page: withDefault(NumberParam, 1),
        title: withDefault(StringParam, ''),
        categories: withDefault(NumericArrayParam, []),
    })
    let [items, setItems] = useState([])
    let [pagesCount, setPagesCount] = useState(1)
    let [modalIsOpen, setModalIsOpen] = useState(false)

    const setPage = page => {
        setSearchParams({page: page}, 'pushIn')
    }

    return (
        <>
            <Search setItems={setItems} setPagesCount={setPagesCount} searchParams={searchParams} setSearchParams={setSearchParams}/>
            <ItemsList
                items={items}
                setItems={setItems}
                page={searchParams.page}
                setPagesCount={setPagesCount}
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                isAdmin={isAdmin}
            />
            <Pagination page={searchParams.page} setPage={setPage} pagesCount={pagesCount}/>
        </>
    )
}