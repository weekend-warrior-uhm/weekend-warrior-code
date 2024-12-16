import { Col, Container, Row, Table } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';

// Define the type for reports
type Report = {
  id: number;
  activityId: number;
  activityName: string;
  activityAuthor: string;
  reportText: string;
};

// Server-side async function to fetch data
async function getReports(): Promise<Report[]> {
  const reports = await prisma.report.findMany();
  return reports;
}

const ReportPage = async () => {
  const reports = await getReports();

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h1 className="text-center">Admin Report Panel</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Activity ID</th>
                  <th>Activity Name</th>
                  <th>Activity Author</th>
                  <th>Report Text</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id}>
                    <td>{report.id}</td>
                    <td>{report.activityId}</td>
                    <td>{report.activityName}</td>
                    <td>{report.activityAuthor}</td>
                    <td>{report.reportText}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ReportPage;
