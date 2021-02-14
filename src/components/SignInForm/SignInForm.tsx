/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/naming-convention */
import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField'
import {Button} from '@material-ui/core'
import {validateInput} from '../../utils/validateInput'
import {Auth} from '../../API'

export function SignInForm() {
    const [login_state, login_setState] = useState({value: '', error: false})
    const [password_state, password_setState] = useState({value: '', error: false})

    const formIsValid = () => !login_state.error
        && !password_state.error
        && login_state.value !== ''
        && password_state.value !== ''

    type SetStateRule = (...args: any) => void
    type FieldName = string

    const setState: Record<FieldName, SetStateRule> = {
        login: (value: string, error: boolean) => login_setState({value, error}),
        password: (value: string, error: boolean) => password_setState({value, error})
    }

    const color = 'primary'

    const formElements = [
        {
            error: login_state.error,
            label: 'Login',
            name: 'login',
            type: 'text'
        },
        {
            error: password_state.error,
            label: 'Password',
            name: 'password',
            type: 'password'
        }
    ]

    const inputHandler = React.useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            const {value, name} = e.target
            const status = validateInput(name, value)
            if (status) {
                setState[name](value, false)
            } else {
                setState[name](value, true)
            }
        }, [
            login_state,
            password_state
        ]
    )

    const submitForm = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault()
            if (formIsValid()) {
                Auth.signIn({
                    login: login_state.value,
                    password: password_state.value
                })
                    .then((data: any) => data)
            } else {
            // нужно нормальное сообщение об ошибке
                throw new Error('form is invalid')
            }
        }, [
            login_state,
            password_state
        ]
    )

    return (
        <div className="container">
            <div className="form-container">
                <form className="form" noValidate autoComplete="off">
                    {
                        formElements.map((input) => {
                            <TextField
                                fullWidth
                                margin="normal"
                                error={input.error}
                                color={color}
                                label={input.label}
                                name={input.name}
                                variant="outlined"
                                type={input.type}
                                onChange={(e) => inputHandler(e)}
                            />
                        })
                    }
                    <Button variant="contained" color="primary" type="submit" onClick={(e) => submitForm(e)}>SignIn</Button>
                </form>
            </div>
        </div>
    )
}