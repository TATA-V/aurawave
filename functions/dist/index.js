import { CloudBillingClient, } from '@google-cloud/billing';
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT;
const PROJECT_NAME = `projects/${PROJECT_ID}`;
const billing = new CloudBillingClient();
export const stopBilling = async (pubsubEvent) => {
    const pubsubData = JSON.parse(Buffer.from(pubsubEvent.data, 'base64').toString());
    if (pubsubData.costAmount <= pubsubData.budgetAmount) {
        return `No action necessary. (Current cost: ${pubsubData.costAmount})`;
    }
    if (!PROJECT_ID)
        return 'No project specified';
    const billingEnabled = await _isBillingEnabled(PROJECT_NAME);
    return billingEnabled
        ? _disableBillingForProject(PROJECT_NAME)
        : 'Billing already disabled';
};
const _isBillingEnabled = async (projectName) => {
    try {
        const [res] = await billing.getProjectBillingInfo({ name: projectName });
        return !!res.billingEnabled;
    }
    catch (e) {
        console.log('Assuming billing is enabled due to API error:', e);
        return true;
    }
};
const _disableBillingForProject = async (projectName) => {
    const [res] = await billing.updateProjectBillingInfo({
        name: projectName,
        projectBillingInfo: { billingAccountName: '' },
    });
    return `Billing disabled: ${JSON.stringify(res)}`;
};
