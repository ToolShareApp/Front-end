import React from 'react';
import { Text } from 'react-native';
import { format, isToday, isYesterday, parseISO } from 'date-fns';

interface FormatDateProps {
  dateString: string;
}

const FormatDate: React.FC<FormatDateProps> = ({ dateString }) => {
  const date = parseISO(dateString);

  let formattedDate = format(date, 'p');

  if (isToday(date)) {
    formattedDate = `Today, ${formattedDate}`;
  } else if (isYesterday(date)) {
    formattedDate = `Yesterday, ${formattedDate}`;
  } else {
    formattedDate = format(date, 'MMM d, yyyy, p');
  }

  return <Text>{formattedDate}</Text>;
};

export default FormatDate;
