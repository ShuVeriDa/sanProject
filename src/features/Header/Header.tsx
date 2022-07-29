import React, {useCallback} from 'react';
import style from './Header.module.css'
import styleContainer from '../../common/styles/Container.module.css'
import logo from '../../assets/img/icons/Group 753.svg'
import {useAppDispatch, useAppSelector} from "../../store/store";
// import {logoutTC} from "../Login/login-reducer";

export const Header = () => {

    const dispatch = useAppDispatch()

    const logoutHandler = useCallback(() => {
        // dispatch(logoutTC())
    }, [])

    return (
        <div className={style.headerBlock}>
            <div className={`${styleContainer.container} ${style.header}`}>
                <div className={style.logo}>
                    <img src={logo} alt=""/>
                </div>
                <div className={style.button}>
                </div>
            </div>
        </div>
    );
};
