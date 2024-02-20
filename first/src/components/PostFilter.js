import React from 'react';
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";

const PostFilter = ({filter, setFilter}) => {
    return (
        <div>
            <MyInput
                placeholder={"Поиск..."}
                value={filter.query}
                onChange={e => setFilter({...filter, query: e.target.value})}
            />
            <MySelect
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                options={[
                    {value: "title", name: "Сортировка по названию"},
                    {value: "body", name: "Сортировка по описанию"}
                ]}
                defaultValue={"Выберите сортировку"}
            />
        </div>
    );
};

export default PostFilter;