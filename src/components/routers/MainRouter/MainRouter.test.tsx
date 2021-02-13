import { MemoryRouter } from 'react-router-dom'
import React from 'react'
import { MainRouter, 
        PageHome, PageForum, PageLeaderboard, PageGame, PageProfile, PageSignin, PageSignup, PageError,
        routeHome, routeLeaderboard, routeForum, routeGame, routeProfile, routeSignup, routeSignin,
} from './MainRouter'
import Enzyme, { mount } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

Enzyme.configure({ adapter: new Adapter() })

describe('MainRouter: wrapper', () => {

    const getWrapper = (route: string) => {
        return mount(
            <MemoryRouter initialEntries={ [route]} >
                <div><MainRouter /></div>
            </MemoryRouter>
        )
    }
    
    test('should render the home page', () => {
        expect(getWrapper(routeHome).find(PageHome)).toHaveLength(1)
    })

    test('should render the leaderboard page', () => {
        expect(getWrapper(routeLeaderboard).find(PageLeaderboard)).toHaveLength(1)
    })

    test('should render the forum page', () => {
        expect(getWrapper(routeForum).find(PageForum)).toHaveLength(1)
    })

    test('should render the game page', () => {
        expect(getWrapper(routeGame).find(PageGame)).toHaveLength(1)
    })

    test('should render the profile page', () => {
        expect(getWrapper(routeProfile).find(PageProfile)).toHaveLength(1)
    })

    test('should render the signup page', () => {
        expect(getWrapper(routeSignup).find(PageSignup)).toHaveLength(1)
    })

    test('should render the signin page', () => {
        expect(getWrapper(routeSignin).find(PageSignin)).toHaveLength(1)
    })

    test('should render the error page', () => {
        expect(getWrapper('/random').find(PageError)).toHaveLength(1)
    })

})
