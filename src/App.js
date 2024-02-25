import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Web3 from 'web3';

// Hapus impor yang tidak diperlukan

async function connectWallet() {
  try {
    if (window.ethereum) {
      var web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      var accounts = await web3.eth.getAccounts();
      var account = accounts[0]; // Diperbaiki: Menyimpan alamat dompet pertama ke dalam variabel account
      document.getElementById('wallet-address').textContent = account;

      // Gunakan nama variabel yang berbeda untuk instance kontrak
      var myContract = new web3.eth.Contract(ABI, ADDRESS);
      document.getElementById('mint').onclick = async () => { // Diperbaiki: Perbaikan sintaksis onClick
        var _mintAmount = Number(document.querySelector("[name=amount]").value);
        var minRate = Number(await myContract.methods.cost().call());
        var totalAmount = minRate * _mintAmount;
        myContract.methods.mint(account, _mintAmount).send({ from: account, value: String(totalAmount) });
      }
    }
  } catch (ex) {
    console.log(ex);
  }
}

function App() {
  return (
    <div className="App">
      <div className='container'>
        <div className='raw'>
          <form className="gradient col-lg-5 mt-5" style={{borderRadius:"25px",boxShadow:"1px 1px 10px #228b22"}}>
            <h4>mint portal</h4>
            <h5>please connect wallet</h5>
            <Button onClick={connectWallet} style={{marginBottom:"5px"}}>CONNECT WALLET</Button>
            <div className="card" id='wallet-address' style={{marginTop:"5px",boxShadow:"1px 1px 2px #000000"}}>
              <label htmlFor='floatinginput'>Wallet Address</label>
              <input type='number' name='amount' defaultValue='1' min='1' max='10'/>
              <label>please input amount to mint</label>
              <Button id="mint">MINT</Button>
            </div>
            <label>price 0.001 ETH</label>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
