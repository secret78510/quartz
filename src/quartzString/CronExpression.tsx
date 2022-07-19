import { Card, Checkbox, Col, Radio, Result, Row, Select } from 'antd';
import React, { useEffect, useReducer, useRef, useState } from 'react';

type cron = {
    seconds: string,
    minutes: string,
    hours: string,
    day: string,
    month: string,
    year: string,
    symbol: string,
    mode: string
}
export const cronReducer = (state: cron, action: { type: string, value: any, mode: 'default' | 'ofMonth' }) => {
    let newState = { ...state };
    switch (action.type) {
        case 'seconds':
            newState = Object.assign({}, state, { seconds: action.value, mode: action.mode ?? 'default' });
            break
        case 'minutes':
            newState = Object.assign({}, state, { minutes: action.value, mode: action.mode ?? 'default' });
            break
        case 'hours':
            newState = Object.assign({}, state, { hours: action.value, mode: action.mode ?? 'default' });
            break
        case 'day':
            newState = Object.assign({}, state, { day: action.value, mode: action.mode ?? 'default' });
            break
        case 'month':
            newState = Object.assign({}, state, { month: action.value, mode: action.mode ?? 'default' });
            break
        case 'year':
            newState = Object.assign({}, state, { year: action.value, mode: action.mode ?? 'default' });
            break
    }
    return newState
}

export const CronSeconds = ({ extraProps }: any) => {
    const seconds = new Array(60).fill(true);
    const [currentType, setCurrentType] = useState('specific')
    const checkboxs = useRef('0')
    const every = useRef('1')
    const afterStart = useRef('0');
    const firstSeconds = useRef('0');
    const lastSeconds = useRef('0');

    return (
        <>
            <div>
                <Radio.Group defaultValue={'specific'}>
                    <Row>
                        <Col span={24} className='py'>
                            <Radio value={'every'} onChange={(e) => { setCurrentType(e.target.value); extraProps({ type: 'seconds', value: '*' }) }}>
                                Every second
                            </Radio>
                        </Col>
                        <Col span={24} className='py'>
                            <Radio value={'everyAt'} onChange={(e) => { setCurrentType(e.target.value); extraProps({ type: 'seconds', value: afterStart.current + '/' + every.current }) }}>
                                Every
                                <Select
                                    optionFilterProp='children'
                                    onClick={(e) => { e.preventDefault() }}
                                    onChange={(e: string) => {
                                        every.current = e;
                                        if (currentType === 'everyAt') { extraProps({ type: 'seconds', value: afterStart.current + '/' + every.current }) }
                                    }}
                                    defaultValue='1'
                                >
                                    {
                                        seconds.map((_, index) => {
                                            const newIndex = index + 1;
                                            let str = '';
                                            newIndex < 10 ? str = '0' + newIndex : str = String(newIndex);
                                            return <Select.Option key={index} value={newIndex}>
                                                {str}
                                            </Select.Option>
                                        })
                                    }
                                </Select>
                                second(s) starting at second
                                <Select
                                    optionFilterProp='children'
                                    onClick={(e) => { e.preventDefault() }}
                                    defaultValue='00'
                                    onChange={(e: string) => {
                                        afterStart.current = e;
                                        if (currentType === 'everyAt') { extraProps({ type: 'seconds', value: afterStart.current + '/' + every.current }) }
                                    }}
                                >
                                    {

                                        seconds.map((_, index) => {
                                            let str = '';
                                            index < 10 ? str = '0' + index : str = String(index);
                                            return <Select.Option key={index} value={index}>
                                                {str}
                                            </Select.Option>
                                        })
                                    }
                                </Select>
                            </Radio>
                        </Col>
                        <Col span={24} className='py'>
                            <Radio value={'specific'} defaultChecked onChange={(e) => {
                                setCurrentType(e.target.value);
                                extraProps({ type: 'seconds', value: checkboxs.current ? checkboxs.current : 0 })
                            }}>
                                Specific second (choose one or many)
                            </Radio>
                        </Col>
                        <Col span={24} className='py'>
                            <Checkbox.Group style={{ width: '100%' }}
                                defaultValue={[0]}
                                onChange={(arr) => {
                                    let str = '';
                                    let newArr = [...arr] as number[];
                                    newArr.sort((a, b) => a - b)
                                    newArr.forEach(item => {
                                        if (!str) {
                                            str += item;
                                        } else {
                                            str += ',' + item;
                                        }
                                    });
                                    checkboxs.current = str;
                                    if (currentType === 'specific') { extraProps({ type: 'seconds', value: checkboxs.current ? checkboxs.current : 0 }) }
                                }}>

                                {seconds?.map((_, index) => {
                                    let str = '';
                                    index < 10 ? str = '0' + index : str = String(index);
                                    return <Checkbox key={index} value={index} >
                                        {str}
                                    </Checkbox>
                                })}
                            </Checkbox.Group>
                        </Col>
                        <Col span={24} className='py'>
                            <Radio value={'between'} onChange={(e) => { setCurrentType(e.target.value); extraProps({ type: 'seconds', value: firstSeconds.current + '-' + lastSeconds.current }) }}>
                                Every second between second
                                <Select
                                    optionFilterProp='children'
                                    onClick={(e) => { e.preventDefault() }}
                                    onChange={(e: string) => {
                                        firstSeconds.current = e;
                                        if (currentType === 'between') { extraProps({ type: 'seconds', value: firstSeconds.current + '-' + lastSeconds.current }) }
                                    }}
                                    defaultValue='00'
                                >
                                    {
                                        seconds.map((_, index) => {
                                            let str = '';
                                            index < 10 ? str = '0' + index : str = String(index);
                                            return <Select.Option key={index} value={index}>
                                                {str}
                                            </Select.Option>
                                        })
                                    }
                                </Select>
                                and second
                                <Select
                                    optionFilterProp='children'
                                    onClick={(e) => { e.preventDefault() }}
                                    defaultValue='00'
                                    onChange={(e: string) => {
                                        lastSeconds.current = e;
                                        if (currentType === 'between') { extraProps({ type: 'seconds', value: firstSeconds.current + '-' + lastSeconds.current }) }
                                    }}
                                >
                                    {
                                        seconds.map((_, index) => {
                                            let str = '';
                                            index < 10 ? str = '0' + index : str = String(index);
                                            return <Select.Option key={index} value={index}>
                                                {str}
                                            </Select.Option>
                                        })
                                    }
                                </Select>
                            </Radio>
                        </Col>
                    </Row>
                </Radio.Group>
            </div>
        </>
    );
}

