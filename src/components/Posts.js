import React, { useEffect, useState } from 'react'
import '../App.css'
import axios from 'axios'

import { Modal, Button } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'


const Posts = () => {

    const [posts, setPosts] = useState([]);
    const [data, setData] = useState("");
    const [modalData, setModalData] = useState('')
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const url = "https://my-json-server.typicode.com/Codeinwp/front-end-internship-api/posts";
    const getPostsData = async () => {
        const response = await axios.get(url);
        console.log(response)
        const { data } = response;
        console.log(data);
        setPosts(data)

    }
    const { id } = useParams()
    const getData = async () => {
        const responseData = await axios.get(`url/${id}`);
        console.log(responseData)
        const data = responseData.data
        console.log(data)
        setData(data)
    }

    useEffect(() => {
        getPostsData();
        getData();

    }, [])
    const handleShow = () => {
        setShow(true);
        setModalData(posts)
    }


    const ModalContent = () => {
        return (
            <>
                <div
                    className="d-flex align-items-center justify-content-center overflow-hidden"
                    style={{ height: "10vh" }}
                >
                </div>

                {
                    modalData && modalData.length > 0 && modalData.map((user) => (
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>

                            </Modal.Header>
                            <Modal.Body>
                                <img src={user.thumbnail.small} className='modal-post-image img-fluid' />
                                <h3 className='post-title text-dark'>{user.title}</h3>
                                <p className='post-description'>{user.content}</p>
                                <div className='post-footer '>
                                    <div className='p-1 modal-flex'>
                                        <img src={user.author.avatar} height={50} width={50} className='modal-image' />
                                        <p className='author-name ms-3 mt-3'>  {user.author.name} - {user.author.role}</p>
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close Modal
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    ))
                }
            </>
        )
    }
    return (
        <>
            <div className='posts'>

                <div className='container'>
                    <div className='post-cards' >
                        {
                            posts && posts.length > 0 && posts.map((postData) => (
                                <>
                                    <div className='post-card' key={postData.id} >
                                        <Link className='text-decoration-none' to={`/${postData.id}`}>

                                            <div className="image-hover-text-container">
                                                <div className="image-hover-image">
                                                    <img src={postData.thumbnail.small} className='post-image' />
                                                </div>
                                                <div className="image-hover-text">
                                                    <div className="image-hover-text-bubble">
                                                        <a className='learn-more' onClick={handleShow} > <span className="image-hover-text-title">Learn More</span></a>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className='post-body'>
                                                <div className='circles'>
                                                    <div className='blue-circle' ></div>
                                                    <div className='yellow-circle' ></div>
                                                </div>
                                                <h3 className='post-title text-dark'>{postData.title}</h3>
                                                <p className='post-description'>{postData.content}</p>
                                                <div className='post-footer'>
                                                    <p className='author-name'>{postData.author.name} - {postData.author.role}</p>
                                                    <p className='date' >Nov 25, 2020</p>
                                                </div>
                                            </div>

                                        </Link>
                                    </div>
                                </>
                            ))
                        }
                    </div>
                </div>

                {show ? < ModalContent /> : null}
            </div>
        </>
    )
}

export default Posts