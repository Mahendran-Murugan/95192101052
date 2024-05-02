import express from "express"
import axios from "axios"
import cors from 'cors'

const app = express()
const PORT = 7000
const SERVERURL = "http://20.244.56.144"

app.use(express.json())

app.use(cors({ origin: "*" }))

app.listen(PORT, () => {
    console.log(`Listening in ${PORT}`)
})

const myCredentials = {
    "companyName": "MartNow",
    "clientID": "8157dd40-3fa7-4403-ad5a-a9cee83c475a",
    "clientSecret": "FVdEQJOaiKMyDzQg",
    "ownerName": "Mahendran",
    "ownerEmail": "mahendran1482004@gmail.com",
    "rollNo": "95192101052"
}

app.get("/getToken", async (req, res) => {
    let accessToken;
    await axios.post(`${SERVERURL}/test/auth`, myCredentials)
        .then(res => accessToken = res.data.access_token)
        .catch(err => console.log(err))
    return res.status(200).send({ "token": accessToken })
});


app.get("/getProducts/:companyname/:categoryname", async (req, res) => {
    let products;

    let { query: { top, minPrice, maxPrice } } = req;

    minPrice = parseInt(minPrice)

    maxPrice = parseInt(maxPrice)

    const { params: { companyname, categoryname } } = req;

    let headers;

    await axios.get(`http://localhost:${PORT}/getToken`)
        .then(async (res) => {

            console.log(res.data.token)
            headers = { "Authorization": `Bearer ${res.data.token}` }

            await axios.get(`http://20.244.56.144/test/companies/${companyname}/categories/${categoryname}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`, { headers })
                .then(res => products = res.data)
                .catch(err => console.log(err))
        })
    return res.status(200).send(products);
})

