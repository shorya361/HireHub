import React from 'react';
import { Container, Row } from 'react-bootstrap';
import DataTable from 'react-data-table-component';

export const CandidatesList = ({ candidates }) => {
  const [hideDirector, setHideDirector] = React.useState(false);

  const columns = React.useMemo(
    () => [
      {
        name: 'Name',
        selector: 'name',
        sortable: 'true',
      },
      {
        name: 'Email',
        selector: 'email',
      },
      {
        name: 'Contact',
        selector: 'contact',
      },
      {
        name: 'Skills',
        cell: (row) => (
          <div>
            {row.skills.map((skill, i) => (
              <div style={{ marginTop: '2px', marginBottom: '2px' }} key={i}>
                {skill}
              </div>
            ))}
          </div>
        ),
        selector: 'skills',
      },
    ],
    [hideDirector]
  );
  return (
    <Container>
      <Row>
        <DataTable title='Candidates' columns={columns} data={candidates} />
      </Row>
    </Container>
  );
};
