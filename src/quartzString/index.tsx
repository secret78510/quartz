import { Card, Tabs } from 'antd';
import React, { useEffect, useReducer } from 'react';
import { CronDay, CronHours, CronMinutes, CronMonth, cronReducer, CronSeconds, CronYear } from './CronExpression';
import './style.scss'


const QuartzString = () => {
    const [state, dispatch] = useReducer(cronReducer, {
        seconds: '0',
        minutes: '0',
        hours: '0',
        day: '*',
        month: '*',
        year: '*',
        symbol: '?',
        mode: 'default'
    });

    function resultString() {
        switch (state.mode) {
            case 'default':
                return `${state.seconds} ${state?.minutes} ${state?.hours} ? ${state?.month} ${state?.day} ${state?.year}`
            case 'ofMonth':
                return `${state?.seconds} ${state?.minutes} ${state?.hours} ${state?.day} ${state?.month}  ? ${state?.year}`
        }
    }
    useEffect(() => {
        resultString()
    }, [state])

    const tabList: any = [
        {
            title: 'Seconds',
            TabContent: CronSeconds,
            extraProps: dispatch
        },
        {
            title: 'Minutes',
            TabContent: CronMinutes,
            extraProps: dispatch
        },
        {
            title: 'Hours',
            TabContent: CronHours,
            extraProps: dispatch
        },
        {
            title: 'Day',
            TabContent: CronDay,
            extraProps: dispatch
        },
        {
            title: 'Month',
            TabContent: CronMonth,
            extraProps: dispatch
        },
        {
            title: 'Year',
            TabContent: CronYear,
            extraProps: dispatch
        },
    ]

    return (
        <div style={{ width: '100%', height: '100%', padding: '25px 0', backgroundColor: '#ccc' }}>
            <Card className='myCard' style={{ width: '80%', margin: '0 auto' }}>
                <Tabs defaultActiveKey="1" type="card" >
                    {
                        tabList.map((item: any) => {
                            return <Tabs.TabPane tab={item.title} key={item.title}>
                                <item.TabContent extraProps={item.extraProps} />
                            </Tabs.TabPane>
                        })
                    }
                </Tabs>
                <Card>
                    <h4 style={{ fontSize: '30px', wordWrap: 'break-word' }}>
                        {resultString()}
                    </h4>
                </Card>
            </Card>
            <a style={{ textAlign: 'center', display: 'inline-block', width: '100%', marginTop: '20px' }} href="https://www.freeformatter.com/cron-expression-generator-quartz.html">
                參考:FREEFORMATTER.COM網站試做，非營利使用。</a>
        </div>
    );
}

export default QuartzString;