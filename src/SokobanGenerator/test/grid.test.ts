import {Grid} from "../src/Grid"
import {Tile} from '../enums/Tile'

describe("Index conversion", () => {
    describe("Small grid", () => {
        test("To coord", () => {
            let grid = new Grid(1, 1)

            expect(grid._toIndex(0, 0)).toBe(0)
        })

        test("To index", () => {
            let grid = new Grid(1, 1)
            expect(grid._toCoord(0)).toEqual({x: 0, y: 0})
        })
    })

    describe("Large grid", () => {
        test("To corrd", () => {
            let grid = new Grid(10, 10)

            expect(grid._toIndex(0, 0)).toBe(0)
            expect(grid._toIndex(0, 9)).toBe(9)
            expect(grid._toIndex(1, 0)).toBe(10)
            expect(grid._toIndex(3, 5)).toBe(35)
            expect(grid._toIndex(3, 9)).toBe(39)
            expect(grid._toIndex(9, 2)).toBe(92)
            expect(grid._toIndex(9, 9)).toBe(99)
        })

        test("To index", () => {
            let grid = new Grid(10, 10)

            expect(grid._toCoord(0)).toEqual({x: 0, y: 0})
            expect(grid._toCoord(9)).toEqual({x: 0, y: 9})
            expect(grid._toCoord(10)).toEqual({x: 1, y: 0})
            expect(grid._toCoord(35)).toEqual({x: 3, y: 5})
            expect(grid._toCoord(39)).toEqual({x: 3, y: 9})
            expect(grid._toCoord(92)).toEqual({x: 9, y: 2})
            expect(grid._toCoord(99)).toEqual({x: 9, y: 9})
        })
    })
})

describe("redeployGoals", () => {
    test(`Clear board with insufficient space for goals`, () => {
        let grid = new Grid(10, 10, 10)
        grid.setMatrixAsArray([
            `##########`.split(""),
            `##########`.split(""),
            `##########`.split(""),
            `##########`.split(""),
            `####   ###`.split(""),
            `####   ###`.split(""),
            `##########`.split(""),
            `##########`.split(""),
            `##########`.split(""),
            `##########`.split("")
        ])

        expect(grid.redeployGoals()).toBeFalsy()
    })

    test(`Dirty board with insufficient space for goals`, () => {
        let grid = new Grid(10, 10, 10)
        grid.setMatrixAsArray([
            `##########`.split(""),
            `##########`.split(""),
            `##########`.split(""),
            `##########`.split(""),
            `####.  ###`.split(""),
            `#### . .##`.split(""),
            `##########`.split(""),
            `##########`.split(""),
            `##########`.split(""),
            `##########`.split("")
        ])

        expect(grid.redeployGoals()).toBeFalsy()
    })

    test(`Clear board with sufficient space for goals`, () => {
        let grid = new Grid(10, 10, 3)
        grid.setMatrixAsArray([
            `##########`.split(""),
            `##########`.split(""),
            `##########`.split(""),
            `###     ##`.split(""),
            `###     ##`.split(""),
            `###     ##`.split(""),
            `##########`.split(""),
            `##########`.split(""),
            `##########`.split(""),
            `##########`.split("")
        ])

        expect(grid.redeployGoals()).toBeTruthy()

        expect(grid._data._data
            .map(a => a.filter(t => t === Tile.GOAL))
            .length === 3)
    })

    test(`Dirty board with sufficient space for goals`, () => {
        let grid = new Grid(10, 10, 3)
        grid.setMatrixAsArray([
            `##########`.split(""),
            `##########`.split(""),
            `##########`.split(""),
            `### .   ##`.split(""),
            `###   . ##`.split(""),
            `###  .  ##`.split(""),
            `##########`.split(""),
            `##########`.split(""),
            `##########`.split(""),
            `##########`.split("")
        ])

        expect(grid.redeployGoals()).toBeTruthy()

        expect(grid._data._data
            .map(a => a.filter(t => t === Tile.GOAL))
            .length === 3)
    })
})

