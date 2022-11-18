import {useForm} from "react-hook-form";
import {useContext} from "react";
import {AuthContext} from "../../contexts/AuthContext";
import styles from '../../styles/CreateUser.module.css'

export default function Login(){
    const { register, handleSubmit } = useForm();
    const { signIn } = useContext(AuthContext);

    async function handleSignIn({...data}: any){
        await signIn(data)
    }

    return(
        <div className='flex h-screen w-screen'>
            <div className='w-6/12'>
                <img src="/images/imageLogin.png" alt="Image of money care"/>
            </div>
            <div className={styles.cardLogin}>
                <form onSubmit={handleSubmit(handleSignIn)}>
                    <div className='flex-1 justify-center items-center'>
                        <div className={styles.inputs}>
                            <input
                                { ...register('email') }
                                className={styles.inputLogin}
                                type="text"
                                name='email'
                                placeholder='Email'
                                autoComplete='email'
                                required
                            />
                        </div>
                        <div className='flex justify-center mb-5'>
                            <input
                                { ...register('password') }
                                className={styles.inputLogin}
                                type="password"
                                name='password'
                                placeholder='Password'
                                autoComplete='password'
                                required
                            />
                        </div>
                    </div>
                    <div className='flex justify-center my-5'>
                        <button type='submit' className={styles.buttonSend}>Enviar</button>
                    </div>
                    <div className="flex justify-center my-5">
                        <a href='auth/createUser'>Criar sua conta</a>
                    </div>
                </form>
            </div>
        </div>
    )
}