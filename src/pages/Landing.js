import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../contexts/MainContext';
import styled from 'styled-components';
import Alert from '../components/Alert';
import Loader from '../components/Loader';

const Container = styled.div`
    width: 90%;
    margin: 3rem auto;

    h2 {
        font-family: 'Poppins';
        font-size: 40;
    }

    .videos {
        margin-top: 2rem;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        justify-content: center;
        align-items: center;
        grid-gap: 2rem;

        .video {
            cursor: pointer;
            display: grid;
            grid-template-columns: 1fr;
            justify-content: center;
            align-items: center;

            .thumbnail {
                width: 100%;
                height: 200px;
            }

            .views {
                position: relative;
                top: -195px;
                right: -85%;
                background: rgba(0, 0, 0, 0.5);
                color: #FFFFFF;
                width: 50px;
                display: grid;
                grid-template-columns: repeat(2, auto);
                justify-content: center;
                align-items: center;
                column-gap: 0.5rem;

                .eye {
                    width: 1rem;
                    height: 1rem;
                }

                p {
                    color: #FFFFFF;
                }
            }

            .info {
                display: grid;
                grid-template-columns: auto 1fr;
                justify-content: center;
                align-items: center;
                column-gap: 1rem;

                .profile {
                    cursor: pointer;
                    width: 2.5rem;
                    height: 2.5rem;
                    border-radius: 50%;
                    background: ${({ darkMode }) => darkMode ? '#24272B' : '#F3F4F9'};
                    display: grid;
                    justify-items: center;
                    align-items: center;

                    .avatar {
                        width: 2.5rem;
                        height: 2.5rem;
                        border-radius: 50%;
                    }

                    svg {
                        width: 1.25rem;
                        height: 1.25rem;
                    }
                }

                .meta {
                    display: grid;
                    grid-template-columns: 1fr;
                    justify-content: center;
                    align-items: center;
                    row-gap: 0.5rem;
                }
            }
        }
    }
`;

const Landing = () => {
    const { videos, getVideos, darkMode } = useContext(MainContext);
    const [ alert, setAlert ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        (async() => {
            try {
                setLoading(true);
                await getVideos();
                setLoading(false);
            } catch(err) {
                setLoading(false);
                setAlert({ type: 'failure', text: 'Error occured! Try again later' });
                setTimeout(() => setAlert(null), 5000);
            }
        })();
        // eslint-disable-next-line
    }, []);

    return !loading ? (
        <Container>
            { alert && <Alert type={alert.type} text={alert.text} /> }
            {
                videos.length > 0 ? (
                    <>
                        <h2>Recent Videos</h2>
                        <div className="videos">
                            {
                                videos.map(video => (
                                    <div className="video" key={video.id}>
                                        <img src={video.thumbnail} alt='Video thumbnail' className="thumbnail" />
                                        <div className="views">
                                            <p>{video.views}</p>
                                            <svg className='eye' viewBox="0 0 26.292 19.667">
                                                <g transform="translate(0 -3)">
                                                    <path d="M1,12.833S5.417,4,13.146,4s12.146,8.833,12.146,8.833-4.417,8.833-12.146,8.833S1,12.833,1,12.833Z" fill="none" stroke='#FFFFFF' strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                                    <circle cx="3.5" cy="3.5" r="3.5" transform="translate(10 9)" strokeWidth="2" stroke='#FFFFFF' strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                                </g>
                                            </svg>
                                        </div>
                                        <div className="info">
                                            <div className="profile">
                                                {
                                                    video.user.photoURL ? (
                                                        <div className='avatar' style={{ backgroundImage: `url(${video.user.photoURL})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                                    ) : (
                                                        <svg viewBox="0 0 34 34">
                                                            <g transform="translate(1 1.247)">
                                                                <path d="M36,27.916V23.61C36,18.855,32.418,15,28,15H12c-4.418,0-8,3.855-8,8.61v4.305" transform="translate(-4 3.838)" fill="none" stroke={darkMode ? '#FFFFFF' : '#07070A'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                                                <ellipse cx="8" cy="9" rx="8" ry="9" transform="translate(8 -0.247)" fill="none" stroke={darkMode ? '#FFFFFF' : '#07070A'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                                            </g>
                                                        </svg>
                                                    )
                                                }
                                            </div>
                                            <div className="meta">
                                                <h3>{video.title}</h3>
                                                <h5>{video.user.displayName}</h5>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                ) : (
                    <h2>No Videos Available</h2>
                )
            }
        </Container>
    ) : <Loader />
};

export default Landing;