import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontWeight: 'bold',
        fontSize: theme.typography.pxToRem(15),
        //fontWeight: theme.typography.fontWeightRegular,
    },
}));

export function AboutSite() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <p>JOB KAN ver1.1.1</p>
            <p>学生の作業時間管理を行うことができます。</p>
            <ExpansionPanel style={{ background: 'whitesmoke' }}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>
                        アップデート履歴
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {/* <Typography> */}
                    ・2020/5/5 v1.1.1 update
                    サイドバーに"全ユーザーの進捗"項目を追加しました。全ユーザーの作業時間を見る事ができます。
                    <br />
                    ・2020/4/30 v1.0.1 update
                    お問い合わせの情報追記を行いました。
                    <br />
                    ・2020/4/24 v1.0.0 update ベータ版リリース
                    {/* </Typography> */}
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}
