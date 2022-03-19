import React, { useEffect, useState } from 'react';
import { Box, Text, View } from 'native-base';
import { useGlobalContext } from '../GlobalContext';
import { marginBottom, overflow, paddingBottom } from 'styled-system';
import { SafeAreaView, ScrollView } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import moment from 'moment';

function CalendarTab({meetings}) {
    const {globalStyles: { headerText, paragraphText, titleText }, meetingBuff} = useGlobalContext();

    const [object, setObject] = useState({});

    useEffect(()=>{
            meetingBuff.forEach((element)=>{
            const {timeDate} = element;
            const buff = moment(timeDate).format('YYYY-MM-DD').toString();
            object[buff] = {selected: true};

            setObject({...object});
        })
    }, [meetingBuff]);

    
    return (
        <Box style={{marginTop: 0}}>
            <Calendar style={{height: "100%"}}

                current={moment(new Date()).format('YYYY-MM-DD')}

                minDate={'2012-05-10'}
        
                maxDate={'2030-05-30'}

                monthFormat={'yyyy MM'}

                markedDates={object}
                    
                hideArrows={false}

                hideExtraDays={true}

                disableMonthChange={false}
        
                firstDay={1}

                hideDayNames={true}

                showWeekNumbers={true}
        
                onPressArrowLeft={subtractMonth => subtractMonth()}

                onPressArrowRight={addMonth => addMonth()}

                disableArrowLeft={false}
        
                disableArrowRight={false}
            
                disableAllTouchEventsForDisabledDays={true}
                
                enableSwipeMonths={true}
            />
        </Box>
        
    );
}

export default CalendarTab;