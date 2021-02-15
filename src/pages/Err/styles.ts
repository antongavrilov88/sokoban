import { createStyles, Theme } from "@material-ui/core";

export const styles = (theme: Theme) => createStyles({
    content: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'absolute',
        height: '100%',
        width: '100%'
    },
    buttonBack: {
      margin: '50px'
  }
})
