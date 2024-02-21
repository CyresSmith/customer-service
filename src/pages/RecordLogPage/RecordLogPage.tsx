import RecordLog from 'components/RecordLog';
import RecordLogBar from 'components/RecordLog/RecordLogBar';
import PageContentLayout from 'components/Ui/PageContentLayout';

// type Props = {};

const RecordLogPage = (props: Props) => {
  return (
    <PageContentLayout
      bar={
        <RecordLogBar />
      }
      content={<RecordLog />}
    />
  );
};

export default RecordLogPage;
