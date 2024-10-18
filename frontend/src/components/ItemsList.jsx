import {useEffect, useState} from "react";
import Item from "./Item";
import If from "./If";
import CreateItem from "./CreateItem";
import apiService from "../apiService";


export default function ItemsList({items, setItems, page, setPagesCount, modalIsOpen, setModalIsOpen, isAdmin, isAuthenticated}) {
    let [saved, setSaved] = useState([])

    useEffect(() => {
        apiService.getItems(page, setItems, setPagesCount)
        apiService.getSavedItemsIds(setSaved)
    }, [page])

    const onSaveCallback = (id) => setSaved(saved => [...saved, id])
    const onDeleteCallback = (id) => setSaved(saved => saved.filter(elem => elem !== id))

    return (
        <If condition={items.length !== 0} otherwise={<div className="empty"><p>К сожалению, по вашему запросу ничего не найдено</p></div>}>
            {isAdmin && <button onClick={() => setModalIsOpen(value => !value)} id="open-create-item-form">Создать</button>}
            <div className="items">
                {items.map(elem =>
                    <Item
                        key={elem.id}
                        {...elem}
                        isSaved={saved.includes(elem.id)}
                        onSaveCallback={onSaveCallback}
                        onDeleteCallback={onDeleteCallback}
                        isAdmin={isAdmin}
                        isAuthenticated={isAuthenticated}
                    />)}
            </div>
            <CreateItem setModalIsOpen={setModalIsOpen} modalIsOpen={modalIsOpen}/>
        </If>
    )
}