import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {MainRouter} from '../routers/MainRouter/MainRouter'
import {ErrorBoundary} from '../ErrorBoundary/ErrorBoundary'
import {configureStore} from '../../store/store'
import {AlertProvider} from '../UI/Alert/AlertProvider/AlertProvider'
import {AlertUI} from '../UI/Alert/AlertUI'
import {Layout} from '../Layout/index'

const store = configureStore({})

export function App() {
    return (
        <ErrorBoundary>
            <Provider store={store}>
                <AlertProvider>
                    <AlertUI/>
                    <BrowserRouter>
                        <Layout>
                            <MainRouter/>
                        </Layout>
                    </BrowserRouter>
                </AlertProvider>
            </Provider>
        </ErrorBoundary>
    )
}
