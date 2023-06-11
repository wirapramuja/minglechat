'use client'


import Button from '@/app/components/Button'
import Input from '@/app/components/Input'
import { FC, useCallback, useEffect, useState } from 'react'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import AuthSocialButton from './AuthSocialButton'
import {BsGithub, BsGoogle} from 'react-icons/bs'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import {signIn, useSession} from 'next-auth/react'
import {useRouter} from 'next/navigation'
interface AuthFormProps {
  
}

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm: FC<AuthFormProps> = ({}) => {
    const session = useSession()
    const router = useRouter()
    const [variant, setVariant] = useState<Variant>('LOGIN')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=> {
        if (session?.status === 'authenticated'){
            router.push('/users')
        }
    }, [session?.status, router])

    const toggleVariant = useCallback(()=> {
        if (variant === 'LOGIN'){
            setVariant('REGISTER')
        } else {
            setVariant('LOGIN')
        }
        
    }, [variant])

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }

    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        if (variant === 'REGISTER'){
            // Axiso Register
            axios.post('/api/register', data)
            .then(()=> signIn('credentials', data))
            .catch(()=> toast.error('Something went wrong'))
            .finally(()=> setIsLoading(false))
        }

        if (variant === 'LOGIN'){

            // Nextauth SIgnin
            signIn('credentials', {
                ...data,
                redirect: false
            })
            .then((callback)=> {
                if (callback?.error){
                    toast.error('Invalid credentials')
                }

                if (callback?.ok && !callback?.error){
                    toast.success('Logged in!')
                    router.push('/users')
                }
            })
            .finally(()=> setIsLoading(false))
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true)

        // Nextauth Social signin
        signIn(action, {redirect:false})
        .then((callback) => {
            if(callback?.error){
                toast.error('Password Incorrect')
            }

            if (callback?.ok && !callback?.error){
                toast.success('Logged in!')
            }
        })
        .finally(()=>setIsLoading(false))
    }

  return (
    <div
     className='
      mt-8
      sm:mx-auto
      sm:w-full
      sm:max-w-md
     '
    >
        <div className='
         bg-white
         py-8
         shadow
         sm:rounded-lg
         sm:px-10
        '>
            <form
             className='space-y-6'
             onSubmit={handleSubmit(onSubmit)}
            >
                {variant === 'REGISTER' && (
                    <Input
                    label='Name'
                    register={register}
                    id='name'
                    errors={errors}
                    disabled={isLoading}

                    />
                )}
                <Input
                    id='email'
                    label='Email address'
                    type='email'
                    register={register}
                    errors={errors}
                    disabled={isLoading}

                    />
                <Input
                    id='password'
                    label='Password'
                    type='password'
                    register={register}
                    errors={errors}
                    disabled={isLoading}

                    />
                    <div>
                        <Button
                         disabled={isLoading}
                         fullWidth
                         type='submit'
                         >
                            {variant === 'LOGIN'? 'Sign in' : 'Register'}
                        </Button>
                    </div>

                    
                
            </form>


            <div
             className='mt-6'
            >
                <div className='relative'>
                    <div className='
                        absolute
                        inset-0
                        flex
                        items-center
                    '>
                        <div className='
                         w-full
                         border-t
                         border-gray-300
                        '/>
                            
                       
                    </div>
                    <div className='relative flex justify-center text-sm'>
                        <span className='bg-white px-2 text-gray-500'>
                            Or Continue with
                        </span>
                    </div>
                </div>

                <div className='
                 mt-6 flex gap-2
                '>
                    <AuthSocialButton
                     icon={BsGithub}
                     onClick={()=> socialAction('github')}
                    />
                    <AuthSocialButton
                     icon={BsGoogle}
                     onClick={()=> socialAction('google')}
                    />
                </div>
            </div>
            <div
             className='
              flex
              gap-2
              justify-center
              text-sm
              mt-6
              px-2
              text-gray-500
             '
            >
                <p>
                    {variant === 'LOGIN' ? 'New to Minglechat?' : 'Already have an Account?'}
                </p>
                <p
                 onClick={toggleVariant}
                 className='underline cursor-pointer'
                >   
                    {variant ==='LOGIN'? 'Create an account' : 'Login'}
                </p>
            </div>
        </div>
    </div>
  )
}

export default AuthForm