import React, {
    memo, useCallback, useEffect, useRef, useState
} from 'react'
import './SokobanMain.sass'
import {Button} from '@material-ui/core'
import {GameCore} from '../../GameCore/GameCore'
import {LevelStore} from '../../GameCore/models/LevelStore'
import {levelGenerator} from '../../webWorkers/levelGenerator'

export const SokobanMain = memo(() => {
    const ref = useRef<HTMLCanvasElement>(null)
    let gameCore: GameCore
    const [levels, setLevels] = useState<LevelStore[]>([])
    const [gameClass, setGameClass] = useState('block')
    const [endClass, setEndClass] = useState('hide')

    const end = () => {
        setGameClass('hide')
        setEndClass('block')
    }

    const game = () => {
        setGameClass('block')
        setEndClass('hide')
    }

    useEffect(() => {
        const canvas = ref.current

        if (canvas === null) {
            throw new Error('canvas is null')
        }

        gameCore = new GameCore(canvas)
        gameCore.end.subscribe(end)
        const fn = (event: KeyboardEvent) => gameCore.move(event)
        window.addEventListener('keydown', fn)

        levelGenerator.postMessage(true)
        const generatorCallback = ({data}: MessageEvent<LevelStore>) => {
            if (levels.length < 1) {
                gameCore.drawLevel(data)
            }

            levels.push(data)
            // eslint-disable-next-line max-len
            // ERROR TS2343: This syntax requires an imported helper named '__spreadArray' which does not exist in 'tslib'. Consider upgrading your version of 'tslib'.
            // setLevels([...levels])
            setLevels(levels)

            if (levels.length < 11) {
                levelGenerator.postMessage(true)
            }
        }
        levelGenerator.addEventListener('message', generatorCallback)

        return () => {
            window.removeEventListener('keydown', fn)
            gameCore.end.unsubscribe(end)
            levelGenerator.removeEventListener('message', generatorCallback)
        }
    }, [])

    const restart = useCallback(() => {
        gameCore.drawLevel(levels[0])
    }, [])

    const next = useCallback(() => {
        game()

        levels.shift()
        // eslint-disable-next-line max-len
        // TS2343: This syntax requires an imported helper named '__spreadArray' which does not exist in 'tslib'. Consider upgrading your version of 'tslib'.
        // setLevels([...levels])

        levelGenerator.postMessage(true)
        gameCore.drawLevel(levels[0])
    }, [])

    return (
        <>
            <div className={gameClass}>
                <div className='row'>
                    <Button disabled={levels.length < 1} onClick={restart}>Restart</Button>
                    <Button disabled={levels.length < 2} onClick={next}>Next</Button>
                </div>
                <canvas
                    className='bordered'
                    height='400'
                    width='400'
                    ref={ref}
                />
            </div>

            <div className={endClass}>
                <h2>Success!</h2>
                <Button onClick={next}>Next</Button>
            </div>
        </>
    )
})
