import {ratingFieldName} from '../../contstants/ratingFieldName'

export class LeaderboardNewLeaderRequest {
    data: unknown
    ratingFieldName: string

    constructor(id: number, count: number, login: string) {
        this.ratingFieldName = ratingFieldName
        this.data = {
            id,
            login,
            [ratingFieldName]: count
        }
    }
}