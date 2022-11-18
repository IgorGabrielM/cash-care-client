import {useForm} from "react-hook-form";
import {Router} from "next/router";
import {api} from "../api/api";
import styles from '../../styles/CreateUser.module.css'

export default function CreateUser(){
    const { register, handleSubmit } = useForm();

    async function handleSendNewUser({...data}){
        await api.post('/user', data)
        // @ts-ignore
        await Router.push('/auth')
    }

    return(
        <div className='flex justify-between items-center h-screen'>
            <div className='w-6/12'>
                <img src="/images/imageCreateUser.png" alt="Image of money care"/>
            </div>
            <div className={styles.cardLogin}>
                <form onSubmit={handleSubmit(handleSendNewUser)}>
                    <div className={styles.inputs}>
                        <input
                            { ...register('username') }
                            className={styles.inputLogin}
                            type="text"
                            name='username'
                            placeholder='Username'
                            required
                        />
                    </div>
                    <div className='mb-2'>
                        <input
                            { ...register('password') }
                            className={styles.inputLogin}
                            type="password"
                            name='password'
                            placeholder='Password'
                            required
                        />
                    </div>
                    <button type='submit' className={styles.buttonSend}>Enviar</button>
                </form>
            </div>
        </div>
    )

}