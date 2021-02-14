/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import {Typography} from '@material-ui/core'
import {SokobanMain} from '../SokobanMain/SokobanMain'

export function LayOut() {
    return (
        <div className="root">
            <Grid container spacing={3}>
                <Grid item xs={2}>
                    <div className="paper">
                        <Link><Typography variant="h4" color="primary" gutterBottom>Меню</Typography></Link>
                    </div>
                </Grid>
                <Grid item xs={8}>
                    <div className="paper">
                        <Typography variant="h2" color="primary" gutterBottom>SOKOBAN</Typography>
                    </div>
                </Grid>
                <Grid item xs={2}>
                    <div className="paper">
                        <Link><Typography variant="h4" color="primary" gutterBottom>Профиль/выход</Typography></Link>
                    </div>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <div className="paper">
                        <SokobanMain/>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}
