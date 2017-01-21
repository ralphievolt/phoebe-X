import React from 'react'
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router'

import App from '../../components/page/app.jsx'
import { Index } from '../../components/page/index.jsx'
import ManageCat from '../../components/page/categories-page.jsx'
import ManageSubCat from '../../components/page/sub-categories-page.jsx'
import ReceiptTransaction from '../../components/page/receipt-page.jsx'
import DisbursementTransaction from '../../components/page/disbursement-page.jsx'
import { NotFoundPage } from '../../components/page/not-found.jsx'

import UserPage from '../../components/page/users-page.jsx'
import SignUp from '../../components/user/sign-up.jsx'
import SignIn from '../../components/user/sign-in.jsx'
import ChangePwd from '../../components/user/change-pwd.jsx'

import ReceiptsMonthlyPerformance from '../../components/reports-receipts/receipts-monthly-performance.jsx'
import ReceiptsMonthlyDetails from '../../components/reports-receipts/receipts-monthly-details.jsx'
import DisbursementsMonthlyPerformance from '../../components/reports-disbursements/disbursements-monthly-performance.jsx'
import DisbursementsMonthlyDetails from '../../components/reports-disbursements/disbursements-monthly-details.jsx'


export const Routes = () => (
    <Router history={browserHistory}>
        <Route path="/sign-in" component={ SignIn } />
        <Route path="/sign-up" component={ SignUp } />
        <Route path="/" component={App}>
            <IndexRoute component={Index} />

            <Route path="/disbursement-transaction" component={ DisbursementTransaction } />
            <Route path="/disbursements-monthly-performance" component={ DisbursementsMonthlyPerformance } />
            <Route path="/disbursements-monthly-details" component={ DisbursementsMonthlyDetails } />
            
            <Route path="/receipt-transaction" component={ ReceiptTransaction } />
            <Route path="/receipts-monthly-performance" component={ ReceiptsMonthlyPerformance } />
            <Route path="/receipts-monthly-details" component={ ReceiptsMonthlyDetails } />
           
            <Route path="/manage-cat" component={ ManageCat } />
            <Route path="/manage-subcat" component={ ManageSubCat } />
            <Route path="/manage-users" component={ UserPage } />
            <Route path="/change-password" component={ ChangePwd } />
            <Route path="*" component={NotFoundPage} />
        </Route>
    </Router>
)

// reference: https://themeteorchef.com/snippets/react-router-basics/