export const CronMinutes = ({ extraProps }: any) => {
    const minutes = new Array(60).fill(true);
    const [currentType, setCurrentType] = useState('specific')
    const checkboxs = useRef('0')
    const every = useRef('1')
    const afterStart = useRef('0');
    const firstMinutes = useRef('0');
    const lastMinutes = useRef('0');

    return (
        <div>
            <Radio.Group defaultValue={'specific'}>
                <Row>
                    <Col span={24} className='py'>
                        <Radio value={'every'} onChange={(e) => {
                            setCurrentType(e.target.value);
                            extraProps({ type: 'minutes', value: '*' });
                        }}>
                            Every minute
                        </Radio>
                    </Col>
                    <Col span={24} className='py'>
                        <Radio value={'everyAt'} onChange={(e) => {
                            setCurrentType(e.target.value);
                            extraProps({ type: 'minutes', value: afterStart.current + '/' + every.current });
                        }}
                        >
                            Every
                            <Select
                                optionFilterProp='children'
                                onClick={(e) => { e.preventDefault() }}
                                onChange={(e: string) => {
                                    every.current = e;
                                    if (currentType === 'everyAt') { extraProps({ type: 'minutes', value: afterStart.current + '/' + every.current }) }
                                }}
                                defaultValue='1'
                            >
                                {
                                    minutes.map((_, index) => {
                                        return <Select.Option key={index} value={index}>
                                            {index + 1}
                                        </Select.Option>
                                    })
                                }
                            </Select>
                            minute(s) starting at minute
                            <Select
                                optionFilterProp='children'
                                onClick={(e) => { e.preventDefault() }}
                                defaultValue='00'
                                onChange={(e: string) => {
                                    afterStart.current = e;
                                    if (currentType === 'everyAt') { extraProps({ type: 'minutes', value: afterStart.current + '/' + every.current }) }
                                }}
                            >
                                {
                                    minutes.map((_, index) => {
                                        let str = '';
                                        index < 10 ? str = '0' + index : str = String(index);
                                        return <Select.Option key={index} value={index}>
                                            {str}
                                        </Select.Option>
                                    })
                                }
                            </Select>
                        </Radio>
                    </Col>
                    <Col span={24} className='py'>
                        <Radio value={'specific'} onChange={(e) => {
                            setCurrentType(e.target.value);
                            extraProps({ type: 'minutes', value: checkboxs.current ? checkboxs.current : 0 });
                        }}>
                            Specific minute (choose one or many)
                        </Radio>
                    </Col>
                    <Col span={24} className='py'>
                        <Checkbox.Group style={{ width: '100%' }}
                            defaultValue={[0]}
                            onChange={(arr) => {
                                let str = '';
                                let newArr = [...arr] as number[];
                                newArr.sort((a, b) => a - b)
                                newArr.forEach(item => {
                                    if (!str) {
                                        str += item;
                                    } else {
                                        str += ',' + item;
                                    }
                                });
                                checkboxs.current = str;
                                if (currentType === 'specific') { extraProps({ type: 'minutes', value: checkboxs.current ? checkboxs.current : 0 }) }
                            }}>
                            {minutes?.map((_, index) => {
                                let str = '';
                                index < 10 ? str = '0' + index : str = String(index);
                                return <Checkbox key={index} value={index}>
                                    {str}
                                </Checkbox>
                            })}
                        </Checkbox.Group>
                    </Col>
                    <Col span={24} className='py'>
                        <Radio value={'between'} onChange={(e) => {
                            setCurrentType(e.target.value);
                            extraProps({ type: 'seconds', value: firstMinutes.current + '-' + lastMinutes.current });
                        }}>
                            Every minute between minute
                            <Select
                                optionFilterProp='children'
                                onClick={(e) => { e.preventDefault() }}
                                onChange={(e: string) => {
                                    firstMinutes.current = e;
                                    if (currentType === 'between') { extraProps({ type: 'minutes', value: firstMinutes.current + '-' + lastMinutes.current }) }
                                }}
                                defaultValue='00'
                            >
                                {
                                    minutes.map((_, index) => {
                                        let str = '';
                                        index < 10 ? str = '0' + index : str = String(index);
                                        return <Select.Option key={index} value={index}>
                                            {str}
                                        </Select.Option>
                                    })
                                }
                            </Select>
                            and minute
                            <Select
                                optionFilterProp='children'
                                onClick={(e) => { e.preventDefault() }}
                                defaultValue='00'
                                onChange={(e: string) => {
                                    lastMinutes.current = e;
                                    if (currentType === 'between') { extraProps({ type: 'minutes', value: firstMinutes.current + '-' + lastMinutes.current }) }
                                }}
                            >
                                {
                                    minutes.map((_, index) => {
                                        let str = '';
                                        index < 10 ? str = '0' + index : str = String(index);
                                        return <Select.Option key={index} value={index}>
                                            {str}
                                        </Select.Option>
                                    })
                                }
                            </Select>
                        </Radio>
                    </Col>
                </Row>
            </Radio.Group>
        </div>

    );
}
export const CronHours = ({ extraProps }: any) => {
    const hours = new Array(24).fill(true);
    const [currentType, setCurrentType] = useState('specific')
    const checkboxs = useRef('0')
    const every = useRef('1')
    const afterStart = useRef('0');
    const firstHours = useRef('0');
    const lastHours = useRef('0');

    return (
        <>
            <div>
                {
                    <Radio.Group defaultValue={'specific'}>
                        <Row>
                            <Col span={24} className='py'>
                                <Radio value={'every'} onChange={(e) => {
                                    setCurrentType(e.target.value);
                                    extraProps({ type: 'hours', value: '*' });
                                }}>
                                    Every hour
                                </Radio>
                            </Col>
                            <Col span={24} className='py'>
                                <Radio value={'everyAt'} onChange={(e) => {
                                    setCurrentType(e.target.value);
                                    extraProps({ type: 'hours', value: afterStart.current + '/' + every.current });
                                }}>
                                    Every
                                    <Select
                                        optionFilterProp='children'
                                        onClick={(e) => { e.preventDefault() }}
                                        onChange={(e: string) => {
                                            every.current = e;
                                            if (currentType === 'everyAt') { extraProps({ type: 'hours', value: afterStart.current + '/' + every.current }) }
                                        }}
                                        defaultValue='1'
                                    >
                                        {
                                            hours.map((_, index) => {
                                                let str = '';
                                                index < 10 ? str = '0' + index : str = String(index);
                                                return <Select.Option key={index} value={index + 1}>
                                                    {str}
                                                </Select.Option>
                                            })
                                        }
                                    </Select>
                                    hour(s) starting at hour
                                    <Select
                                        optionFilterProp='children'
                                        onClick={(e) => { e.preventDefault() }}
                                        defaultValue='00'
                                        onChange={(e: string) => {
                                            afterStart.current = e;
                                            if (currentType === 'everyAt') { extraProps({ type: 'hours', value: afterStart.current + '/' + every.current }) }
                                        }}
                                    >
                                        {
                                            hours.map((_, index) => {
                                                let str = '';
                                                index < 10 ? str = '0' + index : str = String(index);
                                                return <Select.Option key={index} value={index}>
                                                    {str}
                                                </Select.Option>
                                            })
                                        }
                                    </Select>
                                </Radio>
                            </Col>
                            <Col span={24} className='py'>
                                <Radio value={'specific'} onChange={(e) => {
                                    setCurrentType(e.target.value);
                                    extraProps({ type: 'hours', value: afterStart.current + '/' + checkboxs.current ? checkboxs.current : 0 });
                                }}>
                                    Specific hour (choose one or many)
                                </Radio>
                            </Col>
                            <Col span={24} className='py'>
                                <Checkbox.Group style={{ width: '100%' }}
                                    defaultValue={[0]}
                                    onChange={(arr) => {
                                        let str = '';
                                        let newArr = [...arr] as number[];
                                        newArr.sort((a, b) => a - b)
                                        newArr.forEach(item => {
                                            if (!str) {
                                                str += item;
                                            } else {
                                                str += ',' + item;
                                            }
                                        });
                                        checkboxs.current = str;
                                        if (currentType === 'specific') { extraProps({ type: 'hours', value: checkboxs.current ? checkboxs.current : 0 }) }
                                    }}>

                                    <Row>
                                        {
                                            hours?.map((_, index) => {
                                                let str = '';
                                                index < 10 ? str = '0' + index : str = String(index);
                                                return <Checkbox key={index} value={index}>
                                                    {str}
                                                </Checkbox>

                                            })
                                        }
                                    </Row>
                                </Checkbox.Group>
                            </Col>
                            <Col span={24} className='py'>
                                <Radio value={'between'} onChange={(e) => {
                                    setCurrentType(e.target.value);
                                    extraProps({ type: 'hours', value: firstHours.current + '-' + lastHours.current });
                                }}>
                                    Every hour between hour
                                    <Select
                                        optionFilterProp='children'
                                        onClick={(e) => { e.preventDefault() }}
                                        onChange={(e: string) => {
                                            firstHours.current = e;
                                            if (currentType === 'between') { extraProps({ type: 'hours', value: firstHours.current + '-' + lastHours.current }) }
                                        }}
                                        defaultValue='00'
                                    >
                                        {
                                            hours.map((_, index) => {
                                                let str = '';
                                                index < 10 ? str = '0' + index : str = String(index);
                                                return <Select.Option key={index} value={index + 1}>
                                                    {str}
                                                </Select.Option>
                                            })
                                        }
                                    </Select>
                                    and hour
                                    <Select
                                        optionFilterProp='children'
                                        onClick={(e) => { e.preventDefault() }}
                                        defaultValue='00'
                                        onChange={(e: string) => {
                                            lastHours.current = e;
                                            if (currentType === 'between') { extraProps({ type: 'hours', value: firstHours.current + '-' + lastHours.current }) }
                                        }}
                                    >
                                        {
                                            hours.map((_, index) => {
                                                let str = '';
                                                index < 10 ? str = '0' + index : str = String(index);
                                                return <Select.Option key={index} value={index}>
                                                    {str}
                                                </Select.Option>
                                            })
                                        }
                                    </Select>
                                </Radio>
                            </Col>
                        </Row>
                    </Radio.Group>
                }
            </div>
        </>
    );
}

