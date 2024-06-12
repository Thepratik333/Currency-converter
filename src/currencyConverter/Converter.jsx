import { useState } from 'react'
import InputBox from './currency/InputBox'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import back from '../assets/back.jpg'
import money from '../assets/money.png'
import { FaMoneyBillTransfer } from 'react-icons/fa6'
import { LuArrowDownUp } from 'react-icons/lu'


function Converter() {

  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)
  console.log(currencyInfo);

  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }
  
  const convert = () => {
    setConvertedAmount((amount * currencyInfo[to]).toFixed(2))
  }

  

  return (
    <div>
    <h1 className="text-center text-white py-3 mb-4 rounded" style={{ backgroundColor: '#1e3a8a', fontFamily: 'math', margin: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
    Currency <FaMoneyBillTransfer/>    Converter
  </h1>
      <div
        className="currency-container"
        style={{ paddingTop: "80px", width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}
    >
    <img src={money} className='w-50' alt="" />
        <div className="w-full">
            <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30" style={{background: "rgb(255 255 255 / 0.3)", backdropFilter: "blur(2px)", borderRadius: "7px"}}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        convert()
                       
                    }}
                >
                    <div className="w-full mb-1">
                        <InputBox
                            label="From"
                            amount={amount}
                            currencyOptions={options}
                            onCurrencyChange={(currency) => setFrom(currency)}
                            selectCurrency={from}
                            onAmountChange={(amount) => setAmount(amount)}
                        />
                    </div>
                    <div className="relative w-full h-0.5" style={{textAlign: "center", position: "relative"}}>
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                            onClick={swap}
                            style={{background: "#2563eb", padding: "4px", borderRadius: "6px", position: "absolute", top: "-20px", left: "42%"}}
                        >
                            swap <LuArrowDownUp />
                        </button>
                    </div>
                    <div className="w-full mt-1 mb-4">
                        <InputBox
                            label="To"
                            amount={convertedAmount}
                            currencyOptions={options}
                            onCurrencyChange={(currency) => setTo(currency)}
                            selectCurrency={to}
                            amountDisable
                        />
                    </div>
                    <div className="button" style={{textAlign: "center"}}>
                    <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg" style={{background: "#2563eb", borderRadius: "6px", border: "none" , width: "-webkit-fill-available"}}>
                    Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </div>
);
}

export default Converter
