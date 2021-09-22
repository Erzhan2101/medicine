import React, {useEffect, useState} from 'react';
import './style.css'
import avatarca from './avatarca.jpeg'
import {useForm} from "react-hook-form";
import axios from "axios";

const Project = () => {
    const [isOpen, setIsOpen] = useState(false)
    const {handleSubmit, register, required} = useForm()
  const [gallery, setGallery] = useState([])
    const [image, setImage] = useState({})


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
            .then(({data}) => setGallery([...gallery, data]))
    }

    return (
        <>
            <div className='header'>
                <img className="avatarca" src={avatarca} alt=""/>
            </div>
            <div className="project">
                <h1 className="title">ПРОЕКТЫ</h1>
                <div className="flex">
                    <h3 className="desk">СПИСОК ПРОЕКТОВ</h3>
                    <button onClick={() => setIsOpen(true)} className="btn">Добавить проект</button>
                </div>
                <div className="flex-on-off">
                    <button className="btn-flex"><i className='bx bx-grid-alt'/></button>
                    <button className="btn-no-flex"><i className='bx bx-menu'/></button>
                </div>
                <div className="row">
                    {
                        gallery.map(item =>
                            <div className="col-3" key={item.id}>
                                <div className="card">
                                    <img className="img" src={item.img} alt=""/>
                                    <div className="card-title">
                                        <h4>{item.title}</h4>
                                        <p className="author">Автор: {item.author}</p>
                                        <p>{item.startDate}/{item.expirationDate}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            {
                isOpen &&
                <div onSubmit={handleSubmit(onSubmit)}>
                    <form>
                     <div className="flex-modal">
                         <input {...register("img", {required: true})} onChange={handleChange} type="file"/>
                         <input {...register("title", {required: true})} type="text" placeholder="название"/>
                         <input {...register("author", {required: true})} type="text" placeholder="имя автора"/>
                         <input {...register("startDate", {required: true})} type="date"/>
                         <input {...register("expirationDate", {required: true})} type="date"/>
                         <button>Добавить</button>
                     </div>
                    </form>
                </div>
            }
        </>
    );
};

export default Project;