describe("hasEnoughRoom", () => {
    test(`Solid wall`, () => {
        let grid = new Grid(10, 10, 3)
        grid.setMatrixAsArray([
            `##########`.split(""),
            `##########`.split(""),
            `##########`.split(""),
            `##########`.split(""),
            `##########`.split(""),
            `##########`.split(""),
            `##########`.split(""),
            `##########`.split(""),
            `##########`.split(""),
            `##########`.split("")
        ])

        expect(grid.hasEnoughRoom()).toBeFalsy()
    })

    test(`Solid floor`, () => {
        let grid = new Grid(10, 10, 3)
        grid.setMatrixAsArray([
            `          `.split(""),
            `          `.split(""),
            `          `.split(""),
            `          `.split(""),
            `          `.split(""),
            `          `.split(""),
            `          `.split(""),
            `          `.split(""),
            `          `.split(""),
            `          `.split("")
        ])

        expect(grid.hasEnoughRoom()).toBeTruthy()
    })

    test(`Sporadic insufficient`, () => {
        let grid = new Grid(10, 10, 3)
        grid.setMatrixAsArray([
            `##########`.split(""),
            `##########`.split(""),
            `#### #####`.split(""),
            `####### ##`.split(""),
            `##########`.split(""),
            `## #######`.split(""),
            `##########`.split(""),
            `####### ##`.split(""),
            `##########`.split(""),
            `##########`.split("")
        ])

        expect(grid.hasEnoughRoom()).toBeFalsy()
    })

    test(`Continous insufficient`, () => {
        let grid = new Grid(10, 10, 3)
        grid.setMatrixAsArray([
            `##########`.split(""),
            `##########`.split(""),
            `##########`.split(""),
            `##########`.split(""),
            `##########`.split(""),
            `###    ###`.split(""),
            `##########`.split(""),
            `##########`.split(""),
            `##########`.split(""),
            `##########`.split("")
        ])

        expect(grid.hasEnoughRoom()).toBeFalsy()
    })

    test(`Sporadic sufficient`, () => {
        let grid = new Grid(10, 10, 3)
        grid.setMatrixAsArray([
            `##########`.split(""),
            `##########`.split(""),
            `##### ####`.split(""),
            `# ########`.split(""),
            `##########`.split(""),
            `### ######`.split(""),
            `##### ####`.split(""),
            `### ######`.split(""),
            `##########`.split(""),
            `##########`.split("")
        ])

        expect(grid.hasEnoughRoom()).toBeTruthy()
    })

    test(`Continous sufficient`, () => {
        let grid = new Grid(10, 10, 3)
        grid.setMatrixAsArray([
            `##########`.split(""),
            `##########`.split(""),
            `##########`.split(""),
            `##    ####`.split(""),
            `## #######`.split(""),
            `##########`.split(""),
            `##########`.split(""),
            `##########`.split(""),
            `##########`.split(""),
            `##########`.split("")
        ])

        expect(grid.hasEnoughRoom()).toBeTruthy()
    })
})

