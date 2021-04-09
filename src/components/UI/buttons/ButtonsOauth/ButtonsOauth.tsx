import React, {FC, useCallback} from 'react'
import {Box, Button,  withStyles} from '@material-ui/core'
import {Props} from './types'
import {styles} from './styles'
import {apiGetYandexServiceId} from '../../../../services/API/index'

const ButtonsOauth: FC<Props> = (props: Props) => {
    const {classes} = props
    const signInByYandex = useCallback(
        async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault()
            const reqId = await apiGetYandexServiceId()
            if (!reqId) window.alertShow('error', 'Could not auth by Yandex!')
            const REDIRECT_URI = ''
            window.location.assign(
                `https://oauth.yandex.ru/authorize?response_type=code&client_id=${reqId.data.service_id}&redirect_uri=${REDIRECT_URI}`
            )
        }, []
    )

    return (
        <Box className={classes.root}>
            <Button
                variant='contained'
                color='inherit'
                type='submit'
                onClick={signInByYandex}
            >
                SignIn by Yandex
            </Button>
        </Box>
    )
}

export const ButtonsOauthTSX = withStyles(styles)(ButtonsOauth)