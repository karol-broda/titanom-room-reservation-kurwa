"use client"
import React, { useState } from 'react';

const Calendar: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
    const [prevDis, setPrevDis] = useState<boolean>(false);

    const daysInMonth = (year: number, month: number): number => {
        return new Date(year, month + 1, 0).getDate();
    };

    const handleDateClick = (day: number) => {
        setSelectedDate(day);
    };

    const getDaysArray = (): number[] => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const daysCount = daysInMonth(year, month);
        const daysArray: number[] = [];

        for (let i = 1; i <= daysCount; i++) {
            daysArray.push(i);
        }

        return daysArray;
    };

    const prevMonth = () => {
        const previousMonth = new Date(currentMonth);
        previousMonth.setMonth(currentMonth.getMonth() - 1);

        // Check if the previous month is not in the past or the current month
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() - 1)
        if (previousMonth > currentDate) {
            setCurrentMonth(previousMonth);
            setPrevDis(false);
        } else {
            setPrevDis(true);
        }
    };


    const nextMonth = () => {
        setCurrentMonth((prevMonth) => new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 1));
        setPrevDis(false);
    };

    const renderCalendar = () => {
        const daysArray = getDaysArray();
        return daysArray.map((day) => (
            <button
                key={day}
                className={`p-3 rounded-full ${selectedDate === day ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} hover:bg-blue-600 hover:text-white focus:outline-none focus:bg-blue-600 focus:text-white`}
                onClick={() => handleDateClick(day)}
            >
                {day}
            </button>
        ));
    };

    return (
        <div className="flex flex-col gap-2 p-5 w-1/3">
            {/* Month Navigation */}
            <div className="flex items-center justify-center gap-2">
                <button onClick={prevMonth} disabled={prevDis} className={`disabled:text-gray-600 ${prevDis ? 'cursor-not-allowed' : ''} px-3 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600`}>
                    Previous Month
                </button>
                <h2>{currentMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' })}</h2>
                <button onClick={nextMonth} className="px-3 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                    Next Month
                </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-3">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-center text-gray-800">{day}</div>
                ))}
                {renderCalendar()}
            </div>

            {/* Selected Date Display */}
            {selectedDate && (
                <div className="mt-auto text-center text-gray-800">
                    Selected Date: {selectedDate}
                </div>
            )}
        </div>
    );
};

export default Calendar;
