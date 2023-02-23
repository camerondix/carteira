import { Route, Routes } from 'react-router-dom';
import About from './Components/About';
import Account from './Components/Account/Account';
import Accounts from "./Components/Account/Accounts";
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import AllTransactions from './Components/Transaction/AllTransactions';
import Transaction from './Components/Transaction/Transaction';

function App() {

  return <div className="bg-baseColor dark:bg-baseColorDark text-grayPrimary dark:text-grayPrimaryDark">
    <Navbar />
    <Routes>
      <Route path="/" element={<About />} />
      <Route path="/transactions" element={<AllTransactions />} />
      <Route path="/transaction/:id" element={<Transaction />} />
      <Route path="/accounts" element={<Accounts />} />
      <Route path="/account/:id" element={<Account />} />
    </Routes>
    <Footer />
  </div>
}

export default App;
