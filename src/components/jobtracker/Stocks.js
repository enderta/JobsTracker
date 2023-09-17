import React, {useEffect, useState} from 'react';
import './Stocks.css';

const Stocks = () => {
    const [stocks, setStocks] = useState([]);
    const [fx, setFx] = useState([]);
    const [btc, setBtc] = useState([]);

    const dummyData = {
        stocks: [
            {
                symbol: "AAPL",
                price: 334.45,
                open: 328.9
            },
            {
                symbol: "AMZN",
                price: 2410.22,
                open: 2376.64
            },
            {
                symbol: "MSFT",
                price: 178.59,
                open: 175.8

            },
            {
                symbol: "GOOG",
                price: 1276.31,
                open: 1265.23
            }
        ],
        fx: [
            {
                ticker: "GBP/USD",
                bid: "1.3848",
                open: "1.3851"
            },
            {
                ticker: "EUR/USD",
                bid: "1.2122",
                open: "1.2125"
            },
            {
                ticker: "JPY/USD",
                bid: "0.0096",
                open: "0.0096"

            }
        ],
        btc: {
            historical: [
                {
                    close: 48687.42,
                    open: 48255.67
                }
            ]
        }
    };

    async function getData(url, mapCallback) {
        let response = await fetch(url);

        if (!response.ok) {
            return [];
        }

        let jsonData = await response.json();
        let outputData = jsonData.map(mapCallback);

        return outputData;
    }

    useEffect(() => {
        const fetchStocks = async () => {
            let data = await getData(`https://financialmodelingprep.com/api/v3/quote/AAPL,AMZN,MSFT,GOOG?apikey=yourapikey`, (item) => {
                return {
                    name: item.symbol,
                    current: item.price,
                    open: item.open
                };
            });

            if (!data || data.length === 0) {
                data = dummyData.stocks.map((item) => {
                    return {
                        name: item.symbol,
                        current: item.price,
                        open: item.open
                    };
                });
            }

            setStocks(data);
        };

        fetchStocks();
    }, []);

    useEffect(() => {
        const fetchFx = async () => {
            let data = await getData(`https://financialmodelingprep.com/api/v3/fx/GBPUSD,EURUSD,JPYUSD?apikey=yourapikey`, (item) => {
                return {
                    name: item.ticker,
                    current: Number(item.bid),
                    open: Number(item.open)
                };
            });

            if (!data || data.length === 0) {
                data = dummyData.fx.map((item) => {
                    return {
                        name: item.ticker,
                        current: Number(item.bid),
                        open: Number(item.open)
                    };
                });
            }

            setFx(data);
        };

        fetchFx();
    }, []);

    useEffect(() => {
        const fetchBtc = async () => {
            let data = await getData(`https://financialmodelingprep.com/api/v3/historical-price-full/BTCUSD?apikey=729869812ce5fb6c0f53374cbca52642`, (item) => {
                return {
                    name: 'BTC/USD',
                    current: Number(item.historical[0].close),
                    open: Number(item.historical[0].open)
                };
            });

            if (!data || data.length === 0) {
                data = {
                    name: 'BTC/USD',
                    current: Number(dummyData.btc.historical[0].close),
                    open: Number(dummyData.btc.historical[0].open)
                };
            }

            setBtc(data);
        };

        fetchBtc();
    }, []);

    let data = stocks.concat(fx, [btc]);
    data = data.concat(data, data);

    return (
        <div className="stocks-ticker-container">
            <div className="stocks-ticker">
                {data.map((item, index) => {
                    if (item && item.current && item.open) {
                        const change = ((item.current - item.open) / item.open) * 100;
                        const isPositive = change >= 0;


                        return (
                            <div key={index} className="ticker-item">
                                <div className="d-flex align-items-center">
                                    <h5 style={{color: "white"}}>{item.name}</h5>
                                    <span className="stock-badge" style={{color: "goldenrod"}}>
                                    {item.current.toFixed(2)}
                                </span>
                                </div>
                                <div className="stock-change">
                                    <i
                                        className={`bi-chevron-${isPositive ? 'up' : 'down'}`}
                                        style={{color: isPositive ? 'green' : 'red'}}
                                    />
                                    <span style={{color: isPositive ? 'green' : 'red'}}>
                                    {isPositive ? `+${change.toFixed(2)}%` : `${change.toFixed(2)}%`} {isPositive ? '▲' : '▼'}
                                </span><br/>
                                </div>
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default Stocks;