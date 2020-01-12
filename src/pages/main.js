import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
import {Link} from 'react-router-dom';
import {api} from '../services/api';

import './main.css';
import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';

export default function Main({match}){
    const [users, setUsers] = useState([])
   
    useEffect(()=>{
        async function carregaDevs(){

            const response = await api.get('/devs',{
                headers:{
                    user:match.params.idDev,
                }
            })
            setUsers(response.data);
        }

        carregaDevs();
    },[match.params.idDev])

    useEffect(()=>{
        const socket = io('http://localhost:2222/',{
            query:{user:match.params.idDev}
        });


    },[match.params.idDev])

    async function userlike(id){
        await api.post(`/devs/${id}/likes`,null,{
            headers: {user:match.params.idDev},
        })

        setUsers(users.filter(user => user._id !== id))
    }
    async function userdislike(id){
        await api.post(`/devs/${id}/dislikes`,null,{
            headers: {user:match.params.idDev},
        })

        setUsers(users.filter(user => user._id !== id))
    }

    return(
        <div className = 'main-container'>
            <Link to='/'>
                <img src= {logo} alt='Tindev' />
            </Link>
                { users.length > 0 ? (
                <ul>     
                    {users.map((user)=>{
                        return(
                            <li key={user._id}>
                                <img src= {user.avatar} alt= {user.name} />
                                <footer>
                                    <strong>{user.name}</strong>
                                    <p> {user.bio} </p>
                                </footer>
                                <div className="buttons">
                                    <button onClick={()=>{userdislike(user._id)}}>
                                        <img src={dislike} alt='dislike' />
                                    </button>
                                    <button onClick={()=>{userlike(user._id)}}>
                                        <img src={like} alt='like'/>
                                    </button>
                                </div>
                            </li>
                        )
                    })}
                </ul>
                ) : <h1 className="empty">Acabou :(</h1>}
        </div>
    );
}