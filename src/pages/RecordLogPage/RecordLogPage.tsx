import RecordLog from 'components/RecordLog';
import RecordLogBar from 'components/RecordLog/RecordLogBar';
import PageContentLayout from 'components/Ui/PageContentLayout';
import { useState } from 'react';

const RecordLogPage = () => {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <PageContentLayout
      bar={<RecordLogBar date={date} setDate={setDate} />}
      content={<RecordLog date={date} />}
    />
  );
};

export default RecordLogPage;
