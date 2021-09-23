import React, {useEffect, useState} from 'react';
import './style.css'
import avatar from './avatarca.jpeg'
import {useForm} from "react-hook-form";
import axios from "axios";

const Project = () => {
    const [isOpen, setIsOpen] = useState(false)
    const {handleSubmit, register} = useForm()
    const [gallery, setGallery] = useState([])
    const [image, setImage] = useState({})
    const [cName, setClassName] = useState('jsGridView');


    useEffect(() => {
        axios("https://614af56ce4cc2900179eae02.mockapi.io/api/gallery")
            .then(({data}) => setGallery(data))
    }, [])

    const handleChange = (e) => {
        const formData = new FormData()
        formData.append("file", e.target.files[0])
        formData.append("upload_preset", "gallery")

        axios.post("https://api.cloudinary.com/v1_1/erzhan2101/upload", formData)
            .then(({data}) => setImage(data))
    }

    const onSubmit = (data) => {
        data.img = image.url
        axios.post('https://614af56ce4cc2900179eae02.mockapi.io/api/gallery', data)
            .then(({data}) =>{
                setGallery([...gallery, data])
                setIsOpen(false)
            } )
    }

    return (
        <>
            <div className='header'>
                <img className="avatar" src={avatar} alt=""/>
            </div>
            <div className="project">
                <h1 className="title">ПРОЕКТЫ</h1>
                <div className="flex">
                    <h3 className="desk">СПИСОК ПРОЕКТОВ</h3>
                    <button onClick={() => setIsOpen(true)} className="btn">Добавить проект</button>
                </div>
                <div className="flex-on-off">
                    <button className="view-btn list-view btn-flex" title="Grid View" onClick={() => setClassName('jsGridView')}>
                        <i className='bx bx-grid-alt'/>
                    </button>

                    <button className="view-btn list-view btn-no-flex" title="List View" onClick={() => setClassName('jsListView')}>
                        <i className='bx bx-menu'/>
                    </button>


                </div>

                <div className="row">
                   <div className={cName}>
                       {
                           gallery.map(item =>

                                   <div className="card">
                                       <img className="img-card" src={item.img} alt=""/>
                                       <div className="card-title">
                                           <h4>{item.title}</h4>
                                           <p className="author"><i className='bx bxs-user'/> {item.author}</p>
                                           <p className="calendar"><i
                                               className='bx bx-calendar'/> {item.startDate}/{item.expirationDate} гг.</p>
                                       </div>
                                   </div>

                           )
                       }
                   </div>
                </div>
            </div>
            {
                isOpen &&
                <div className="modal-window">
                    <div className="modal-content">
                        <div onSubmit={handleSubmit(onSubmit)}>
                            <form>
                                <div className="flex-modal">
                                    <button className="close-modal" onClick={() => setIsOpen(false)}>×</button>
                                    <label htmlFor='img'>Добавить фото</label>
                                    <input className="modal-input input-img" {...register("img", {required: true})}
                                           id='img' onChange={handleChange} type="file"/>
                                    <label htmlFor='title'>Название</label>
                                    <input className="modal-input" {...register("title", {required: true})} id="title"
                                           type="text" placeholder="название"/>
                                    <label htmlFor='author'>Автор</label>
                                    <input className="modal-input" {...register("author", {required: true})} id="author"
                                           type="text" placeholder="имя автора"/>
                                    <div className="grid-date">
                                        <div>
                                            <label htmlFor='startDate'>Дата старта</label>
                                            <input className="input-date" {...register("startDate", {required: true})}
                                                   id="startDate" type="date"/>
                                        </div>
                                        <div>
                                            <label htmlFor="expirationDate">Дата окончания</label>
                                            <input
                                                className="input-date " {...register("expirationDate", {required: true})}
                                                id="expirationDate" type="date"/>
                                        </div>

                                    </div>
                                    <button className="btn-add">Добавить</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }

        </>
    );
};

export default Project;