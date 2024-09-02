import {useEffect} from "react";

import Item from "./Item";
import If from "./If";
import CreateItem from "./CreateItem";
import apiService from "../apiService";


export default function ItemsList({items, setItems, page, setPagesCount, modalIsOpen, setModalIsOpen, isAdmin}) {
    useEffect(() => apiService.getItems(page, setItems, setPagesCount), [page])

    return (
        <If condition={items.length !== 0} otherwise={<div className="empty"><p>К сожалению, по вашему запросу ничего не найдено</p></div>}>
            {isAdmin && <button onClick={() => setModalIsOpen(value => !value)} id="open-create-item-form">Создать</button>}
            <div className="items">
                {items.map(elem => <Item key={elem.id} {...elem} isAdmin={isAdmin}/>)}
            </div>
            <CreateItem setModalIsOpen={setModalIsOpen} modalIsOpen={modalIsOpen}/>
        </If>
    )
}