describe("generateFarthestBoxes", () => {
    // This only covers simple cases
    test(`Really simple`, () => {
        let grid = new Grid(3, 1, 1)
        grid.setMatrixAsArray([
            `  *`.split(""),
        ])

        grid.generateFarthestBoxes()

        expect(grid.get(1, 0)).toBe(Tile.BOX)
    })

    test(`Really simple with walls`, () => {
        let grid = new Grid(5, 4, 1)
        grid.setMatrixAsArray([
            `#####`.split(""),
            `#  *#`.split(""),
            `#####`.split(""),
            `#####`.split(""),
        ])

        grid.generateFarthestBoxes()

        expect(grid.get(2, 1)).toBe(Tile.BOX)
    })

    test(`Really simple but long with walls`, () => {
        let grid = new Grid(10, 4, 1)
        grid.setMatrixAsArray([
            `##########`.split(""),
            `#       *#`.split(""),
            `##########`.split(""),
            `##########`.split(""),
        ])

        grid.generateFarthestBoxes()

        expect(grid.get(2, 1)).toBe(Tile.BOX)
    })

    test(`Really simple with two boxes`, () => {
        let grid = new Grid(6, 4, 1)
        grid.setMatrixAsArray([
            `######`.split(""),
            `#   *#`.split(""),
            `#  *##`.split(""),
            `######`.split(""),
        ])

        grid.generateFarthestBoxes()

        expect(grid.get(2, 1)).toBe(Tile.BOX)
        expect(grid.get(2, 2)).toBe(Tile.BOX)
    })

    test(`Slightly simple with two boxes`, () => {
        let grid = new Grid(4, 3, 2)
        grid.setMatrixAsArray([
            `#  #`.split(""),
            `    `.split(""),
            `**  `.split(""),
        ])

        grid.generateFarthestBoxes()

        expect(grid.get(1, 1)).toBe(Tile.BOX)
        expect(grid.get(2, 1)).toBe(Tile.BOX)
    })

    test(`3x6`, () => {
        let grid = new Grid(6, 3, 2)
        grid.setMatrixAsArray([
            `      `.split(""),
            `      `.split(""),
            `  **  `.split(""),
        ])

        grid.generateFarthestBoxes()

        expect(grid.get(1, 1)).toBe(Tile.BOX)
        expect(grid.get(4, 1)).toBe(Tile.BOX)
    })

    test(`5x6`, () => {
        let grid = new Grid(6, 5, 2)
        grid.setMatrixAsArray([
            `     *`.split(""),
            `  ####`.split(""),
            `      `.split(""),
            `      `.split(""),
            `*     `.split(""),
        ])

        grid.generateFarthestBoxes()

        expect(grid.get(3, 3)).toBe(Tile.BOX)
        expect(grid.get(4, 3)).toBe(Tile.BOX)
    })

    test(`6x6`, () => {
        let grid = new Grid(6, 6, 4)
        grid.setMatrixAsArray([
            `      `.split(""),
            `      `.split(""),
            `  **  `.split(""),
            `  **  `.split(""),
            `      `.split(""),
            `      `.split(""),
        ])

        grid.generateFarthestBoxes()

        expect(grid.get(1, 1)).toBe(Tile.BOX)
        expect(grid.get(2, 1)).toBe(Tile.BOX)
        expect(grid.get(1, 2)).toBe(Tile.BOX)
        expect(grid.get(4, 1)).toBe(Tile.BOX)
    })

    test(`6x8`, () => {
        let grid = new Grid(6, 8, 3)
        grid.setMatrixAsArray([
            `     #`.split(""),
            `      `.split(""),
            `  ##  `.split(""),
            `  # **`.split(""),
            `###   `.split(""),
            `   #  `.split(""),
            ` *    `.split(""),
            `      `.split(""),
        ])

        grid.generateFarthestBoxes()

        expect(grid.get(1, 1)).toBe(Tile.BOX)
        expect(grid.get(1, 2)).toBe(Tile.BOX)
        expect(grid.get(4, 1)).toBe(Tile.BOX)
    })

    test(`9x9`, () => {
        let grid = new Grid(9, 9, 3)
        grid.setMatrixAsArray([
            `         `.split(""),
            `         `.split(""),
            `         `.split(""),
            `  #####  `.split(""),
            `         `.split(""),
            `  #####  `.split(""),
            `         `.split(""),
            `         `.split(""),
            `   ***   `.split(""),
        ])

        grid.generateFarthestBoxes()

        expect(grid.get(3, 1)).toBe(Tile.BOX)
        expect(grid.get(4, 1)).toBe(Tile.BOX)
        expect(grid.get(5, 1)).toBe(Tile.BOX)
    })
})