export const CronDay = ({ extraProps }: any) => {
    const day = new Array(31).fill(true);
    const weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [currentType, setCurrentType] = useState('every')
    const checkbox = useRef('1')
    const every = useRef('1')
    const weekCheckbox = useRef('SUN');
    const afterStart = useRef('1');
    const firstDay = useRef('1');
    const lastDay = useRef('1');
    const firstDayOfmonth = useRef('1');
    const lastDayOfmonth = useRef('1');
    const oneWeek = useRef('1L');
    const endMonth = useRef('L-1');
    const nearest = useRef('1W');

    function formatDate(str: string): string {
        if (str === '1' || str === '21' || str === '31') {
            return str + 'st'
        } else if (str === '2' || str === '22') {
            return str + 'nd'
        } else if (str === '3' || str === '23') {
            return str + 'rd'
        } else {
            return str + 'th'
        }
    }

    return (
        <div>
            <Radio.Group defaultValue={'every'}>
                <Row>
                    <Col span={24} className='py'>
                        <Radio value={'every'} onChange={(e) => {
                            setCurrentType(e.target.value);
                            extraProps({ type: 'day', value: '*' });
                        }}>
                            Every day
                        </Radio>
                    </Col>
                    <Col span={24} className='py'>
                        <Radio value={'everyAt'} onChange={(e) => {
                            setCurrentType(e.target.value);
                            extraProps({ type: 'day', value: afterStart.current + '/' + every.current });
                        }}>
                            Every
                            <Select
                                optionFilterProp='children'
                                onClick={(e) => { e.preventDefault() }}
                                onChange={(e: string) => {
                                    every.current = e;
                                    if (currentType === 'everyAt') { extraProps({ type: 'day', value: afterStart.current + '/' + every.current }); }
                                }}
                                defaultValue='1'
                            >
                                {
                                    weeks.map((_, index) => {
                                        let str = '';
                                        index < 10 ? str = '0' + index : str = String(index);
                                        return <Select.Option key={index} value={index + 1}>
                                            {str}
                                        </Select.Option>
                                    })
                                }
                            </Select>
                            day(s) starting on
                            <Select
                                optionFilterProp='children'
                                onClick={(e) => { e.preventDefault() }}
                                defaultValue='Sunday'
                                onChange={(e: string) => {
                                    afterStart.current = e;
                                    if (currentType === 'everyAt') { extraProps({ type: 'day', value: afterStart.current + '/' + every.current }); }
                                }}
                            >
                                {
                                    weeks.map((item, index) => {
                                        return <Select.Option key={index} value={index + 1}>
                                            {item}
                                        </Select.Option>
                                    })
                                }
                            </Select>
                        </Radio>
                    </Col>
                    <Col span={24} className='py'>
                        <Radio value={'everyMonth'} onChange={(e) => {
                            setCurrentType(e.target.value);
                            extraProps({ type: 'day', value: lastDayOfmonth.current + '/' + firstDayOfmonth.current, mode: 'ofMonth' });
                        }}>
                            Every
                            <Select
                                optionFilterProp='children'
                                onClick={(e) => { e.preventDefault() }}
                                onChange={(e: string) => {
                                    firstDayOfmonth.current = e;
                                    if (currentType === 'everyMonth') { extraProps({ type: 'day', value: lastDayOfmonth.current + '/' + firstDayOfmonth.current, mode: 'ofMonth' }); }
                                }}
                                defaultValue='1'
                            >
                                {
                                    day.map((_, index) => {
                                        let value = index + 1;
                                        return <Select.Option key={index} value={value}>
                                            {value}
                                        </Select.Option>
                                    })
                                }
                            </Select>
                            day(s) starting on the
                            <Select
                                optionFilterProp='children'
                                onClick={(e) => { e.preventDefault() }}
                                defaultValue='1st'
                                onChange={(e: string) => {
                                    lastDayOfmonth.current = e;
                                    if (currentType === 'everyMonth') { extraProps({ type: 'day', value: lastDayOfmonth.current + '/' + firstDayOfmonth.current, mode: 'ofMonth' }); }
                                }}
                            >
                                {
                                    day.map((_, index) => {
                                        let newItem = formatDate(String(index + 1))
                                        return <Select.Option key={index} value={index + 1}>
                                            {newItem}
                                        </Select.Option>
                                    })
                                }
                            </Select>
                            of the month
                        </Radio>
                    </Col>
                    <Col span={24} className='py'>
                        <Radio value={'week'} onChange={(e) => {
                            setCurrentType(e.target.value);
                            extraProps({ type: 'day', value: weekCheckbox.current ? weekCheckbox.current : 1 });
                        }}>
                            Specific day of week (choose one or many)
                        </Radio>
                    </Col>
                    <Col span={24} className='py'>
                        <Checkbox.Group style={{ width: '100%' }}
                            defaultValue={['SUN']}
                            onChange={(arr) => {
                                let str = '';
                                let newArr: string[] = [];
                                weeks.forEach((item) => {
                                    const newItem = arr.find((value) => item.toLocaleUpperCase().slice(0, 3) === value) as any;
                                    if (newItem) { newArr.push(newItem); }
                                })
                                newArr.forEach(item => {
                                    if (!str) {
                                        str += item;
                                    } else {
                                        str += ',' + item;
                                    }
                                });
                                weekCheckbox.current = str;
                                if (currentType === 'week') { extraProps({ type: 'day', value: weekCheckbox.current ? weekCheckbox.current : 1 }); }
                            }}>
                            {
                                weeks?.map((item, index) => {
                                    const newItem = item.toLocaleUpperCase().slice(0, 3);
                                    return <Checkbox key={index} value={newItem}>
                                        {item}
                                    </Checkbox>
                                })
                            }
                        </Checkbox.Group>
                    </Col>
                    <Col span={24} className='py'>
                        <Radio value={'specific'} onChange={(e) => {
                            setCurrentType(e.target.value);
                            extraProps({ type: 'day', value: checkbox.current, mode: 'ofMonth' });
                        }}>
                            Specific day of month (choose one or many)
                        </Radio>
                    </Col>
                    <Col span={24} className='py'>
                        <Checkbox.Group style={{ width: '100%' }}
                            defaultValue={[1]}
                            onChange={(arr) => {
                                let str = '';
                                let newArr = [...arr] as number[];
                                newArr.sort((a, b) => a - b)
                                newArr.forEach(item => {
                                    if (!str) {
                                        str += item;
                                    } else {
                                        str += ',' + item;
                                    }
                                });
                                checkbox.current = str;
                                if (currentType === 'specific') { extraProps({ type: 'day', value: checkbox.current, mode: 'ofMonth' }); }
                            }}>

                            {day?.map((_, index) => {
                                let str = '';
                                (index + 1) < 10 ? str = '0' + (index + 1) : str = String(index + 1);
                                return <Checkbox key={index} value={index + 1}>
                                    {str}
                                </Checkbox>
                            })}
                        </Checkbox.Group>
                    </Col>
                    <Col span={24} className='py'>
                        <Radio value={'dayOfTheMonth'} onChange={(e) => {
                            setCurrentType(e.target.value);
                            extraProps({ type: 'day', value: 'L', mode: 'ofMonth' });
                        }}>
                            On the last day of the month
                        </Radio>
                    </Col>
                    <Col span={24} className='py'>
                        <Radio value={'weekOfTheMonth'} onChange={(e) => {
                            setCurrentType(e.target.value);
                            extraProps({ type: 'day', value: 'LW', mode: 'ofMonth' });
                        }}>
                            On the last weekday of the month
                        </Radio>
                    </Col>
                    <Col span={24} className='py'>
                        <Radio value={'oneWeekOfTheMonth'} onChange={(e) => {
                            setCurrentType(e.target.value);
                            extraProps({ type: 'day', value: oneWeek.current });
                        }}>
                            On the last
                            <Select
                                optionFilterProp='children'
                                onClick={(e) => { e.preventDefault() }}
                                onChange={(e: string) => {
                                    oneWeek.current = e;
                                    if (currentType === 'oneWeekOfTheMonth') { extraProps({ type: 'day', value: oneWeek.current }); }
                                }}
                                defaultValue='1L'
                            >
                                {
                                    weeks.map((item, index) => {
                                        let value = (index + 1) + 'L'
                                        return <Select.Option key={index} value={value}>
                                            {item}
                                        </Select.Option>
                                    })
                                }
                            </Select>
                            of the month
                        </Radio>
                    </Col>
                    <Col span={24} className='py'>
                        <Radio value={'endMonth'} onChange={(e) => {
                            setCurrentType(e.target.value);
                            extraProps({ type: 'day', value: endMonth.current, mode: 'ofMonth' });
                        }}>
                            <Select
                                optionFilterProp='children'
                                onClick={(e) => { e.preventDefault() }}
                                onChange={(e: string) => {
                                    endMonth.current = e;
                                    if (currentType === 'endMonth') { extraProps({ type: 'day', value: endMonth.current, mode: 'ofMonth' }); }
                                }}
                                defaultValue='L-1'
                            >
                                {
                                    day.map((_, index) => {
                                        let value = 'L-' + (index + 1)
                                        return <Select.Option key={index} value={value}>
                                            {index + 1}
                                        </Select.Option>
                                    })
                                }
                            </Select>
                            day(s) before the end of the month
                        </Radio>
                    </Col>
                    <Col span={24} className='py'>
                        <Radio value={'nearest'} onChange={(e) => {
                            setCurrentType(e.target.value);
                            extraProps({ type: 'day', value: nearest.current, mode: 'ofMonth' });
                        }}>
                            Nearest weekday (Monday to Friday) to the
                            <Select
                                optionFilterProp='children'
                                onClick={(e) => { e.preventDefault() }}
                                onChange={(e: string) => {
                                    nearest.current = e;
                                    if (currentType === 'nearest') { extraProps({ type: 'day', value: nearest.current, mode: 'ofMonth' }); }
                                }}
                                defaultValue='1W'
                            >
                                {
                                    day.map((_, index) => {
                                        let value = (index + 1) + 'W';
                                        let newItem = formatDate(String(index + 1));
                                        return <Select.Option key={index} value={value}>
                                            {newItem}
                                        </Select.Option>
                                    })
                                }
                            </Select>
                            of the month
                        </Radio>
                    </Col>
                    <Col span={24} className='py'>
                        <Radio value={'between'} onChange={(e) => {
                            setCurrentType(e.target.value);
                            extraProps({ type: 'day', value: lastDay.current + '#' + firstDay.current });
                        }}>
                            Every hour between hour
                            <Select
                                optionFilterProp='children'
                                onClick={(e) => { e.preventDefault() }}
                                onChange={(e: string) => {
                                    firstDay.current = e;
                                    if (currentType === 'between') { extraProps({ type: 'day', value: lastDay.current + '#' + firstDay.current }); }
                                }}
                                defaultValue='1st'
                            >
                                {
                                    new Array(5).fill(true).map((_, index) => {
                                        let newItem = formatDate(String(index + 1));
                                        return <Select.Option key={index} value={index + 1}>
                                            {newItem}
                                        </Select.Option>
                                    })
                                }
                            </Select>
                            and hour
                            <Select
                                optionFilterProp='children'
                                onClick={(e) => { e.preventDefault() }}
                                defaultValue='Sunday'
                                onChange={(e: string) => {
                                    lastDay.current = e;
                                    if (currentType === 'between') { extraProps({ type: 'day', value: lastDay.current + '#' + firstDay.current }); }
                                }}
                            >
                                {
                                    weeks.map((item, index) => {
                                        let value = index + 1;
                                        return <Select.Option key={index} value={value}>
                                            {item}
                                        </Select.Option>
                                    })
                                }
                            </Select>
                        </Radio>
                    </Col>
                </Row>
            </Radio.Group>
        </div>
    );
}

