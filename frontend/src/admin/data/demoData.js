export const metrics = [
  { label: 'Submitted', value: '1', tone: 'cyan', icon: 'send' },
  { label: 'Sent', value: '1', tone: 'purple', icon: 'paper' },
  { label: 'Delivered', value: '1', tone: 'green', icon: 'double' },
  { label: 'Failed', value: '0', tone: 'red', icon: 'x' },
]

export const serviceCards = [{ name: 'SMS', description: 'Manage and view your SMS service accounts', icon: 'mail' }]

export const walletTransactions = [
  {
    date: '23/05/2026, 04:39:36 pm',
    serviceAccount: 'ayushidem',
    status: 'Debit',
    description: 'DEBIT CAMPAIGN sms req, campId:{7968821} batchId:{3982284}',
    transactionId: '198e71a6-8196-41ee-b9',
    amount: 'Rs.0.0170',
  },
  {
    date: '23/05/2026, 02:58:50 pm',
    serviceAccount: 'N/A',
    status: 'Credit',
    description: 'demo',
    transactionId: '7ab7b9a1-a6d2-4f8d-bb76c41212ac5a338227',
    amount: 'Rs.100.0000',
  },
]

export const ratePlans = [
  { srNo: '2', planType: 'Unified', updatedOn: '23/05/2026, 04:47:45 pm', status: 'Partially Active' },
  { srNo: '1', planType: 'Expired', updatedOn: '23/05/2026, 04:47:45 pm', status: 'Inactive' },
  { srNo: '0', planType: 'Expired', updatedOn: '23/05/2026, 02:53:38 pm', status: 'Inactive' },
]

export const settingsCards = [
  { label: 'Sender ID', value: 'ZOSTO', detail: 'Default sender configured.' },
  { label: 'Timezone', value: 'Asia/Kolkata', detail: 'Reports and billing use this timezone.' },
  { label: 'Notifications', value: 'Enabled', detail: 'Wallet and delivery alerts are active.' },
]
