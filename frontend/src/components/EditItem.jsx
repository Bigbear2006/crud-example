import {useParams, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {useForm, Controller} from "react-hook-form";
import apiService from "../apiService";
import Select from "react-select";



export default function EditItem() {
    let { id } = useParams()
    let navigate = useNavigate()
    let [item, setItem] = useState({})
    let [categories, setCategories] = useState([])
    const {register, handleSubmit, setValue, control} = useForm()

    useEffect(() => {
        apiService.getItem(id, setItem, setValue)
        apiService.getCategories(setCategories, true)
    }, [])

    return(
        <form className="edit-item" onSubmit={handleSubmit(data => apiService.editItem(id, data, navigate))}>
            <input type="text" name="title" {...register('title')}/>
            <div className="edit-item__edit-image">
                <input type="file" name="image" {...register('image')}/>
                <img src={item.image} width="10%" alt="#"/>
                <div className="edit-image__actions">
                    <button type="button" id="choose-file" onClick={() => document.querySelector('input[name="image"]').click()}>Выберите файл</button>
                    <button type="button" id="delete-image" onClick={() => setValue('image', [new File([], '')])}>Удалить изображение</button>
                </div>
            </div>
            <textarea name="description" rows="10" {...register('description')}/>
            <Controller
                name="categories"
                control={control}
                render={({field: {onChange, value, ref}})=> (
                    <Select
                        isMulti
                        options={categories}
                        defaultValue={[]}
                        onChange={(selectedOptions) => {
                            onChange(selectedOptions.map(option => option.value))
                        }}
                        value={value ? categories.filter(category => value.includes(category.value)): []}
                        ref={ref}
                    />
                )}
            />
            <div className="edit-item__actions">
                <button type="submit" id="edit-item">Изменить</button>
                <button type="button" id="delete-item" onClick={() => apiService.deleteItem(id, navigate)}>Удалить</button>
            </div>
        </form>
    )
}