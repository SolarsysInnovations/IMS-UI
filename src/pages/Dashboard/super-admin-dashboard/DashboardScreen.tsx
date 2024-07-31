import SuperAdminDashboardOverview from './SuperAdminDashboardOverview';
import SuperAdminCustomersList from './SuperAdminCustomersList';


const SuperAdminDashboardScreen = ({ superAdminData }: any) => {

    if (!superAdminData) {
        return <div>No data available</div>;
    }
    const superAdminOverviewData = {
        totalNoOfCompany: superAdminData.totalNoOfCompany || 0,
        totalNoOfInvoices: superAdminData.totalNoOfInvoices || 0,
    };
    const companyOverviewData = superAdminData.companyOverview || [];

    return (
        <>
            {superAdminOverviewData && (
                <SuperAdminDashboardOverview overviewData={superAdminOverviewData} />
            )}
            {companyOverviewData && (
                <SuperAdminCustomersList superAdminCustomersListData={companyOverviewData} />
            )}
        </>
    );
};

export default SuperAdminDashboardScreen;