export const CronMonth = ({ extraProps }: any) => {
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
        'November', 'December'];
    const [currentType, setCurrentType] = useState('every')
    const checkboxs = useRef('JAN')
    const every = useRef('1')
    const afterStart = useRef('1');
    const firstMonth = useRef('1');
    const lastMonth = useRef('1');

    return (
        <div>
            <Radio.Group defaultValue={'every'}>
                <Row>
                    <Col span={24} className='py'>
                        <Radio value={'every'} onChange={(e) => {
                            setCurrentType(e.target.value);
                            extraProps({ type: 'month', value: '*' });
                        }}>
                            Every month
                        </Radio>
                    </Col>
                    <Col span={24} className='py'>
                        <Radio value={'everyAt'} onChange={(e) => {
                            setCurrentType(e.target.value);
                            extraProps({ type: 'month', value: afterStart.current + '/' + every.current });
                        }}>
                            Every
                            <Select
                                optionFilterProp='children'
                                onClick={(e) => { e.preventDefault() }}
                                onChange={(e: string) => {
                                    every.current = e;
                                    if (currentType === 'everyAt') { extraProps({ type: 'month', value: afterStart.current + '/' + every.current }) }
                                }}
                                defaultValue='1'
                            >
                                {
                                    month.map((_, index) => {
                                        let value = index + 1;
                                        return <Select.Option key={index} value={value}>
                                            {value}
                                        </Select.Option>
                                    })
                                }
                            </Select>
                            month(s) starting in
                            <Select
                                optionFilterProp='children'
                                onClick={(e) => { e.preventDefault() }}
                                defaultValue='January'
                                onChange={(e: string) => {
                                    afterStart.current = e;
                                    if (currentType === 'everyAt') { extraProps({ type: 'month', value: afterStart.current + '/' + every.current }) }
                                }}
                            >
                                {
                                    month.map((item, index) => {
                                        return <Select.Option key={index} value={index + 1}>
                                            {item}
                                        </Select.Option>
                                    })
                                }
                            </Select>
                        </Radio>
                    </Col>
                    <Col span={24} className='py'>
                        <Radio value={'specific'} onChange={(e) => {
                            setCurrentType(e.target.value);
                            extraProps({ type: 'month', value: checkboxs.current });
                        }}>
                            Specific hour (choose one or many)
                        </Radio>
                    </Col>
                    <Col span={24} className='py'>
                        <Checkbox.Group style={{ width: '100%' }}
                            defaultValue={['JAN']}
                            onChange={(arr) => {
                                let str = '';
                                let newArr: string[] = [];
                                month.forEach((item) => {
                                    const newItem = arr.find((value) => item.toLocaleUpperCase().slice(0, 3) === value) as any;
                                    if (newItem) { newArr.push(newItem); }
                                })
                                newArr.forEach(item => {
                                    if (!str) {
                                        str += item;
                                    } else {
                                        str += ',' + item;
                                    }
                                });
                                checkboxs.current = str;
                                if (currentType === 'specific') { extraProps({ type: 'month', value: checkboxs.current ? checkboxs.current : 'JAN' }) }
                            }}>

                            {
                                month?.map((item, index) => {
                                    const newItem = item.toLocaleUpperCase().slice(0, 3);
                                    return <Checkbox key={index} value={newItem}>
                                        {item}
                                    </Checkbox>

                                })
                            }

                        </Checkbox.Group>
                    </Col>
                    <Col span={24} className='py'>
                        <Radio value={'between'} onChange={(e) => {
                            setCurrentType(e.target.value);
                            extraProps({ type: 'month', value: firstMonth.current + '-' + lastMonth.current });
                        }}>
                            Every hour between hour
                            <Select
                                optionFilterProp='children'
                                onClick={(e) => { e.preventDefault() }}
                                onChange={(e: string) => {
                                    firstMonth.current = e;
                                    if (currentType === 'between') { extraProps({ type: 'month', value: firstMonth.current + '-' + lastMonth.current }) }
                                }}
                                defaultValue='January'
                            >
                                {
                                    month.map((item, index) => {
                                        return <Select.Option key={index} value={index + 1}>
                                            {item}
                                        </Select.Option>
                                    })
                                }
                            </Select>
                            and hour
                            <Select
                                optionFilterProp='children'
                                onClick={(e) => { e.preventDefault() }}
                                defaultValue='January'
                                onChange={(e: string) => {
                                    lastMonth.current = e;
                                    if (currentType === 'between') { extraProps({ type: 'month', value: firstMonth.current + '-' + lastMonth.current }) }
                                }}
                            >
                                {
                                    month.map((item, index) => {
                                        return <Select.Option key={index} value={index + 1}>
                                            {item}
                                        </Select.Option>
                                    })
                                }
                            </Select>
                        </Radio>
                    </Col>
                </Row>
            </Radio.Group>
        </div>
    );
}
export const CronYear = ({ extraProps }: any) => {
    let curYear = new Date().getFullYear();
    let maxYearCount = 2100 - curYear;
    let year: number[] = [];
    new Array(maxYearCount).fill(0).forEach((_, index) => {
        let num = curYear + index;
        year.push(num);
    })
    const [currentType, setCurrentType] = useState('every')
    const checkboxs = useRef(String(curYear))
    const every = useRef('1')
    const afterStart = useRef(String(curYear));
    const firstYear = useRef(String(curYear));
    const lastYear = useRef(String(curYear));

    return (
        <div>
            <Radio.Group defaultValue={'every'}>
                <Row>
                    <Col span={24} className='py'>
                        <Radio value={'every'} onChange={(e) => {
                            setCurrentType(e.target.value);
                            extraProps({ type: 'year', value: '*' });
                        }}>
                            Any year
                        </Radio>
                    </Col>
                    <Col span={24} className='py'>
                        <Radio value={'everyAt'} onChange={(e) => {
                            setCurrentType(e.target.value);
                            extraProps({ type: 'year', value: afterStart.current + '/' + every.current });
                        }}>
                            Every
                            <Select
                                optionFilterProp='children'
                                onClick={(e) => { e.preventDefault() }}
                                onChange={(e: string) => {
                                    every.current = e;
                                    if (currentType === 'everyAt') { extraProps({ type: 'year', value: afterStart.current + '/' + every.current }); }
                                }}
                                defaultValue='1'
                            >
                                {
                                    year.map((_, index) => {
                                        return <Select.Option key={index} value={index + 1}>
                                            {index + 1}
                                        </Select.Option>
                                    })
                                }
                            </Select>
                            years(s) starting in
                            <Select
                                optionFilterProp='children'
                                onClick={(e) => { e.preventDefault() }}
                                defaultValue={String(curYear)}
                                onChange={(e: string) => {
                                    afterStart.current = e;
                                    if (currentType === 'everyAt') { extraProps({ type: 'year', value: afterStart.current + '/' + every.current }); }
                                }}
                            >
                                {
                                    year.map((item, index) => {
                                        return <Select.Option key={index} value={item}>
                                            {item}
                                        </Select.Option>
                                    })
                                }
                            </Select>
                        </Radio>
                    </Col>
                    <Col span={24} className='py'>
                        <Radio value={'specific'} onChange={(e) => {
                            setCurrentType(e.target.value);
                            extraProps({ type: 'year', value: checkboxs.current ? checkboxs.current : curYear });
                        }}>
                            Specific year (choose one or many)
                        </Radio>
                    </Col>
                    <Col span={24} className='py'>
                        <Checkbox.Group style={{ width: '100%' }}
                            defaultValue={[String(curYear)]}
                            onChange={(arr) => {
                                let str = '';
                                let newArr = [...arr] as number[];
                                newArr.sort((a, b) => a - b)
                                newArr.forEach(item => {
                                    if (!str) {
                                        str += item;
                                    } else {
                                        str += ',' + item;
                                    }
                                });
                                checkboxs.current = str;
                                if (currentType === 'specific') { extraProps({ type: 'year', value: checkboxs.current ? checkboxs.current : curYear }) }
                            }}>

                            {year?.map((item, index) => {
                                return <Checkbox key={index} value={String(item)}>
                                    {item}
                                </Checkbox>
                            })}
                        </Checkbox.Group>
                    </Col>
                    <Col span={24} className='py'>
                        <Radio value={'between'} onChange={(e) => {
                            setCurrentType(e.target.value);
                            extraProps({ type: 'year', value: firstYear.current + '-' + lastYear.current });
                        }}>
                            Every year between
                            <Select
                                optionFilterProp='children'
                                onClick={(e) => { e.preventDefault() }}
                                onChange={(e: string) => {
                                    firstYear.current = e;
                                    if (currentType === 'between') { extraProps({ type: 'year', value: firstYear.current + '-' + lastYear.current }) }
                                }}
                                defaultValue={String(curYear)}
                            >
                                {
                                    year.map((item, index) => {
                                        return <Select.Option key={index} value={item}>
                                            {item}
                                        </Select.Option>
                                    })
                                }
                            </Select>
                            and
                            <Select
                                optionFilterProp='children'
                                onClick={(e) => { e.preventDefault() }}
                                defaultValue={String(curYear)}
                                onChange={(e: string) => {
                                    lastYear.current = e;
                                    if (currentType === 'between') { extraProps({ type: 'year', value: firstYear.current + '-' + lastYear.current }) }
                                }}
                            >
                                {
                                    year.map((item, index) => {
                                        return <Select.Option key={index} value={item}>
                                            {item}
                                        </Select.Option>
                                    })
                                }
                            </Select>
                        </Radio>
                    </Col>
                </Row>
            </Radio.Group>
        </div>
    );
}
